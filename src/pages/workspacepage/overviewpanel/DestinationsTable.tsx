import React, {FunctionComponent, useContext, useState} from 'react'
import {
  Box,
  Chip,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import {backgroundTransparent} from '../../../DesignConstants'
import Button from '@mui/material/Button'
import {MyDestination} from '../WorkspacePage'
import {destinationUrl} from '../../../service/urls'
import {DestinationDef, Workspace} from '../../../service/restapi/data'
import {UserContext} from '../../../service/UserContext'
import {userContext} from '../../../components/AuthCheck'
import {useHistory} from 'react-router-dom'
import {PostDestinationConfigReply} from '../../../service/restapi/RestApi'
import datatoggle from '@datatoggle/datatoggle-sdk'

interface OwnProps {
  workspace: Workspace
  myDestinations: MyDestination[]
  destinationDefs: DestinationDef[]
  onNewDestinationCreated: (destinationUri: string) => void
}

type Props = OwnProps;

const DestinationsTable: FunctionComponent<Props> = (props) => {

  const workspace = props.workspace
  const ctx: UserContext = useContext(userContext)
  let history = useHistory();

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
      history.push(destinationUrl(workspace.uri, myDest.definition.uri))
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
          destination_def_uri: destinationDef.uri
        })
      }
    }
  }


  return (
    <>
      <Box display={'flex'} flexDirection={'column'}>
        <TableContainer component={Paper}>
          <Table stickyHeader={true}>
            <TableHead>
              <TableRow>
                <TableCell>Destination</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{backgroundColor:backgroundTransparent}}>
                  <Button size='small' variant="outlined" color={'primary'} onClick={handleNewDestinationClick}>New destination</Button>
                </TableCell>
                <TableCell sx={{backgroundColor: backgroundTransparent}}/>
              </TableRow>
              {
                props.myDestinations.map((d: MyDestination) => (
                  <TableRow hover={true} key={d.definition.uri} onClick={() => history.push(destinationUrl(props.workspace.uri, d.definition.uri))}>
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
    </>
  );
};

export default DestinationsTable;
