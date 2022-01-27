import React, {FunctionComponent, useState} from 'react'
import SmallFormLayout from '../components/SmallFormLayout'
import {Box, TextField} from '@mui/material'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import './firebaseui-auth.css'

const authUiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [{
    // provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    requireDisplayName: true,
  },
  ]
}

const SignupPage: FunctionComponent<{}> = (props) => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <SmallFormLayout>
      <Typography variant="h4" component="h2" sx={{paddingBottom: '48px'}}>
        Welcome to DataToggle
      </Typography>
      <TextField
        sx={{paddingBottom: '24px'}}
        variant={'outlined'}
        fullWidth
        id='Email'
        label='Email'
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        sx={{paddingBottom: '24px'}}
        error={true}
        variant={'outlined'}
        fullWidth
        id='Password'
        label='Password'
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        helperText="At least 8 characters long"
      />
      <Button
        fullWidth variant="contained" color="primary" disabled={false} onClick={() => {}} size='large'>Sign Up
      </Button>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: '8px'
      }}>
        <Typography variant="body2">
          I agree to <a href='https://google.com'>Datatoggle's Terms of Service</a>
        </Typography>
        <Typography variant="body2">
          <a href='https://google.com'>Already have an account?</a>
        </Typography>
      </Box>
    </SmallFormLayout>
  );
}

export default SignupPage
