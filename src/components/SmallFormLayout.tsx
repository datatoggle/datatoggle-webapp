import React, {FunctionComponent} from 'react'
import logo from '../images/logo.png';
import {Box} from '@mui/material'

interface Props {
  children: React.ReactNode;
}

const SmallFormLayout: FunctionComponent<Props> = (props) => {

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      padding: 7,
      paddingTop: 3,
      alignItems: 'center'
    }}>
      <Box sx={{
        width: '100%',
        paddingBottom: 5
      }}>
        <Box component="img" sx={{width: 128+32}} src={logo} alt={'DataToggle'}/>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 480,
        width: '100%'}}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default SmallFormLayout
