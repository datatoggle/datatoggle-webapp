import React, {FunctionComponent, useEffect, useState} from 'react'
import firebase from 'firebase/app'
import {UserContext} from '../service/UserContext'
import {LOGIN_URL} from '../service/urls'
import {Redirect} from 'react-router-dom'
import LoadingProgress from './LoadingProgress'
import datatoggle from '@datatoggle/datatoggle-sdk'

interface AuthState {
  isLoggedIn: boolean | null,
  userContext: UserContext | null
}

interface OwnProps {
  children: React.ReactNode;
  preventRedirect?: boolean
}

export const userContext: React.Context<UserContext> = React.createContext<UserContext>(new UserContext(null));
export const maybeUserContext: React.Context<UserContext | null> = React.createContext<UserContext | null>(null);

const AuthCheck: FunctionComponent<OwnProps> = (props) =>{

  const [authState, setAuthState] = useState<AuthState>({isLoggedIn: null, userContext: null})

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user: firebase.User | null) => {
      if (user != null) {
        datatoggle.identify(user.uid, {
          email: user.email!
        })
        setAuthState({isLoggedIn: true, userContext: new UserContext(user)})
      } else {
        setAuthState({isLoggedIn: false, userContext: null})
      }
    })

    return () => unregisterAuthObserver() // Make sure we un-register Firebase observers when the component unmounts.
  }, [])

  if (authState.isLoggedIn == null) { // still waiting
    return <LoadingProgress/>
  } else if (props.preventRedirect){ // prevent redirect, so userContext might be null
    return  <maybeUserContext.Provider value={authState.userContext}>{props.children}</maybeUserContext.Provider>
  } else if (authState.isLoggedIn){
    return <userContext.Provider value={authState.userContext!}>{props.children}</userContext.Provider>
  } else {
    return <Redirect push to={LOGIN_URL}/>
  }

}

export default AuthCheck
