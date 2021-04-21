import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React, {FunctionComponent} from 'react'
import SmallFormLayout from '../components/SmallFormLayout'
import {TextField} from '@material-ui/core'



// those properties make it consistent with StyledFirebaseAuth
const useStyles = makeStyles({
  card: {
    width: 256,
  },
  actions: {
    padding: '8px 24px 24px 24px'
  },
  cardContent: {
    padding: '24px 24px 24px 24px'
  },
  textField: {
    width: '100%'
  },
  title: {
    paddingBottom: '24px'
  }
});

const NewProjectPage: FunctionComponent<{ }> = (props) => {
  const classes = useStyles();

  return (
    <SmallFormLayout>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h6" component="h2" className={classes.title}>
            Choose a name for your project
          </Typography>
          <TextField id="standard-basic" label="Project name"  className={classes.textField}/>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button fullWidth variant="contained" color="primary">Create project</Button>
        </CardActions>
      </Card>
    </SmallFormLayout>
  );
}

export default NewProjectPage
