import React, { FunctionComponent } from 'react';
import MyAppBar from '../../components/MyAppBar'
import MenuDrawer, {drawerWidth} from './MenuDrawer'
import {Box, Divider} from '@mui/material'
import Typography from '@mui/material/Typography'
import {match, Redirect, Route, Switch, useRouteMatch} from 'react-router-dom'
import OverviewPanel from './overviewpanel/OverviewPanel'
import DestinationPanel from './destinationpanel/DestinationPanel'
import {DestinationDef, Workspace} from '../../service/restapi/data'
import {MyDestination} from './WorkspacePage'
import MyDestinationsPanel from './mydestinationspanel/MyDestinationsPanel'
import {
  CATALOG_PANEL_URI, DESTINATION_PANEL_PATH, DESTINATIONS_PANEL_URI,
  OVERVIEW_PANEL_URI,
  WORKSPACE_PANEL_PATH,
  workspacePanelUrl, workspaceSpecificPanelPath
} from '../../service/urls'
import {SvgIconComponent} from '@mui/icons-material'
import HomeIcon from '@mui/icons-material/Home'
import PlayForWorkIcon from '@mui/icons-material/PlayForWork'
import AppsIcon from '@mui/icons-material/Apps'
import DestinationsCatalogPanel from './destinationscatalog/DestinationsCatalogPanel'

export enum PanelType {
  fixed,
  destination
}

export interface Panel {
  panelType: PanelType
  uri: string
  label: string,
  icon?: SvgIconComponent
}

const overviewPanel: Panel = {
  panelType: PanelType.fixed,
  uri: OVERVIEW_PANEL_URI,
  label: 'Overview',
  icon: HomeIcon
}

const catalogPanel: Panel = {
  panelType: PanelType.fixed,
  uri: CATALOG_PANEL_URI,
  label: 'Catalog',
  icon: AppsIcon
}

const destinationsPanel: Panel = {
  panelType: PanelType.fixed,
  uri: DESTINATIONS_PANEL_URI,
  label: 'My Destinations',
  icon: PlayForWorkIcon
}

export const fixedPanels: Panel[] = [
  overviewPanel,
  catalogPanel,
  destinationsPanel
]


function getActivePanel(
  matchIfPanelUrl: match<{panel_uri: string}> | null,
  matchIfDestUrl: match<{destination_def_uri: string}> | null,
  myDests: MyDestination[]): Panel | undefined {

  if (matchIfPanelUrl){
    return fixedPanels.find(d => d.uri === matchIfPanelUrl.params.panel_uri)
  }
  else if (matchIfDestUrl){
    const dest: MyDestination | undefined = myDests.find(d => d.definition.uri === matchIfDestUrl.params.destination_def_uri)
    if (dest){
      return {
        uri: dest.definition.uri,
        label: dest.definition.name,
        panelType: PanelType.destination,
      }
    } else {
      return undefined
    }
  } else {
    return undefined
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

  let matchIfPanelUrl: match<{panel_uri: string}> | null =  useRouteMatch({path: WORKSPACE_PANEL_PATH, exact: true})
  let matchIfDestUrl: match<{destination_def_uri: string}> | null =  useRouteMatch({path: DESTINATION_PANEL_PATH, exact: true})

  const myDests: MyDestination[] = props.workspace.destinations.map(c => { return  {
    definition: props.destinationDefs.find(d => d.uri === c.config.destinationUri)!!,
    configWithInfo: c
  }})

  const activePanel: Panel | undefined = getActivePanel(matchIfPanelUrl, matchIfDestUrl, myDests)
  if (!activePanel){
    return <Redirect to={workspacePanelUrl(props.workspace.uri, overviewPanel.uri)}/>
  }

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
        <Box paddingTop="8px"/>
        <Switch>
          <Route exact path={workspaceSpecificPanelPath(overviewPanel.uri)}>
            <OverviewPanel
              workspace={props.workspace}
              myDestinations={myDests}
              destinationDefs={props.destinationDefs}
              onNewDestinationCreated={props.onNewDestinationCreated}
            />
          </Route>
          <Route exact path={workspaceSpecificPanelPath(catalogPanel.uri)}>
            <DestinationsCatalogPanel
              destinationDefs={props.destinationDefs}
            />
          </Route>
          <Route exact path={DESTINATION_PANEL_PATH}>
            <DestinationPanel
              workspaceUri={props.workspace.uri}
              myDests={myDests}
              saved={false}
              onDestinationModified={props.onDestinationModified}
            />
          </Route>
          <Route exact path={workspaceSpecificPanelPath(destinationsPanel.uri)}>
            <MyDestinationsPanel
              workspace={props.workspace}
              myDestinations={myDests}
              destinationDefs={props.destinationDefs}
              onNewDestinationCreated={props.onNewDestinationCreated}
            />
          </Route>
        </Switch>
      </Box>
    </Box>
  </>)
};

export default WorkspacePageContent;
