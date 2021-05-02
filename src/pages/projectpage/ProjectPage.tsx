import React, {FunctionComponent, useContext, useEffect, useState} from 'react'
import MyAppBar from '../../components/MyAppBar'
import {UserContext} from '../../service/UserContext'
import {userContext} from '../../components/AuthCheck'
import {DestinationConfigWithInfo, DestinationDef, Project} from '../../service/restapi/data'
import {useParams} from 'react-router-dom'
import OverviewPanel from './OverviewPanel'
import MenuDrawer, {drawerWidth} from './MenuDrawer'
import {makeStyles} from '@material-ui/core/styles'
import {createStyles, Theme} from '@material-ui/core'
import DestinationPanel from './DestinationPanel'
import LoadingProgress from '../../components/LoadingProgress'


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
  currentDestinationUri: string | null
}

export type MyDestination = {
  definition: DestinationDef
  configWithInfo: DestinationConfigWithInfo
}

const ProjectPage: FunctionComponent = () => {

  let { uri } = useParams<{uri: string}>();
  const ctx: UserContext = useContext(userContext)
  const [project, setProject] = useState<Project | null>(null)
  const [countModifiedDestination, setCountModifiedDestination] = useState<number>(0)
  const [destinationDefs, setDestinationDefs] = useState<DestinationDef[] | null>(null)
  const [panel, setPanel] = useState<Panel>({type: PanelType.ProjectOverview, currentDestinationUri: null})
  const classes = useStyles();


  useEffect(() => {
    ctx.api.getProject(uri).then((result: Project) => {
      setProject(result)
    })
  }, [ctx, uri, countModifiedDestination])

  useEffect(() => {
    ctx.api.getDestinationDefs().then((destinationDefs: DestinationDef[]) => {
      setDestinationDefs(destinationDefs)
    })
  }, [ctx])

  if (project == null || destinationDefs == null) {
    return <LoadingProgress/>
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
        onNewDestinationCreated={(uri: string) => setCountModifiedDestination(countModifiedDestination + 1)}
        onMyDestinationClick={(d: MyDestination) => setPanel({type: PanelType.Destination, currentDestinationUri: d.definition.uri})}/>
      break;
    case PanelType.Destination:
      panelComp = <DestinationPanel
        projectUri={uri}
        myDestination={myDests.find((d) => d.definition.uri === panel.currentDestinationUri)!!}
        saved={false}
        onDestinationModified={(uri: string) => setCountModifiedDestination(countModifiedDestination + 1)}
      />
      break;

  }

    return (<>
      <MyAppBar drawerDisplayed={true} projectName={project.name}/>
      <MenuDrawer
        myDestinations={myDests}
        onMyDestinationClick={(d: MyDestination) => setPanel({type: PanelType.Destination, currentDestinationUri: d.definition.uri})}
        onProjectOverviewClick={() => setPanel({type: PanelType.ProjectOverview, currentDestinationUri: null})}
        />
      <div className={classes.root}>
        {
          panelComp
        }
      </div>
    </>)
};

export default ProjectPage
