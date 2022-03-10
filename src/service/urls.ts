
export const NEW_WORKSPACE_URL = "/new-workspace"
export const HOME_URL = "/"
export const LOGIN_URL = "/login"
export const SIGNUP_URL = "/signup"

export const WORKSPACE_PATH = "/workspace/:workspace_uri"
export const MY_DESTINATIONS_PATH = `${WORKSPACE_PATH}/destinations`
export const DESTINATION_PATH = `${MY_DESTINATIONS_PATH}/:destination_def_uri`

export const workspaceUrl = (workspaceUri: string) => `/workspace/${workspaceUri}`
export const myDestinationsUrl = (workspaceUri: string) => `${workspaceUrl(workspaceUri)}/destinations`
export const destinationUrl = (workspaceUri: string, destinationDefUri: string) => `${myDestinationsUrl(workspaceUri)}/${destinationDefUri}`
