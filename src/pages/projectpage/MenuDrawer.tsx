import React, { FunctionComponent } from 'react';
import {
  createStyles,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {HOME_URL} from '../../service/urls'
import logo from '../../images/logo.png'
import HomeIcon from '@material-ui/icons/Home';
import PlayForWorkIcon from '@material-ui/icons/PlayForWork';
import {MyDestination} from './ProjectPage'

interface OwnProps {
  myDestinations: MyDestination[],
  onMyDestinationClick: (dest: MyDestination) => void
  onProjectOverviewClick: () => void
}

type Props = OwnProps;

export const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      height: 48
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    // necessary for content to be below app bar
    drawerToolbar: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 16,
      ...theme.mixins.toolbar
    },
  })
)

const MenuDrawer: FunctionComponent<Props> = (props) => {

  const classes = useStyles();

  return (
  <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.drawerToolbar}>
        <Link href={HOME_URL}>
          <img src={logo} alt="Logo" className={classes.logo}/>
        </Link>
      </div>

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
