
export type PostGetConfigReply = {
  config: CustomerConfig,
}

export type CustomerConfig = {
  apiKey: string
  destinations: [Destination]
}

export type Destination = {
  isEnabled: boolean
  uri: string
  displayName: string
  config: [DestinationParam]
}

export type DestinationParam = {
  uri: string
  displayName: string,
  type: ParamType,
  value: boolean | string
}

export enum ParamType {
  Boolean= "Boolean",
  String = "String",
}

// https://create-react-app.dev/docs/adding-custom-environment-variables/
async function doGetRequest(pathAndParams: string): Promise<any> {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/${pathAndParams}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  return await response.json()
}

async function doPostRequest(path: string, body: any = {}): Promise<any> {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  return await response.json()
}

export async function postGetConfig(authToken: string): Promise<PostGetConfigReply> {
  return await doPostRequest('api/customer/get_config', {authToken: authToken})
}
