import React, {FunctionComponent} from 'react'
import Typography from '@mui/material/Typography'
import SignupLoginPanel from './signupLoginPanel'


const SignupPage: FunctionComponent<{  }> = (props) => {

  return (
    <SignupLoginPanel
      onClick={() => {}}
      title='Welcome to DataToggle'
      buttonText='Sign Up'
      underButtonLeft={
        <Typography variant="body2">
          I agree to <a href='https://google.com'>Datatoggle's Terms of Service</a>
        </Typography>
      }
      underButtonRight={
        <Typography variant="body2">
          <a href='https://google.com'>Already have an account?</a>
        </Typography>
      }
      emailErrorMessage={null}
      passwordErrorMessage={null}
      passwordHelper={true}
      />
  );
}

export default SignupPage
