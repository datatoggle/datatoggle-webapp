import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React, {FunctionComponent, useContext, useState} from 'react'
import SmallFormLayout from '../components/SmallFormLayout'
import {TextField} from '@material-ui/core'
import {Redirect} from 'react-router-dom'
import {projectUrl} from '../service/urls'
import {userContext} from '../components/AuthCheck'
import {UserContext} from '../service/UserContext'
import LoadingProgress from '../components/LoadingProgress'
import datatoggle from '@datatoggle/datatoggle-sdk'



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

type ProjectCreationState = {
  uri: string | null
  creating: boolean
}

const NewProjectPage: FunctionComponent<{ }> = (props) => {
  const classes = useStyles();
  const ctx: UserContext = useContext(userContext)
  const [name, setName] = useState<string>('')
  const [projectCreationState, setProjectCreationState] = useState<ProjectCreationState>({uri: null, creating: false})

  async function onCreateProject() {
    setProjectCreationState({uri: null, creating: true})
    const projectUri: string = await ctx.api.createProject(name)
    datatoggle.track("create_project", {
      project_uri: projectUri
    })

    setProjectCreationState({uri: projectUri, creating: false})
  }

  if (projectCreationState.creating){
    return <LoadingProgress/>
  }

  if (projectCreationState.uri !== null){
    return <Redirect to={projectUrl(projectCreationState.uri)}/>
  }

  return (
    <SmallFormLayout>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h6" component="h2" className={classes.title}>
            Choose a name for your project
          </Typography>
          <TextField id="standard-basic" label="Project name"  className={classes.textField} onChange={e => setName(e.target.value)}/>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button fullWidth variant="contained" color="primary" disabled={name === ''} onClick={() => onCreateProject()}>Create project</Button>
        </CardActions>
      </Card>
    </SmallFormLayout>
  );
}

export default NewProjectPage
