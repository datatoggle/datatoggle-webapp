
import React, {useContext, useState} from 'react'
import {PanelSection} from './PanelSection'
import Button from '@mui/material/Button'
import {
  Box,
  Chip,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import {MyDestination} from '../WorkspacePage'
import {DestinationDef, Workspace} from '../../../service/restapi/data'
import {PostDestinationConfigReply} from '../../../service/restapi/RestApi'
import datatoggle from '@datatoggle/datatoggle-sdk'
import {UserContext} from '../../../service/UserContext'
import {userContext} from '../../../components/AuthCheck'

type Props = {
  workspace: Workspace
  myDestinations: MyDestination[]
  destinationDefs: DestinationDef[]
  onMyDestinationClick: (myDestination: MyDestination) => void
  onNewDestinationCreated: (destinationUri: string) => void
};

export const DestinationsSection = (props: Props) => {

  const workspace = props.workspace
  const ctx: UserContext = useContext(userContext)

  const [destinationMenuAnchorEl, setDestinationMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleNewDestinationClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDestinationMenuAnchorEl(event.currentTarget);
  };

  const handleDestinationMenuClose = () => {
    setDestinationMenuAnchorEl(null);
  };

  const onCreateNewDestination = async (destinationDef: DestinationDef) => {
    const myDest = props.myDestinations.find(m => m.definition.uri === destinationDef.uri)
    if (myDest) {
      props.onMyDestinationClick(myDest)
    } else {
      const result: PostDestinationConfigReply = await ctx.api.postDestinationConfig(workspace.uri, {
        destinationUri: destinationDef.uri,
        isEnabled: false,
        destinationSpecificConfig: {}
      })
      if (result.saved){
        props.onNewDestinationCreated(destinationDef.uri)
        datatoggle.track("create_destination", {
          workspace_uri: props.workspace.uri,
          destination_uri: destinationDef.uri
        })
      }
    }
  }


  return (
    <PanelSection title="My Destinations">
      <Box display={'flex'} flexDirection={'column'}>
        <TableContainer >
        <Table stickyHeader={true}>
          <TableHead>
            <TableRow>
              <TableCell>Destination</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Button size='small' variant="outlined" color={'primary'} onClick={handleNewDestinationClick}>New destination</Button>
              </TableCell>
            </TableRow>
            {
              props.myDestinations.map((d: MyDestination) => (
                <TableRow>
                  <TableCell>{d.definition.name}</TableCell>
                  <TableCell align="right">
                    {
                      d.configWithInfo.config.isEnabled ?
                        (<Chip color={'success'} variant="outlined" label="Enabled" />) :
                        (<Chip color={'warning'} variant="outlined" label="Disabled" />)
                    }
                  </TableCell>
                </TableRow>
              ))
            }

          </TableBody>
        </Table>
        </TableContainer>
      </Box>
      <Menu
        id="destinations-menu"
        anchorEl={destinationMenuAnchorEl}
        keepMounted
        open={destinationMenuAnchorEl !== null}
        onClose={handleDestinationMenuClose}
      >
        {
          props.destinationDefs.map((d: DestinationDef) => (
            <MenuItem key={d.uri} onClick={() => onCreateNewDestination(d)}>{d.name}</MenuItem>
          ))
        }
      </Menu>
    </PanelSection>
  )
}
