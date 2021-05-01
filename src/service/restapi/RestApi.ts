import {DestinationConfig, DestinationConfigWithInfo, DestinationDef, Project, ProjectSnippet} from './data'
import firebase from 'firebase/app'

type GetProjectSnippetsReply = {
  projects: ProjectSnippet[]
}

type PostCreateProjectArgs = {
  projectName: string
}
type PostCreateProjectReply= {
  uri: string
}

type GetProjectReply = {
  project: Project
}

type GetDestinationDefsReply = {
  destinationDefs: DestinationDef[]
}

type PostDestinationConfigArgs = {
  projectUri: string,
  config: DestinationConfig
}

export type PostDestinationConfigReply = {
  saved: boolean
  configWithInfo: DestinationConfigWithInfo
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



  async getProjectSnippets(): Promise<ProjectSnippet[]> {
    const result: GetProjectSnippetsReply = await this.doGetRequest('api/customer/project-snippets')
    return result.projects
  }

  async createProject(projectName: string): Promise<string>{
    const body: PostCreateProjectArgs = {
      projectName: projectName
    }
    const result: PostCreateProjectReply = await this.doPostRequest('api/customer/projects', body)
    return result.uri
  }

  async getProject(uri: string): Promise<Project>{
    const result: GetProjectReply = await this.doGetRequest(`api/customer/project/${uri}`)

    result.project.destinations.forEach((d: DestinationConfigWithInfo) => {
      d.config.destinationSpecificConfig = new Map(Object.entries(d.config.destinationSpecificConfig))
      d.paramErrors = new Map(Object.entries(d.paramErrors))
    })

    return result.project
  }

  async getDestinationDefs(): Promise<DestinationDef[]>{
    const result: GetDestinationDefsReply = await this.doGetRequest( `api/customer/destination-defs`)
    return result.destinationDefs
  }

  async postDestinationConfig(projectUri: string, config: DestinationConfig): Promise<PostDestinationConfigReply>{
    const objectConfig: DestinationConfig = {
      ...config,
      // @ts-ignore
      destinationSpecificConfig: Object.fromEntries(config.destinationSpecificConfig.entries())
    }

    const body: PostDestinationConfigArgs = {
      projectUri: projectUri,
      config: objectConfig,
    }
    const result: PostDestinationConfigReply = await this.doPostRequest('api/customer/destination-configs', body)

    result.configWithInfo.config.destinationSpecificConfig = new Map(Object.entries(result.configWithInfo.config.destinationSpecificConfig))
    result.configWithInfo.paramErrors = new Map(Object.entries(result.configWithInfo.paramErrors))
    return result
  }

}
