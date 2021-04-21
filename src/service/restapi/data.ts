
export type ProjectSnippet = {
  uri: string
  name: string
}

export type Project = {
  uri: string
  apiKey: string
  name: string
  destinations: Destination[]
}

export type Destination = {
  uri: string
  isEnabled: boolean
  name: string
  config: DestinationParam[]
}

export enum ParamType {
  Boolean= "Boolean",
  String = "String",
}

export type DestinationParam = {
  uri: string
  name: string,
  type: ParamType,
  value: boolean | string
}
