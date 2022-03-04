import React, {FunctionComponent, useContext, useState} from 'react'
import SignupLoginPanel from './signupLoginPanel'
import firebase from 'firebase/app'
import {Redirect} from 'react-router-dom'
import {HOME_URL, SIGNUP_URL} from '../../service/urls'
import {UserContext} from '../../service/UserContext'
import {maybeUserContext} from '../../components/AuthCheck'
import {Button, Dialog, DialogActions, DialogTitle, Link} from '@mui/material'

const LoginPage: FunctionComponent<{  }> = (props) => {

  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [resetPassword, setResetPassword] = useState<boolean>(false)

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
    <>
    <SignupLoginPanel
      onClick={((email, password) => tryLogIn(email, password))}
      title='Log Into My Account'
      buttonText='Log In'
      underButtonLeft={
          <Button href={SIGNUP_URL} variant="text" size="small">Create an account</Button>
      }
      underButtonRight={
        <Button
          variant="text"
          onClick={() => {setResetPassword(true)}}
          size="small"
        >
          Forgot your password?
        </Button>
      }
      emailErrorMessage={emailError}
      passwordErrorMessage={passwordError}
      passwordHelper={false}
      />
  <Dialog
    open={resetPassword}>
    <DialogTitle id="alert-dialog-title">
      {"Please send an email to support@datatoggle.com"}
    </DialogTitle>
    <DialogActions>
      <Button onClick={() => {setResetPassword(false)}} autoFocus>
        Ok
      </Button>
    </DialogActions>
  </Dialog>
      </>
  );
}

export default LoginPage
