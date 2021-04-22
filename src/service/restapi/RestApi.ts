import {Project, ProjectSnippet} from './data'

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



// https://create-react-app.dev/docs/adding-custom-environment-variables/
async function doGetRequest(token: string, pathAndParams: string): Promise<any> {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/${pathAndParams}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
  })
  return await response.json()
}

async function doPostRequest(token: string, path: string, body: any = {}): Promise<any> {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(body)
  })
  return await response.json()
}

export class RestApi {

  private readonly authToken: string
  constructor(authToken: string) {
    this.authToken = authToken
  }

  async getProjectSnippets(): Promise<ProjectSnippet[]> {
    const result: GetProjectSnippetsReply = await doGetRequest(this.authToken, 'api/customer/project_snippets')
    return result.projects
  }

  async createProject(projectName: string): Promise<string>{
    const body: PostCreateProjectArgs = {
      projectName: projectName
    }
    const result: PostCreateProjectReply = await doPostRequest(this.authToken, 'api/customer/projects', body)
    return result.uri
  }

  async getProject(uri: string): Promise<Project>{
    const result: GetProjectReply = await doGetRequest(this.authToken, `api/customer/project/${uri}`)
    return result.project
  }
}
