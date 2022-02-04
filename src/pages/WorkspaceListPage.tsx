import React, {FunctionComponent, useContext, useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'
import {userContext} from '../components/AuthCheck'
import {WorkspaceSnippet} from '../service/restapi/data'
import { NEW_WORKSPACE_URL, workspaceUrl} from '../service/urls'
import {UserContext} from '../service/UserContext'
import LoadingProgress from '../components/LoadingProgress'

interface OwnProps {
}

type Props = OwnProps;

const WorkspaceListPage: FunctionComponent<Props> = (props) => {

  const ctx: UserContext = useContext(userContext)
  const [workspaces, setWorkspaces] = useState<WorkspaceSnippet[] | null>(null)

  useEffect(() => {
    ctx.api.getWorkspaceSnippets().then((result: WorkspaceSnippet[]) => {
      setWorkspaces(result)
    })
  }, [ctx])

  if (workspaces == null) {
    return <LoadingProgress/>
  }

  if (workspaces.length === 0) {
    return <Redirect to={NEW_WORKSPACE_URL}/>
  } else {
    return <Redirect to={workspaceUrl(workspaces[0].uri)}/>
  }
}

export default WorkspaceListPage
