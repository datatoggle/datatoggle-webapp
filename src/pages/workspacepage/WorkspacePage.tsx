import React, {FunctionComponent, useContext, useEffect, useState} from 'react'
import MyAppBar from '../../components/MyAppBar'
import {UserContext} from '../../service/UserContext'
import {userContext} from '../../components/AuthCheck'
import {DestinationConfigWithInfo, DestinationDef, Workspace} from '../../service/restapi/data'
import {useParams} from 'react-router-dom'
import OverviewPanel from './OverviewPanel'
import MenuDrawer, {drawerWidth} from './MenuDrawer'
import DestinationPanel from './DestinationPanel'
import LoadingProgress from '../../components/LoadingProgress'
import {Box, Divider} from '@mui/material'
import Typography from '@mui/material/Typography'

export enum PanelType {
  WorkspaceOverview,
  Destination
}

function toPanelLabel(panel: Panel, destinationDefs: DestinationDef[]): string {
  switch (panel.type) {
    case PanelType.WorkspaceOverview:
      return 'Overview'
    case PanelType.Destination:
      return `My Destinations -> ${destinationDefs.find(d => d.uri === panel.currentDestinationUri)!!.name}`
  }
}

export interface Panel {
  type: PanelType
  currentDestinationUri: string | null
}

export type MyDestination = {
  definition: DestinationDef
  configWithInfo: DestinationConfigWithInfo
}

const WorkspacePage: FunctionComponent = () => {

  let { uri } = useParams<{uri: string}>();
  const ctx: UserContext = useContext(userContext)
  const [workspace, setWorkspace] = useState<Workspace | null>(null)
  const [countModifiedDestination, setCountModifiedDestination] = useState<number>(0)
  const [destinationDefs, setDestinationDefs] = useState<DestinationDef[] | null>(null)
  const [panel, setPanel] = useState<Panel>({type: PanelType.WorkspaceOverview, currentDestinationUri: null})

  useEffect(() => {
    ctx.api.getWorkspace(uri).then((result: Workspace) => {
      setWorkspace(result)
    })
  }, [ctx, uri, countModifiedDestination])

  useEffect(() => {
    ctx.api.getDestinationDefs().then((destinationDefs: DestinationDef[]) => {
      setDestinationDefs(destinationDefs)
    })
  }, [ctx])

  if (workspace == null || destinationDefs == null) {
    return <LoadingProgress/>
  }

  const myDests: MyDestination[] = workspace.destinations.map(c => { return  {
    definition: destinationDefs.find(d => d.uri === c.config.destinationUri)!!,
    configWithInfo: c
  }})

  let panelComp;
  switch (panel.type) {
    case PanelType.WorkspaceOverview:
      panelComp = <OverviewPanel
        workspace={workspace}
        myDestinations={myDests}
        destinationDefs={destinationDefs}
        onNewDestinationCreated={(uri: string) => setCountModifiedDestination(countModifiedDestination + 1)}
        onMyDestinationClick={(d: MyDestination) => setPanel({type: PanelType.Destination, currentDestinationUri: d.definition.uri})}/>
      break;
    case PanelType.Destination:
      panelComp = <DestinationPanel
        workspaceUri={uri}
        myDestination={myDests.find((d) => d.definition.uri === panel.currentDestinationUri)!!}
        saved={false}
        onDestinationModified={(uri: string) => setCountModifiedDestination(countModifiedDestination + 1)}
      />
      break;

  }

    return (<>
      <MyAppBar />
      <MenuDrawer
        activePanel={panel}
        workspaceName={workspace.name}
        myDestinations={myDests}
        onMyDestinationClick={(d: MyDestination) => setPanel({type: PanelType.Destination, currentDestinationUri: d.definition.uri})}
        onWorkspaceOverviewClick={() => setPanel({type: PanelType.WorkspaceOverview, currentDestinationUri: null})}
        />
      <Box paddingLeft={drawerWidth}>
        <Box paddingTop='36px' paddingLeft='64px' paddingRight='40px'>
        <Typography variant={'h6'}>{toPanelLabel(panel, destinationDefs)}</Typography>
        <Divider sx={{paddingTop: '8px'}}/>
        {
          panelComp
        }
        </Box>
      </Box>
    </>)
};

export default WorkspacePage
