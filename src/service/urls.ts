
export const NEW_WORKSPACE_URL = "/new-workspace"
export const HOME_URL = "/"
export const LOGIN_URL = "/login"
export const SIGNUP_URL = "/signup"

export const WORKSPACE_PATH = "/workspace/:workspace_uri"
export const workspaceUrl = (workspaceUri: string) => `/workspace/${workspaceUri}`

export const DESTINATION_PATH = `${WORKSPACE_PATH}/destinations/:destination_def_uri`
export const destinationUrl = (workspaceUri: string, destinationDefUri: string) => `/workspace/${workspaceUri}/destinations/${destinationDefUri}`
