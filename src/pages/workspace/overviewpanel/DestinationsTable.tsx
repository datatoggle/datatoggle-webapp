import React, {FunctionComponent} from 'react'
import {
  Box,
  Chip,
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
import {
  CATALOG_PANEL_URI,
  workspaceDestinationUrl,
  workspacePanelUrl
} from '../../../service/urls'
import {DestinationDef, Workspace} from '../../../service/restapi/data'
import {useHistory} from 'react-router-dom'

interface OwnProps {
  workspace: Workspace
  myDestinations: MyDestination[]
  destinationDefs: DestinationDef[]
  onNewDestinationCreated: (destinationUri: string) => void
}

type Props = OwnProps;

const DestinationsTable: FunctionComponent<Props> = (props) => {

  let history = useHistory();

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
                  <Button
                    size='small'
                    variant="outlined"
                    color={'primary'}
                    onClick={()=> history.push(workspacePanelUrl(props.workspace.uri, CATALOG_PANEL_URI))}>New destination</Button>
                </TableCell>
                <TableCell sx={{backgroundColor: backgroundTransparent}}/>
              </TableRow>
              {
                props.myDestinations.map((d: MyDestination) => (
                  <TableRow hover={true} key={d.definition.uri} onClick={() => history.push(workspaceDestinationUrl(props.workspace.uri, d.definition.uri))}>
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
    </>
  );
};

export default DestinationsTable;
