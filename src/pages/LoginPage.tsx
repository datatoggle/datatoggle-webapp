import React, {FunctionComponent} from 'react'
import firebase from 'firebase/app'
import {StyledFirebaseAuth} from 'react-firebaseui'
import SmallFormLayout from '../components/SmallFormLayout'

const authUiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [{
    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    requireDisplayName: true,
  },
  ]
}

const LoginPage: FunctionComponent<{}> = (props) => {
  return (
    <SmallFormLayout>
      <StyledFirebaseAuth uiConfig={authUiConfig} firebaseAuth={firebase.auth()}/>
    </SmallFormLayout>
  );
}

export default LoginPage
