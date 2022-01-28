import React, {FunctionComponent, useState} from 'react'
import SmallFormLayout from '../../components/SmallFormLayout'
import {Box, TextField} from '@mui/material'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import '../firebaseui-auth.css'


interface OwnProps {
  onClick: (email: string, password: string) => void
  title: string
  buttonText: string
  underButtonLeft: React.ReactNode
  underButtonRight: React.ReactNode
  emailErrorMessage: string | null
  passwordErrorMessage: string | null
  passwordHelper: boolean
}


type Props = OwnProps;


const SignupLoginPanel: FunctionComponent<Props> = (props) => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <SmallFormLayout>
      <Typography variant="h4" component="h2" sx={{paddingBottom: '48px'}}>
        {props.title}
  </Typography>
  <TextField
  sx={{paddingBottom: '24px'}}
  variant={'outlined'}
  fullWidth
  id='Email'
  label='Email'
  value={email}
  error={props.emailErrorMessage != null}
  helperText={props.emailErrorMessage}
  onChange={(event) => setEmail(event.target.value)}
  />
  <TextField
  sx={{paddingBottom: '24px'}}
  error={props.passwordErrorMessage != null}
  variant={'outlined'}
  fullWidth
  id='Password'
  label='Password'
  value={password}
  onChange={(event) => setPassword(event.target.value)}
  helperText={props.passwordErrorMessage || (props.passwordHelper ? "At least 6 characters long" : null)}
    />
    <Button
      fullWidth
      variant="contained"
      color="primary"
      disabled={false}
      onClick={() => props.onClick(email, password)}
      size='large'>
      {props.buttonText}
  </Button>
  <Box sx={{
    display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: '8px'
  }}>
    {props.underButtonLeft}
    {props.underButtonRight}
    </Box>
    </SmallFormLayout>
);
}

export default SignupLoginPanel
