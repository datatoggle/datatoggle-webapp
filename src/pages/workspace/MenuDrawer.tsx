import React, {FunctionComponent} from 'react'
import {Box, Drawer, List} from '@mui/material'
import icon from '../../images/icon.png'
import {MyDestination} from './WorkspacePage'
import {
  workspaceDestinationUrl,
  workspacePanelUrl
} from '../../service/urls'
import {fixedPanels, Panel, PanelType} from './WorkspacePageContent'
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

        {
          fixedPanels.map( p =>
            <MenuPrimaryLink key={p.uri} icon={p.icon!!} isActive={p === props.activePanel} label={p.label} url={workspacePanelUrl(props.workspaceUri, p.uri)}/>
          )
        }

        {
          props.myDestinations.map((d: MyDestination) => (
            <MenuSecondaryLink
              key={d.definition.uri}
              label={d.definition.name}
              url={workspaceDestinationUrl(props.workspaceUri, d.definition.uri)}
              isActive={props.activePanel.panelType === PanelType.destination && props.activePanel.uri === d.definition.uri}/>
          ))
        }
      </List>
    </Drawer>
      )
};

export default MenuDrawer;
