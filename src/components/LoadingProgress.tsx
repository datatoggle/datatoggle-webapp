import React, { FunctionComponent } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {CircularProgress} from '@mui/material'


const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
});

interface OwnProps {}

type Props = OwnProps;

const LoadingProgress: FunctionComponent<Props> = (props) => {

  const classes = useStyles();

  return (  <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

export default LoadingProgress;
