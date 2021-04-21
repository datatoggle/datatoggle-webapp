import React, {FunctionComponent, useEffect, useState} from 'react'
import LoginPage from '../pages/LoginPage'
import LoadingPage from '../pages/LoadingPage'
import firebase from 'firebase/app'



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
    return <LoadingPage/>
  } else if (authState.isLoggedIn){
    return <TokenContext.Provider value={authState.token!}>{props.children}</TokenContext.Provider>
  } else {
    return <LoginPage/>
  }

}

export default AuthCheck
