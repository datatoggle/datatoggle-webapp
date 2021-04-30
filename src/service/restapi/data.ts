
export type ProjectSnippet = {
  uri: string
  name: string
}

export type Project = {
  uri: string
  apiKey: string
  name: string
  destinations: DestinationConfigWithInfo[]
}

export type DestinationConfig = {
  destinationUri: string,
  isEnabled: boolean,
  config: Object // it's a map, need to be converted with new Map(Object.entries(config))
}

export type DestinationConfigWithInfo = {
  config: DestinationConfig,
  paramErrors: Object, // it's a map, need to be converted with new Map(Object.entries(paramErrors))
}

export type DestinationDef = {
  uri: string
  name: string
  paramDefs: DestinationParamDef[]
}

export enum ParamType {
  Boolean= "Boolean",
  String = "String",
}

export type DestinationParamDef = {
  uri: string
  name: string,
  type: ParamType,
  defaultValue: boolean | string
}
