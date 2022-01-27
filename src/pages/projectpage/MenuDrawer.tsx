import React, { FunctionComponent } from 'react';
import {Box, Drawer, Link, List, ListItem, ListItemIcon, ListItemText} from '@mui/material'
import {HOME_URL} from '../../service/urls'
import logo from '../../images/logo.png'
import HomeIcon from '@mui/icons-material/Home';
import PlayForWorkIcon from '@mui/icons-material/PlayForWork';
import {MyDestination} from './ProjectPage'

interface OwnProps {
  myDestinations: MyDestination[],
  onMyDestinationClick: (dest: MyDestination) => void
  onProjectOverviewClick: () => void
}

type Props = OwnProps;

export const drawerWidth = '240px';

const MenuDrawer: FunctionComponent<Props> = (props) => {

  return (
  <Drawer
      sx={{      width: drawerWidth,
        flexShrink: 0,}}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{      display: 'flex',
        alignItems: 'center',
        marginLeft: '16px'}}>
        <Link href={HOME_URL}>
          <Box component="img" src={logo} alt="Logo" height='48px'/>
        </Link>
      </Box>

      <List>
        <ListItem button key='project_overview' onClick={props.onProjectOverviewClick}>
          <ListItemIcon><HomeIcon/></ListItemIcon>
          <ListItemText primary='Project overview' primaryTypographyProps={{ variant: "h6" }}/>
        </ListItem>
        <ListItem key='My destinations'>
          <ListItemIcon><PlayForWorkIcon /></ListItemIcon>
          <ListItemText primary='Destinations' primaryTypographyProps={{ variant: "h6" }}/>
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
