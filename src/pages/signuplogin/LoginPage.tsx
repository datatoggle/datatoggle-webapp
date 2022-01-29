import React, {FunctionComponent, useContext, useState} from 'react'
import Typography from '@mui/material/Typography'
import SignupLoginPanel from './signupLoginPanel'
import firebase from 'firebase/app'
import {Redirect} from 'react-router-dom'
import {HOME_URL} from '../../service/urls'
import {UserContext} from '../../service/UserContext'
import {maybeUserContext} from '../../components/AuthCheck'

const LoginPage: FunctionComponent<{  }> = (props) => {

  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const tryLogIn = async (email: string, password: string) => {
    try {
      setEmailError(null)
      setPasswordError(null)
      if (password.length < 6){
        setPasswordError("Password must be at least 6 characters long")
        return
      }
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      switch (error.code) {
        // see error codes in signInWithEmailAndPassword comments
        case 'auth/invalid-email':
          setEmailError('Invalid email')
          break
        case 'auth/user-disabled':
          setEmailError('Email not found')
          break
        case 'auth/user-not-found':
          setEmailError('Email not found')
          break
        case 'auth/wrong-password':
          setPasswordError('Invalid password')
          break
      }
    }
  }

  const ctx: UserContext | null = useContext(maybeUserContext)

  if (ctx){
    return <Redirect push to={HOME_URL}/>
  }


  return (
    <SignupLoginPanel
      onClick={((email, password) => tryLogIn(email, password))}
      title='Log Into My Account'
      buttonText='Log In'
      underButtonLeft={
        <Typography variant="body2">
          <a href='https://google.com'>Create an account</a>
        </Typography>
      }
      underButtonRight={
        <Typography variant="body2">
          <a href='https://google.com'>Forgot your password?</a>
        </Typography>
      }
      emailErrorMessage={emailError}
      passwordErrorMessage={passwordError}
      passwordHelper={false}
      />
  );
}

export default LoginPage
