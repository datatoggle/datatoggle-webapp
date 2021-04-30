import React, {FunctionComponent, useEffect, useState} from 'react'
import LoadingPage from '../pages/LoadingPage'
import firebase from 'firebase/app'
import {UserContext} from '../service/UserContext'
import {LOGIN_URL} from '../service/urls'
import {Redirect} from 'react-router-dom'

interface AuthState {
  isLoggedIn: boolean | null,
  userContext: UserContext | null
}

interface OwnProps {
  children: React.ReactNode;
}

export const userContext = React.createContext<UserContext>(new UserContext(null));

const AuthCheck: FunctionComponent<OwnProps> = (props) =>{

  const [authState, setAuthState] = useState<AuthState>({isLoggedIn: null, userContext: null})

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user: firebase.User | null) => {
      if (user != null) {
        setAuthState({isLoggedIn: true, userContext: new UserContext(user)})
      } else {
        setAuthState({isLoggedIn: false, userContext: null})
      }
    })
    return () => unregisterAuthObserver() // Make sure we un-register Firebase observers when the component unmounts.
  }, [])

  if (authState.isLoggedIn == null){
    return <LoadingPage/>
  } else if (authState.isLoggedIn){
    return <userContext.Provider value={authState.userContext!}>{props.children}</userContext.Provider>
  } else {
    return <LoginPage/>
  }

}

export default AuthCheck
