import React, {FunctionComponent, useContext, useState} from 'react'
import {AppBar, IconButton, Link, Menu, MenuItem, Toolbar} from '@material-ui/core'
import logo from '../images/logo.png'
import {makeStyles} from '@material-ui/core/styles'
import {AccountCircle} from '@material-ui/icons'
import {HOME_URL} from '../service/urls'
import {UserContext} from '../service/UserContext'
import {userContext} from './AuthCheck'
import firebase from 'firebase/app'


const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
  logo: {
    height: 48
  }
});

// TODO: Logo should redirect to home

interface OwnProps {}

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

  return (<AppBar position="static" style={{background: 'transparent', boxShadow: 'none'}}>
    <Toolbar>
      <Link href={HOME_URL}>
        <img src={logo} alt="Logo" className={classes.logo}/>
      </Link>
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
