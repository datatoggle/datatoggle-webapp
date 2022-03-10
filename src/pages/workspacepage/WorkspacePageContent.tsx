import React, { FunctionComponent } from 'react';
import MyAppBar from '../../components/MyAppBar'
import MenuDrawer, {drawerWidth} from './MenuDrawer'
import {Box, Divider} from '@mui/material'
import Typography from '@mui/material/Typography'
import {match, Route, Switch, useRouteMatch} from 'react-router-dom'
import OverviewPanel from './overviewpanel/OverviewPanel'
import DestinationPanel from './destinationpanel/DestinationPanel'
import {DestinationDef, Workspace} from '../../service/restapi/data'
import {MyDestination} from './WorkspacePage'
import {DESTINATION_PATH, WORKSPACE_PATH} from '../../service/urls'

export interface Panel {
  type: 'Workspace' | 'Destination'
  label: string
  currentDestinationUri?: string
}

function getActivePanel(matchIfDestUrl: match<{destination_def_uri: string}> | null, destinationDefs: DestinationDef[]): Panel {

  if (matchIfDestUrl){
    let destUri: string = matchIfDestUrl.params.destination_def_uri
    return {
      type: 'Destination',
      label: `My Destinations -> ${destinationDefs.find(d => d.uri === destUri)!!.name}`,
      currentDestinationUri: destUri
    }
  } else {
    return {
      type: 'Workspace',
      label: 'Overview'
    }
  }
}

interface OwnProps {
  workspace: Workspace,
  destinationDefs: DestinationDef[],
  onNewDestinationCreated: (destinationUri: string) => void,
  onDestinationModified: (destinationUri: string) => void
}

type Props = OwnProps;

const WorkspacePageContent: FunctionComponent<Props> = (props) => {

  let matchIfDestUrl: match<{destination_def_uri: string}> | null =  useRouteMatch(DESTINATION_PATH)
  const activePanel: Panel = getActivePanel(matchIfDestUrl, props.destinationDefs)

  const myDests: MyDestination[] = props.workspace.destinations.map(c => { return  {
    definition: props.destinationDefs.find(d => d.uri === c.config.destinationUri)!!,
    configWithInfo: c
  }})

    return (<>
    <MyAppBar />
    <MenuDrawer
      workspaceName={props.workspace.name}
      myDestinations={myDests}
      workspaceUri={props.workspace.uri}
      activePanel={activePanel}
    />
    <Box paddingLeft={drawerWidth}>
      <Box paddingTop='36px' paddingLeft='64px' paddingRight='40px'>
        <Typography variant={'h6'}>{activePanel.label}</Typography>
        <Divider sx={{paddingTop: '8px'}}/>
        <Box paddingTop="32px"/>
        <Switch>
          <Route exact path={WORKSPACE_PATH}>
            <OverviewPanel
              workspace={props.workspace}
              myDestinations={myDests}
              destinationDefs={props.destinationDefs}
              onNewDestinationCreated={props.onNewDestinationCreated}
            />
          </Route>
          <Route exact path={DESTINATION_PATH}>
            <DestinationPanel
              workspaceUri={props.workspace.uri}
              myDests={myDests}
              saved={false}
              onDestinationModified={props.onDestinationModified}
            />
          </Route>
        </Switch>
      </Box>
    </Box>
  </>)
};

export default WorkspacePageContent;
