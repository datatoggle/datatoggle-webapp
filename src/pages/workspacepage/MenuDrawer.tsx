import React, { FunctionComponent } from 'react';
import {Box, Drawer, Link, List, ListItem, ListItemIcon, ListItemText} from '@mui/material'
import {HOME_URL} from '../../service/urls'
import logo from '../../images/logo.png'
import HomeIcon from '@mui/icons-material/Home';
import PlayForWorkIcon from '@mui/icons-material/PlayForWork';
import {MyDestination} from './WorkspacePage'

interface OwnProps {
  workspaceName: string
  myDestinations: MyDestination[],
  onMyDestinationClick: (dest: MyDestination) => void
  onWorkspaceOverviewClick: () => void
}


type Props = OwnProps;

export const drawerWidth = '240px';

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
        margin: '16px', marginTop: '20px', paddingBottom: '24px'}}>

          <Box component="img" src={icon} alt="Logo" height='24px' paddingRight='24px'/>

        <Box sx={{      display: 'flex',
          alignItems: 'center'}}>{props.workspaceName}</Box>

      </Box>

      <List dense={true}>

        <ListItem key='quick_start'>
          <ListItemIcon><DoubleArrowIcon /></ListItemIcon>
          <ListItemText primary='Quick Start' primaryTypographyProps={{ variant: "subtitle2" }}/>
        </ListItem>

        <ListItem button key='workspace_overview' onClick={props.onWorkspaceOverviewClick}>
          <ListItemIcon><HomeIcon/></ListItemIcon>
          <ListItemText primary='Overview' primaryTypographyProps={{ variant: "subtitle2" }}/>
        </ListItem>
        <ListItem key='My destinations'>
          <ListItemIcon><PlayForWorkIcon /></ListItemIcon>
          <ListItemText primary='My Destinations' primaryTypographyProps={{ variant: "subtitle2" }}/>
        </ListItem>

        {
          props.myDestinations.map((d: MyDestination) => (
            <ListItem button key={d.definition.uri} onClick={() => props.onMyDestinationClick(d)}>
              <ListItemText inset primary={d.definition.name}/>
            </ListItem>
          ))
        }
      </List>
    </Drawer>)
};

export default MenuDrawer;
