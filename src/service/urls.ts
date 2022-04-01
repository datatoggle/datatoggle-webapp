
export const NEW_WORKSPACE_URL = "/new-workspace"
export const HOME_URL = "/"
export const LOGIN_URL = "/login"
export const SIGNUP_URL = "/signup"

export const WORKSPACE_PATH = `/workspace/:workspace_uri`
export const WORKSPACE_PANEL_PATH = `${WORKSPACE_PATH}/:panel_uri`
export const workspaceSpecificPanelPath = (panelUri: string) => `${WORKSPACE_PATH}/${panelUri}`

export const OVERVIEW_PANEL_URI = 'overview'
export const CATALOG_PANEL_URI = 'catalog'
export const DESTINATIONS_PANEL_URI = 'destinations'
export const DESTINATION_PANEL_PATH = `${workspaceSpecificPanelPath(DESTINATIONS_PANEL_URI)}/:destination_def_uri`

export const workspaceUrl = (workspaceUri: string) => `/workspace/${workspaceUri}`
export const workspacePanelUrl = (workspaceUri: string, panelUri: string) => `${workspaceUrl(workspaceUri)}/${panelUri}`
export const workspaceDestinationUrl = (workspaceUri: string, destinationDefUri: string) => `${workspacePanelUrl(workspaceUri, DESTINATIONS_PANEL_URI)}/${destinationDefUri}`
