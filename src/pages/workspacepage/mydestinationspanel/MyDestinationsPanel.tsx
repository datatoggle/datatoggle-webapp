import React, { FunctionComponent } from 'react';
import {Box} from '@mui/material'
import {DestinationDef, Workspace} from '../../../service/restapi/data'
import {MyDestination} from '../WorkspacePage'
import DestinationsTable from '../overviewpanel/DestinationsTable'

interface OwnProps {
  workspace: Workspace,
  myDestinations: MyDestination[],
  destinationDefs: DestinationDef[],
  onNewDestinationCreated: (destinationUri: string) => void
}

type Props = OwnProps;

const MyDestinationsPanel: FunctionComponent<Props> = (props) => {

  return (     <Box
    display='flex'
    flexDirection='column'
    alignItems='left'
    paddingBottom='64px'
  >
    <DestinationsTable
      workspace={props.workspace}
      myDestinations={props.myDestinations}
      destinationDefs={props.destinationDefs}
      onNewDestinationCreated={props.onNewDestinationCreated}
    />
  </Box>);
};

export default MyDestinationsPanel;
