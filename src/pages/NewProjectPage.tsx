import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React, {FunctionComponent} from 'react'
import SmallFormLayout from '../components/SmallFormLayout'
import {TextField} from '@material-ui/core'



const useStyles = makeStyles({
  card: {
    width: 400,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const NewProjectPage: FunctionComponent<{ }> = (props) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <SmallFormLayout>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Choose a name for your project:
          </Typography>
          <TextField id="standard-basic" label="My awesome project" />
        </CardContent>
        <CardActions>
          <Button  variant="contained" color="primary">Create project</Button>
        </CardActions>
      </Card>
    </SmallFormLayout>
  );
}

export default NewProjectPage
