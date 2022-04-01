import React, {FunctionComponent, useContext, useEffect, useState} from 'react'
import {UserContext} from '../../service/UserContext'
import {userContext} from '../../components/AuthCheck'
import {DestinationConfigWithInfo, DestinationDef, Workspace} from '../../service/restapi/data'
import {useHistory, useParams} from 'react-router-dom'
import LoadingProgress from '../../components/LoadingProgress'
import WorkspacePageContent from './WorkspacePageContent'
import { workspaceDestinationUrl} from '../../service/urls'


export type MyDestination = {
  definition: DestinationDef
  configWithInfo: DestinationConfigWithInfo
}

const WorkspacePage: FunctionComponent = () => {

  let { workspace_uri } = useParams<{workspace_uri: string}>();
  const ctx: UserContext = useContext(userContext)
  const history = useHistory();
  const [workspace, setWorkspace] = useState<Workspace | null>(null)
  const [countModifiedDestination, setCountModifiedDestination] = useState<number>(0)
  const [destinationDefs, setDestinationDefs] = useState<DestinationDef[] | null>(null)
  const [destinationCreatedUri, setDestinationCreatedUri] = useState<string | null>(null)

  function onNewDestinationCreated(destinationDefUri: string) {
    setDestinationCreatedUri(destinationDefUri)
  }

  // load workspace and destinationDefs
  useEffect(() => {
    ctx.api.getWorkspace(workspace_uri).then((result: Workspace) => {
      setWorkspace(result)
      if (destinationCreatedUri != null){
        setDestinationCreatedUri(null)
        history.push(workspaceDestinationUrl(workspace_uri, destinationCreatedUri))
      }
    })
  }, [ctx, workspace_uri, destinationCreatedUri, countModifiedDestination, history])

  useEffect(() => {
    ctx.api.getDestinationDefs().then((destinationDefs: DestinationDef[]) => {
      setDestinationDefs(destinationDefs)
    })
  }, [ctx])

  if (workspace == null || destinationDefs == null) {
    return <LoadingProgress/>
  }

  return (
    <WorkspacePageContent
      workspace={workspace}
      destinationDefs={destinationDefs}
      onNewDestinationCreated={onNewDestinationCreated}
      onDestinationModified={(_: string) => setCountModifiedDestination(countModifiedDestination + 1)}/>
  )

};

export default WorkspacePage
