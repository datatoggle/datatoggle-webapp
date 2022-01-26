import React, {FunctionComponent, useState} from 'react'
import SmallFormLayout from '../components/SmallFormLayout'
import {TextField} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
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

const useStyles = makeStyles({
  title: {
    paddingBottom: 48,
  },
  textbox: {
    paddingBottom: 16+8
  },
  conditionsAndLogin: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8
  },
})

const SignupPage: FunctionComponent<{}> = (props) => {

  const classes = useStyles();
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <SmallFormLayout>
      <Typography variant="h4" component="h2" className={classes.title}>
        Welcome to DataToggle
      </Typography>
      <TextField
        className={classes.textbox}
        variant={'outlined'}
        fullWidth
        id='Email'
        label='Email'
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        className={classes.textbox}
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
      <div className={classes.conditionsAndLogin}>
        <Typography variant="body2">
          I agree to <a href='https://google.com'>Datatoggle's Terms of Service</a>
        </Typography>
        <Typography variant="body2">
          <a href='https://google.com'>Already have an account?</a>
        </Typography>
      </div>
    </SmallFormLayout>
  );
}

export default SignupPage
