import React, {FunctionComponent, useContext, useEffect, useState} from 'react'
import MyAppBar from '../../components/MyAppBar'
import {UserContext} from '../../service/UserContext'
import {userContext} from '../../components/AuthCheck'
import {DestinationConfigWithInfo, DestinationDef, Project} from '../../service/restapi/data'
import {useParams} from 'react-router-dom'
import LoadingPage from '../LoadingPage'
import OverviewPanel from './OverviewPanel'
import MenuDrawer, {drawerWidth} from './MenuDrawer'
import {makeStyles} from '@material-ui/core/styles'
import {createStyles, Theme} from '@material-ui/core'
import DestinationPanel from './DestinationPanel'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginLeft: drawerWidth
    }
  }))

enum PanelType {
  ProjectOverview,
  Destination
}

interface Panel {
  type: PanelType
  myDestination: MyDestination | null
}

export type MyDestination = {
  definition: DestinationDef
  configWithInfo: DestinationConfigWithInfo
}

const ProjectPage: FunctionComponent = () => {

  let { uri } = useParams<{uri: string}>();
  const ctx: UserContext = useContext(userContext)
  const [project, setProject] = useState<Project | null>(null)
  const [lastModifiedDestinationUri, setLastModifiedDestinationUri] = useState<string | null>(null)
  const [destinationDefs, setDestinationDefs] = useState<DestinationDef[] | null>(null)
  const [panel, setPanel] = useState<Panel>({type: PanelType.ProjectOverview, myDestination: null})
  const classes = useStyles();


  useEffect(() => {
    ctx.api.getProject(uri).then((result: Project) => {
      setProject(result)
    })
  }, [ctx, uri, lastModifiedDestinationUri])

  useEffect(() => {
    ctx.api.getDestinationDefs().then((destinationDefs: DestinationDef[]) => {
      setDestinationDefs(destinationDefs)
    })
  }, [ctx])

  if (project == null || destinationDefs == null) {
    return <LoadingPage/>
  }

  const myDests: MyDestination[] = project.destinations.map(c => { return  {
    definition: destinationDefs.find(d => d.uri === c.config.destinationUri)!!,
    configWithInfo: c
  }})

  let panelComp;
  switch (panel.type) {
    case PanelType.ProjectOverview:
      panelComp = <OverviewPanel
        project={project}
        myDestinations={myDests}
        destinationDefs={destinationDefs}
        onNewDestinationCreated={(uri: string) => setLastModifiedDestinationUri(uri)}
        onMyDestinationClick={(d: MyDestination) => setPanel({type: PanelType.Destination, myDestination: d})}/>
      break;
    case PanelType.Destination:
      panelComp = <DestinationPanel
        projectUri={uri}
        myDestination={panel.myDestination as MyDestination}
        saved={false}
        onDestinationModified={(uri: string) => setLastModifiedDestinationUri(uri)}
      />
      break;

  }

    return (<>
      <MyAppBar drawerDisplayed={true} projectName={project.name}/>
      <MenuDrawer
        myDestinations={myDests}
        onMyDestinationClick={(d: MyDestination) => setPanel({type: PanelType.Destination, myDestination: d})}
        onProjectOverviewClick={() => setPanel({type: PanelType.ProjectOverview, myDestination: null})}
        />
      <div className={classes.root}>
        {
          panelComp
        }
      </div>
    </>)
};

export default ProjectPage
