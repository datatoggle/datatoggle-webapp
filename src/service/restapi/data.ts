
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
  destinationSpecificConfig: Map<string, string | boolean | null> // it's a map, need to be converted with new Map(Object.entries(configWithInfo))
}

export type DestinationConfigWithInfo = {
  config: DestinationConfig,
  paramErrors: Map<string, string>, // it's a map, need to be converted with new Map(Object.entries(paramErrors))
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
