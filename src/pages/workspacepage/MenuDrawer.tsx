import React, {FunctionComponent} from 'react'
import {Box, Drawer, List, ListItem, ListItemIcon, ListItemText} from '@mui/material'
import icon from '../../images/icon.png'
import HomeIcon from '@mui/icons-material/Home'
import PlayForWorkIcon from '@mui/icons-material/PlayForWork'
import {MyDestination} from './WorkspacePage'
import {destinationUrl, myDestinationsUrl, workspaceUrl} from '../../service/urls'
import {useHistory} from 'react-router-dom'
import {Panel} from './WorkspacePageContent'

interface OwnProps {
  workspaceUri: string
  workspaceName: string
  myDestinations: MyDestination[]
  activePanel: Panel
}


type Props = OwnProps;

export const drawerWidth = '280px';

const MenuDrawer: FunctionComponent<Props> = (props) => {

  let history = useHistory();

  return (
  <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiPaper-root': {
          borderRight: '0px'
        }
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{      display: 'flex',
        alignItems: 'center',
        paddingLeft: '36px',
        margin: '16px', marginTop: '20px', paddingBottom: '24px'}}>

          <Box component="img" src={icon} alt="Logo" height='24px' paddingRight='24px'/>

        <Box sx={{      display: 'flex',
          alignItems: 'center'}}>{props.workspaceName}</Box>

      </Box>

      <List dense={true} sx={{paddingLeft: '36px'}}>

        <ListItem button key='workspace_overview' onClick={() => history.push(workspaceUrl(props.workspaceUri))}>
          <ListItemIcon><HomeIcon color={props.activePanel.type === "Workspace" ? 'primary': undefined}/></ListItemIcon>
          <ListItemText primary='Overview' primaryTypographyProps={{ variant: "h6", color: props.activePanel.type === "Workspace" ? 'primary': undefined }}/>
        </ListItem>
        <ListItem button key='My destinations' onClick={() => history.push(myDestinationsUrl(props.workspaceUri))}>
          <ListItemIcon><PlayForWorkIcon color={props.activePanel.type === "MyDestinations" ? 'primary': undefined} /></ListItemIcon>
          <ListItemText primary='My Destinations' primaryTypographyProps={{ variant: "h6", color: props.activePanel.type === "MyDestinations" ? 'primary': undefined }}/>
        </ListItem>

        {
          props.myDestinations.map((d: MyDestination) => (
            <ListItem button key={d.definition.uri} onClick={() => history.push(destinationUrl(props.workspaceUri, d.definition.uri))}>
              <ListItemText
                inset
                primary={d.definition.name}
                primaryTypographyProps={{ variant: "subtitle2",
                  color: props.activePanel.type === "Destination" && props.activePanel.currentDestinationUri === d.definition.uri ? 'primary': undefined }}
              />
            </ListItem>
          ))
        }
      </List>
    </Drawer>
      )
};

export default MenuDrawer;
