import React, {FunctionComponent, useEffect, useState} from 'react'
import firebase from "firebase/app"
import "firebase/auth"
import {StyledFirebaseAuth} from 'react-firebaseui'

const authUiConfig = {
  signInFlow: 'popup',
  signInOptions: [{
    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    requireDisplayName: false,
  }
  ]
}

interface AuthState {
  isLoggedIn: boolean | null,
  token: string | null
}


interface OwnProps {
  children: React.ReactNode;
}

export const TokenContext = React.createContext<string>('');

const AuthCheck: FunctionComponent<OwnProps> = (props) =>{

  const [authState, setAuthState] = useState<AuthState>({isLoggedIn: null, token: null})

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user: firebase.User | null) => {
      if (user != null) {
        const token = await user.getIdToken()
        setAuthState({isLoggedIn: true, token: token})
      } else {
        setAuthState({isLoggedIn: false, token: null})
      }
    })
    return () => unregisterAuthObserver() // Make sure we un-register Firebase observers when the component unmounts.
  }, [])


  if (authState.isLoggedIn == null){
    return <h1>waiting for is logged in info</h1>
  } else if (authState.isLoggedIn){
    return <TokenContext.Provider value={authState.token!}>{props.children}</TokenContext.Provider>
  } else {
    return <StyledFirebaseAuth uiConfig={authUiConfig} firebaseAuth={firebase.auth()}/>
  }

}

export default AuthCheck
