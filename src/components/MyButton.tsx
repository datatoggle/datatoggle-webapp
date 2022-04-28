import React, { FunctionComponent } from 'react';
import Button, {ButtonProps} from '@mui/material/Button'

interface OwnProps {

}

type Props = OwnProps;

const MyButton: FunctionComponent<Props & ButtonProps> = (props) => {

  return (<Button
    fullWidth
    variant="contained"
    color="primary"
    disabled={false}
    size='large'
    {...props}
  >
  </Button>);
};

export default MyButton;
