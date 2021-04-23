import React, {FunctionComponent, useContext, useEffect, useState} from 'react'
import MyAppBar from '../../components/MyAppBar'
import {UserContext} from '../../service/UserContext'
import {userContext} from '../../components/AuthCheck'
import {Project} from '../../service/restapi/data'
import {useParams} from 'react-router-dom'
import LoadingPage from '../LoadingPage'
import OverviewPanel from './OverviewPanel'
import MenuDrawer from './MenuDrawer'


const ProjectPage: FunctionComponent = () => {

  let { uri } = useParams<{uri: string}>();
  const ctx: UserContext = useContext(userContext)
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    ctx.api.getProject(uri).then((result: Project) => {
      setProject(result)
    })
  }, [ctx])

  if (project == null) {
    return <LoadingPage/>
  }

    return (<>
      <MyAppBar/>
      <MenuDrawer/>
      <OverviewPanel project={project}/>
    </>)
};

export default ProjectPage
