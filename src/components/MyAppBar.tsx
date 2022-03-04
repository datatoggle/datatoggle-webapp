import React, {FunctionComponent, useContext, useState} from 'react'
import {AppBar, Box, IconButton, Menu, MenuItem, Toolbar} from '@mui/material'
import {AccountCircle} from '@mui/icons-material'
import {UserContext} from '../service/UserContext'
import {userContext} from './AuthCheck'
import firebase from 'firebase/app'
import {drawerWidth} from '../pages/workspacepage/MenuDrawer'

interface OwnProps {
}

type Props = OwnProps;

const MyAppBar: FunctionComponent<Props> = (props) => {

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

  return (
    <AppBar position="static" sx={{background: 'transparent', boxShadow: 'none', paddingLeft: drawerWidth, paddingRight:'16px' }}>
      <Toolbar>
        <Box sx={{flexGrow: 1}} />
        <IconButton
          aria-controls="login-menu"
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          onClick={handleClick}
          size="large"
          sx={{height: '48px'}}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="login-menu"
          anchorEl={anchorEl}
          keepMounted
          open={anchorEl !== null}
          onClose={handleClose}
        >
          <MenuItem onClick={() => null}>{ctx.user!!.displayName}</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>

      </Toolbar></AppBar>
  );
};

export default MyAppBar;
