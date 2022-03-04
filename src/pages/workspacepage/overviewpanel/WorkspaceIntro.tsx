import React, { FunctionComponent } from 'react';
import {Card} from '@mui/material'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import {messageBackgroundColor} from '../../../DesignConstants'
import Button from '@mui/material/Button'

interface OwnProps {}

type Props = OwnProps;

const WorkspaceIntro: FunctionComponent<Props> = (props) => {

  return <Card  sx={{backgroundColor:messageBackgroundColor, borderRadius:'8px'}}>
    <CardContent>
    <Typography gutterBottom variant="h6" component="div" paddingBottom='8px'>
      Welcome to DataToggle!
    </Typography>
    <Typography gutterBottom variant="body1" component="div" paddingBottom='16px'>
      Follow our Quick Start to add DataToggle to your website, It should only take 5 minutes.
    </Typography>
      <Button variant="contained" href="https://docs.datatoggle.com/quick-start"  target="_blank" >Get Started</Button>
    </CardContent>
  </Card>;
};

export default WorkspaceIntro;
