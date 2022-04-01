import React, { FunctionComponent } from 'react';
import {DestinationDef, Workspace} from '../../../service/restapi/data'
import {MyDestination} from '../WorkspacePage'
import DestinationsTable from '../overviewpanel/DestinationsTable'
import {PanelSection} from '../PanelSection'

interface OwnProps {
  workspace: Workspace,
  myDestinations: MyDestination[],
  destinationDefs: DestinationDef[],
  onNewDestinationCreated: (destinationUri: string) => void
}

type Props = OwnProps;

const MyDestinationsPanel: FunctionComponent<Props> = (props) => {

  return (     <PanelSection>
    <DestinationsTable
      workspace={props.workspace}
      myDestinations={props.myDestinations}
      destinationDefs={props.destinationDefs}
      onNewDestinationCreated={props.onNewDestinationCreated}
    />
  </PanelSection>);
};

export default MyDestinationsPanel;
