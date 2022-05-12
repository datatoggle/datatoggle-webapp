
export type WorkspaceSnippet = {
  uri: string
  name: string
}

export type Workspace = {
  uri: string
  apiKey: string
  name: string
  destinations: DestinationConfigWithInfo[]
}

export type DestinationConfig = {
  destinationUri: string,
  isEnabled: boolean,
  destinationSpecificConfig: DestinationSpecificConfig
}

export type DestinationConfigWithInfo = {
  config: DestinationConfig,
  paramErrors: ParamErrors,
}

export type ParamErrors = {
  [key: string]: string
}

export type DestinationDef = {
  uri: string
  name: string
  paramDefs: DestinationParamDef[]
}

export type DestinationSpecificConfig = {
  [key: string]: DestinationParam
}

export type ParamDict = {
  [key: string]: AtomicType
}

export type AtomicType = boolean | string | number

export type DestinationParam = AtomicType | ParamDict

export enum ParamType {
  Int = "Int",
  Float = "Float",
  Boolean= "Boolean",
  String = "String",
  Dict = "Dict"
}

export type DestinationParamDef = {
  uri: string
  name: string,
  type: ParamType,
  defaultValue: DestinationParam,
  isMandatory: boolean
}


