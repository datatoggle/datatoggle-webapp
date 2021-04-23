import React, {FunctionComponent, useContext, useEffect, useState} from 'react'
import MyAppBar from '../../components/MyAppBar'
import {UserContext} from '../../service/UserContext'
import {userContext} from '../../components/AuthCheck'
import {Project} from '../../service/restapi/data'
import {useParams} from 'react-router-dom'
import LoadingPage from '../LoadingPage'
import OverviewPanel from './OverviewPanel'
import MenuDrawer, {drawerWidth} from './MenuDrawer'
import {makeStyles} from '@material-ui/core/styles'
import {createStyles, Theme} from '@material-ui/core'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginLeft: drawerWidth
    }
  }))

const ProjectPage: FunctionComponent = () => {

  let { uri } = useParams<{uri: string}>();
  const ctx: UserContext = useContext(userContext)
  const [project, setProject] = useState<Project | null>(null)

  const classes = useStyles();

  useEffect(() => {
    ctx.api.getProject(uri).then((result: Project) => {
      setProject(result)
    })
  }, [ctx, uri])

  if (project == null) {
    return <LoadingPage/>
  }

    return (<>
      <MyAppBar drawerDisplayed={true} projectName={project.name}/>
      <MenuDrawer/>
      <div className={classes.root}>
      <OverviewPanel project={project}/>
      </div>
    </>)
};

export default ProjectPage
