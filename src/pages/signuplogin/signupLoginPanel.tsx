import React, {FunctionComponent, useState} from 'react'
import SmallFormLayout from '../../components/SmallFormLayout'
import {Box, IconButton, InputAdornment, TextField} from '@mui/material'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import {Visibility, VisibilityOff} from '@mui/icons-material'


interface OwnProps {
  onClick: (email: string, password: string) => void
  title: string
  buttonText: string
  underButtonLeft: React.ReactNode
  underButtonRight: React.ReactNode
  emailErrorMessage: string | null
  passwordErrorMessage: string | null
  passwordHelper: boolean
  bottomMessage?: React.ReactNode
}


type Props = OwnProps;


const SignupLoginPanel: FunctionComponent<Props> = (props) => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)

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
  helperText={props.passwordErrorMessage || (props.passwordHelper ? "At least 8 characters long" : null)}
  type={showPassword ? 'text' : 'password'}
  // https://stackoverflow.com/questions/51694149/add-element-inside-textfield-component-material-ui?rq=1
  InputProps={{
  endAdornment:(
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={() => {setShowPassword(!showPassword)}}
        onMouseDown={(event) => {event.preventDefault()}}
        edge="end"
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  )}}
    />
      {props.bottomMessage &&
      <Box sx={{paddingBottom: 1}}>
        {props.bottomMessage}
      </Box>}
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
