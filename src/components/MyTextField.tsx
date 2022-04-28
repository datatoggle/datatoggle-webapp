import React, { FunctionComponent } from 'react';
import {TextField} from '@mui/material'
import {TextFieldProps} from '@mui/material/TextField/TextField'

interface OwnProps {
  label: string
}

type Props = OwnProps;

const MyTextField: FunctionComponent<Props & TextFieldProps> = (props) => {
  const { ...other } = props;

  return (
    <TextField
      sx={{paddingBottom: '24px'}}
      variant={'outlined'}
      fullWidth
      id={props.label}
      {...other}
    />);
}

export default MyTextField;
