import {DestinationConfig, DestinationConfigWithInfo, DestinationDef, Workspace, WorkspaceSnippet} from './data'
import firebase from 'firebase/app'

type GetWorkspaceSnippetsReply = {
  workspaces: WorkspaceSnippet[]
}

type PostCreateWorkspaceArgs = {
  workspaceName: string
}
type PostCreateWorkspaceReply = {
  uri: string
}

type GetWorkspaceReply = {
  workspace: Workspace
}

type GetDestinationDefsReply = {
  destinationDefs: DestinationDef[]
}

type PostDestinationConfigArgs = {
  workspaceUri: string,
  config: DestinationConfig
}

export type PostDestinationConfigReply = {
  saved: boolean
  configWithInfo: DestinationConfigWithInfo
}

export type PostEventArgs = {
  eventName: string
  data: { }
}


export class RestApi {

  private readonly user: firebase.User | null

  constructor(user: firebase.User | null) {
    this.user = user
  }


// https://create-react-app.dev/docs/adding-custom-environment-variables/
  async doGetRequest(pathAndParams: string): Promise<any> {
    const token = await this.user!!.getIdToken()
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${pathAndParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
    })
    return await response.json()
  }

  async doPostRequest(path: string, body: any = {}): Promise<any> {
    const token = await this.user!!.getIdToken()
    const strBody = JSON.stringify(body)
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: strBody
    })
    return await response.json()
  }



  async getWorkspaceSnippets(): Promise<WorkspaceSnippet[]> {
    const result: GetWorkspaceSnippetsReply = await this.doGetRequest('api/customer/workspace-snippets')
    return result.workspaces
  }

  async createWorkspace(workspaceName: string): Promise<string>{
    const body: PostCreateWorkspaceArgs = {
      workspaceName: workspaceName
    }
    const result: PostCreateWorkspaceReply = await this.doPostRequest('api/customer/workspaces', body)
    return result.uri
  }

  async getWorkspace(uri: string): Promise<Workspace>{
    const result: GetWorkspaceReply = await this.doGetRequest(`api/customer/workspace/${uri}`)
    return result.workspace
  }

  async getDestinationDefs(): Promise<DestinationDef[]>{
    const result: GetDestinationDefsReply = await this.doGetRequest( `api/customer/destination-defs`)
    return result.destinationDefs
  }

  async postDestinationConfig(workspaceUri: string, config: DestinationConfig): Promise<PostDestinationConfigReply>{
    const body: PostDestinationConfigArgs = {
      workspaceUri: workspaceUri,
      config: config,
    }
    return await this.doPostRequest('api/customer/destination-configs', body)
  }

  async postEvent(eventName: string, data: {}): Promise<{}>{
    const body: PostEventArgs = {
      eventName,
      data
    }
    return await this.doPostRequest('api/customer/event', body)
  }

}
