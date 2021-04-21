import { makeStyles } from '@material-ui/core/styles';
import React, {FunctionComponent} from 'react'
import firebase from 'firebase'
import {StyledFirebaseAuth} from 'react-firebaseui'
import logo from '../images/logo.png';

const authUiConfig = {
  signInFlow: 'popup',
  signInOptions: [{
    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    requireDisplayName: true,
  },
  ]
}


const useStyles = makeStyles({
  page: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    marginTop: 64
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  logo: {
    alignSelf: 'center',
    width: 256,
    marginBottom: 64
  }
});

interface Props {
  children: React.ReactNode;
}

const LoginPage: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.page}>
      <div className={classes.column}>
        <img className={classes.logo} src={logo}/>
        {props.children}
      </div>
    </div>
  );
}

export default LoginPage
