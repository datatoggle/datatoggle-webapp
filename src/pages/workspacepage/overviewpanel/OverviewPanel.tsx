import React, {FunctionComponent, useContext, useState} from 'react'
import Typography from '@mui/material/Typography'
import {Alert, Box, Card, Chip, Link, Menu, MenuItem, Snackbar} from '@mui/material'
import Button from '@mui/material/Button'
import {DestinationDef, Workspace} from '../../../service/restapi/data'
import {MyDestination} from '../WorkspacePage'
import {UserContext} from '../../../service/UserContext'
import {userContext} from '../../../components/AuthCheck'
import {PostDestinationConfigReply} from '../../../service/restapi/RestApi'
import WorkspaceIntro from './WorkspaceIntro'
import {CopyAll} from '@mui/icons-material'
import datatoggle from '@datatoggle/datatoggle-sdk'

interface OwnProps {
  workspace: Workspace,
  myDestinations: MyDestination[],
  destinationDefs: DestinationDef[],
  onMyDestinationClick: (myDestination: MyDestination) => void
  onNewDestinationCreated: (destinationUri: string) => void
}

type Props = OwnProps;

const OverviewPanel: FunctionComponent<Props> = (props) => {

  const workspace = props.workspace
  const ctx: UserContext = useContext(userContext)

  const [destinationMenuAnchorEl, setDestinationMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [apiKeyCopiedAlertOpen, setApiKeyCopiedAlertOpen] = useState<boolean>(false);

  const handleNewDestinationClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDestinationMenuAnchorEl(event.currentTarget);
  };

  const handleDestinationMenuClose = () => {
    setDestinationMenuAnchorEl(null);
  };

  const onCreateNewDestination = async (destinationDef: DestinationDef) => {
    const myDest = props.myDestinations.find(m => m.definition.uri === destinationDef.uri)
    if (myDest) {
      props.onMyDestinationClick(myDest)
    } else {
      const result: PostDestinationConfigReply = await ctx.api.postDestinationConfig(workspace.uri, {
        destinationUri: destinationDef.uri,
        isEnabled: false,
        destinationSpecificConfig: {}
      })
      if (result.saved){
        props.onNewDestinationCreated(destinationDef.uri)
        datatoggle.track("create_destination", {
          workspace_uri: props.workspace.uri,
          destination_uri: destinationDef.uri
        })
      }
    }
  }


  return (     <Box sx={{      display: 'flex',
    flexDirection: 'column',
    alignItems: 'left'}}>

    <WorkspaceIntro/>

    <Typography variant="h6" paddingTop="48px" paddingBottom="16px">
      My API key
    </Typography>

    <Typography  paddingBottom="16px">
      This API key is used to initialize the DataToggle API on your website.
    </Typography>

    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={apiKeyCopiedAlertOpen} autoHideDuration={6000} onClose={() => {setApiKeyCopiedAlertOpen(false)}}>
      <Alert onClose={() => {setApiKeyCopiedAlertOpen(false)}} severity="success">
        Api key was copied to the clipboard
      </Alert>
    </Snackbar>
    <div>
    <Chip icon={<CopyAll/>} label={workspace.apiKey} variant="outlined" onClick={() => {
  navigator.clipboard.writeText(workspace.apiKey).then(() => {
    setApiKeyCopiedAlertOpen(true)
  })
}} />
    </div>

    <Typography variant="h6" paddingTop="48px" paddingBottom="16px">
      My destinations
    </Typography>

    <Box sx={{      width: '512px',
      display: 'flex',
      paddingTop: '64px',
      paddingBottom: '16px',}}>
      <Typography variant="h5" component="h2">
        My destinations
      </Typography>
      <Box sx={{flexGrow: 1}}/>
        <Button variant="contained" color={'primary'} onClick={handleNewDestinationClick}>New destination</Button>
    </Box>
    <>
      {props.myDestinations.map((d: MyDestination) => (
        <Card key={d.definition.uri} sx={{      width: '512px',
          height: '128px',
          borderRadius: '16px',
          margin: '16px'}} onClick={() => props.onMyDestinationClick(d)}>
          <Link underline={'none'}>
            <Button sx={{      height: '100%',
              width: '100%',
              textTransform: 'none',}}>
              <Box sx={{      display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%'}}>
                <Typography variant="h6" component="h2">
                  {d.definition.name}
                </Typography>
              </Box>
            </Button>
          </Link>
        </Card>))}
    </>
    <Menu
      id="destinations-menu"
      anchorEl={destinationMenuAnchorEl}
      keepMounted
      open={destinationMenuAnchorEl !== null}
      onClose={handleDestinationMenuClose}
    >
      {
        props.destinationDefs.map((d: DestinationDef) => (
          <MenuItem key={d.uri} onClick={() => onCreateNewDestination(d)}>{d.name}</MenuItem>
        ))
      }
    </Menu>
  </Box>);
};

export default OverviewPanel;
