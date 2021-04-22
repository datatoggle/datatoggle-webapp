import React, {FunctionComponent, useState} from 'react'
import {AppBar, IconButton, Link, Toolbar} from '@material-ui/core'
import logo from '../images/logo.png'
import {makeStyles} from '@material-ui/core/styles'
import {AccountCircle} from '@material-ui/icons'
import {HOME_URL} from '../service/urls'
import {Redirect} from 'react-router-dom'


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

  return (<AppBar position="static" style={{background: 'transparent', boxShadow: 'none'}}>
    <Toolbar>
      <Link href={HOME_URL}>
        <img src={logo} alt="Logo" className={classes.logo}/>
      </Link>
      <div className={classes.grow} />
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        onClick={()=> null}
      >
        <AccountCircle />
      </IconButton>
      
    </Toolbar></AppBar>);
};

export default MyAppBar;
