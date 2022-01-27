import React, { FunctionComponent } from 'react';
import {Box, CircularProgress} from '@mui/material'

interface OwnProps {}

type Props = OwnProps;


const LoadingProgress: FunctionComponent<Props> = (props) => {
  return (  <Box
      sx= {
        {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'}
      }
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingProgress;
