
import React from 'react'
import {PanelSection} from '../PanelSection'
import {MyDestination} from '../WorkspacePage'
import {DestinationDef, Workspace} from '../../../service/restapi/data'
import DestinationsTable from './DestinationsTable'
type Props = {
  workspace: Workspace
  myDestinations: MyDestination[]
  destinationDefs: DestinationDef[]
  onNewDestinationCreated: (destinationUri: string) => void
};

export const DestinationsSection = (props: Props) => {

  return (
    <PanelSection title="My Destinations">
      <DestinationsTable
      workspace={props.workspace}
      myDestinations={props.myDestinations}
      destinationDefs={props.destinationDefs}
      onNewDestinationCreated={props.onNewDestinationCreated}
      />
    </PanelSection>
  )
}
