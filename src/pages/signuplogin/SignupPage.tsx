import React, {FunctionComponent, useContext, useState} from 'react'
import Typography from '@mui/material/Typography'
import SignupLoginPanel from './signupLoginPanel'
import firebase from 'firebase/app'
import {Redirect} from 'react-router-dom'
import {HOME_URL, LOGIN_URL} from '../../service/urls'
import {UserContext} from '../../service/UserContext'
import {maybeUserContext} from '../../components/AuthCheck'
import {Button, Link} from '@mui/material'

const SignUpPage: FunctionComponent<{  }> = (props) => {

  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const trySignUp = async (email: string, password: string) => {
    try {
      setEmailError(null)
      setPasswordError(null)
      if (password.length < 8){
        setPasswordError("At least 8 characters long")
        return
      }
      await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      switch (error.code) {
        // see error codes in createUserWithEmailAndPassword comments
        case 'auth/invalid-email':
          setEmailError('Invalid email')
          break
        case 'auth/email-already-in-use':
          setEmailError('This email is already in use')
          break
        case 'auth/weak-password':
          console.log(error)
          setPasswordError('Invalid password: ' + error)
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
      onClick={((email, password) => trySignUp(email, password))}
      title='Welcome to DataToggle'
      buttonText='Sign Up'
      underButtonLeft={
        <div/>
      }
      underButtonRight={
        <Link href={LOGIN_URL} underline={'none'}>
          <Button variant="text" size="small">Already have an account?</Button>
        </Link>
      }
      bottomMessage={        <Typography variant="caption">
        By Signing up, you agree to <a href='https://google.com'>Datatoggle's Terms of Service</a>
      </Typography>}
      emailErrorMessage={emailError}
      passwordErrorMessage={passwordError}
      passwordHelper={true}
    />
  );
}

export default SignUpPage
