import React, {FunctionComponent} from 'react'
import {Box, Drawer, List, ListItem, ListItemIcon, ListItemText} from '@mui/material'
import icon from '../../images/icon.png'
import HomeIcon from '@mui/icons-material/Home'
import PlayForWorkIcon from '@mui/icons-material/PlayForWork'
import {MyDestination, Panel, PanelType} from './WorkspacePage'

interface OwnProps {
  activePanel: Panel
  workspaceName: string
  myDestinations: MyDestination[],
  onMyDestinationClick: (dest: MyDestination) => void
  onWorkspaceOverviewClick: () => void
}


type Props = OwnProps;

export const drawerWidth = '280px';

const MenuDrawer: FunctionComponent<Props> = (props) => {

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

        <ListItem button key='workspace_overview' onClick={props.onWorkspaceOverviewClick}>
          <ListItemIcon><HomeIcon color={props.activePanel.type === PanelType.WorkspaceOverview ? 'primary' : undefined}/></ListItemIcon>
          <ListItemText primary='Overview' primaryTypographyProps={{ variant: "h6", color: props.activePanel.type === PanelType.WorkspaceOverview ? 'primary' : undefined }}/>
        </ListItem>
        <ListItem key='My destinations'>
          <ListItemIcon><PlayForWorkIcon /></ListItemIcon>
          <ListItemText primary='My Destinations' primaryTypographyProps={{ variant: "h6" }}/>
        </ListItem>

        {
          props.myDestinations.map((d: MyDestination) => (
            <ListItem button key={d.definition.uri} onClick={() => props.onMyDestinationClick(d)}>
              <ListItemText
                inset
                primary={d.definition.name}
                primaryTypographyProps={{ variant: "subtitle2",
                  color: props.activePanel.type === PanelType.Destination && props.activePanel.currentDestinationUri === d.definition.uri ? 'primary' : undefined }}
              />
            </ListItem>
          ))
        }
      </List>
    </Drawer>
      )
};

export default MenuDrawer;
