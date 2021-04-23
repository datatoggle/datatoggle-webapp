import React, {FunctionComponent, useContext, useEffect, useState} from 'react'
import MyAppBar from '../../components/MyAppBar'
import {UserContext} from '../../service/UserContext'
import {userContext} from '../../components/AuthCheck'
import {Destination, Project} from '../../service/restapi/data'
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
  data: Destination | null
}

const ProjectPage: FunctionComponent = () => {

  let { uri } = useParams<{uri: string}>();
  const ctx: UserContext = useContext(userContext)
  const [project, setProject] = useState<Project | null>(null)
  const [panel, setPanel] = useState<Panel>({type: PanelType.ProjectOverview, data: null})


  const classes = useStyles();

  useEffect(() => {
    ctx.api.getProject(uri).then((result: Project) => {
      setProject(result)
    })
  }, [ctx, uri])

  if (project == null) {
    return <LoadingPage/>
  }

  let panelComp;
  switch (panel.type) {
    case PanelType.ProjectOverview:
      panelComp = <OverviewPanel project={project}/>
      break;
    case PanelType.Destination:
      panelComp = <DestinationPanel destination={panel.data as Destination}/>
      break;

  }

    return (<>
      <MyAppBar drawerDisplayed={true} projectName={project.name}/>
      <MenuDrawer project={project}
                  onProjectClick={() => setPanel({type: PanelType.ProjectOverview, data: null})}
                  onDestinationClick={(d) => setPanel({type: PanelType.Destination, data: d})}
      />
      <div className={classes.root}>
        {
          panelComp
        }
      </div>
    </>)
};

export default ProjectPage
