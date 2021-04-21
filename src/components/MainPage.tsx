import React, {useEffect, useState} from 'react'
import './MainPage.css'
import firebase from "firebase/app"
import "firebase/auth"
import {StyledFirebaseAuth} from 'react-firebaseui'
import {CustomerConfig, postGetConfig} from '../service/RestApi'
import Dashboard from './Dashboard'

const firebaseConfig = {
  apiKey: "AIzaSyD33FHNwomuZ43VUBgtOW4dJ3ePUIRAcps",
  authDomain: "datatoggle-b83b6.firebaseapp.com",
  projectId: "datatoggle-b83b6",
  storageBucket: "datatoggle-b83b6.appspot.com",
  messagingSenderId: "771767793475",
  appId: "1:771767793475:web:2300917ead156fc80921f6",
  measurementId: "G-EHS9SKZVVH"
}

const authUiConfig = {
  signInFlow: 'popup',
  signInOptions: [{
    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    requireDisplayName: false,
  }
  ]
}

firebase.initializeApp(firebaseConfig)

enum AppStatus {
  waitingForLoginStatus,
  notLoggedIn,
  waitingForDataSnapshot,
  loggedIn,
  loginError
}

interface AppState {
  status: AppStatus,
  config: CustomerConfig | null
}


function MainPage() {

  const [appState, setAppState] = useState<AppState>({status: AppStatus.waitingForLoginStatus, config: null})

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user: firebase.User | null) => {
      if (user != null) {
        setAppState({status: AppStatus.waitingForDataSnapshot, config: null})
        const token = await user.getIdToken()
        const config = await postGetConfig(token)
        setAppState({status: AppStatus.loggedIn, config: config.config})
      } else {
        setAppState({status: AppStatus.notLoggedIn, config: null})
      }
    })
    return () => unregisterAuthObserver() // Make sure we un-register Firebase observers when the component unmounts.
  }, [])


  switch (appState.status) {
    case AppStatus.waitingForLoginStatus:
      return <h1>Waiting for loading status</h1>
    case AppStatus.notLoggedIn:
      return <StyledFirebaseAuth uiConfig={authUiConfig} firebaseAuth={firebase.auth()}/>
    case AppStatus.waitingForDataSnapshot:
      return <><h1>Waiting for data snapshot</h1><a onClick={() => firebase.auth().signOut()}>Sign-out</a></>
    case AppStatus.loggedIn:
      return <Dashboard config={appState.config!}/>
    case AppStatus.loginError:
      return <h1>login error</h1>
  }


}

export default MainPage
