import React, { FunctionComponent } from 'react';
import MyAppBar from '../components/MyAppBar'
import {
  createStyles,
  Divider,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  Toolbar
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {HOME_URL} from '../service/urls'
import logo from '../images/logo.png'

interface OwnProps {}

type Props = OwnProps;


const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      height: 48
    },
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
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
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      ...theme.mixins.toolbar
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  }),
);


const ProjectPage: FunctionComponent<Props> = (props) => {

  const classes = useStyles();

  return  <>
      <MyAppBar/>
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
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
    </>;
};

export default ProjectPage;
