import React, {FunctionComponent} from 'react'
import {Box, Drawer, List} from '@mui/material'
import icon from '../../images/icon.png'
import HomeIcon from '@mui/icons-material/Home'
import PlayForWorkIcon from '@mui/icons-material/PlayForWork'
import {MyDestination} from './WorkspacePage'
import {destinationUrl, myDestinationsUrl, workspaceUrl} from '../../service/urls'
import {useHistory} from 'react-router-dom'
import {Panel} from './WorkspacePageContent'
import MenuPrimaryLink from './MenuPrimaryLink'
import MenuSecondaryLink from './MenuSecondaryLink'

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

        <MenuPrimaryLink icon={HomeIcon} isActive={props.activePanel.type === "Workspace"} label='Overview' url={workspaceUrl(props.workspaceUri)}/>
        <MenuPrimaryLink icon={PlayForWorkIcon} isActive={props.activePanel.type === "MyDestinations"} label='My destinations' url={myDestinationsUrl(props.workspaceUri)}/>

        {
          props.myDestinations.map((d: MyDestination) => (
            <MenuSecondaryLink
              label={d.definition.name}
              url={destinationUrl(props.workspaceUri, d.definition.uri)}
              isActive={props.activePanel.type === "Destination" && props.activePanel.currentDestinationUri === d.definition.uri}/>
          ))
        }
      </List>
    </Drawer>
      )
};

export default MenuDrawer;
