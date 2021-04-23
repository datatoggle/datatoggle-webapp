import React, {FunctionComponent, useContext, useState} from 'react'
import {AppBar, IconButton, Link, Menu, MenuItem, Toolbar} from '@material-ui/core'
import logo from '../images/logo.png'
import {makeStyles} from '@material-ui/core/styles'
import {AccountCircle} from '@material-ui/icons'
import {HOME_URL} from '../service/urls'
import {UserContext} from '../service/UserContext'
import {userContext} from './AuthCheck'
import firebase from 'firebase/app'
import {drawerWidth} from '../pages/projectpage/MenuDrawer'
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
  logo: {
    height: 48
  }
});

// TODO: Logo should redirect to home

interface OwnProps {
  drawerDisplayed: boolean
  projectName?: string
}

type Props = OwnProps;

const MyAppBar: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  const ctx = useContext<UserContext>(userContext)


  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    setAnchorEl(null);
    await firebase.auth().signOut()
  };

  return (<AppBar position="static" style={{background: 'transparent', boxShadow: 'none', paddingLeft: props.drawerDisplayed ? drawerWidth : 0}}>
    <Toolbar>
      {
        props.drawerDisplayed ? <></> : <Link href={HOME_URL}>
          <img src={logo} alt="Logo" className={classes.logo}/>
        </Link>
      }
      {
        props.projectName && (<Typography color={'textPrimary'} variant="h6">
          {props.projectName}
        </Typography>)
      }
      <div className={classes.grow} />
      <IconButton
        aria-controls="simple-menu"
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={anchorEl !== null}
        onClose={handleClose}
      >
        <MenuItem onClick={() => null}>{ctx.fullName}</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>

    </Toolbar></AppBar>);
};

export default MyAppBar;
