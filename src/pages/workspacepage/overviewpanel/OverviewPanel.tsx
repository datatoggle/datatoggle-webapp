import React, {FunctionComponent} from 'react'
import {Box} from '@mui/material'
import {DestinationDef, Workspace} from '../../../service/restapi/data'
import {MyDestination} from '../WorkspacePage'
import IntroSection from './IntroSection'
import {ApiKeySection} from './ApiKeySection'
import {DestinationsSection} from './DestinationsSection'

interface OwnProps {
  workspace: Workspace,
  myDestinations: MyDestination[],
  destinationDefs: DestinationDef[],
  onMyDestinationClick: (myDestination: MyDestination) => void
  onNewDestinationCreated: (destinationUri: string) => void
}

type Props = OwnProps;

const OverviewPanel: FunctionComponent<Props> = (props) => {

  return (     <Box
    display='flex'
    flexDirection='column'
    alignItems='left'
    paddingBottom='64px'
  >

    <IntroSection/>
    <ApiKeySection apiKey={props.workspace.apiKey}/>
    <DestinationsSection
  workspace={props.workspace}
  myDestinations={props.myDestinations}
  destinationDefs={props.destinationDefs}
  onMyDestinationClick={props.onMyDestinationClick}
  onNewDestinationCreated={props.onNewDestinationCreated}
  />
  </Box>);
};

export default OverviewPanel;
