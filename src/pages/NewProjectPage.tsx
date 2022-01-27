import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, {FunctionComponent, useContext, useState} from 'react'
import SmallFormLayout from '../components/SmallFormLayout'
import {TextField} from '@mui/material'
import {Redirect} from 'react-router-dom'
import {projectUrl} from '../service/urls'
import {userContext} from '../components/AuthCheck'
import {UserContext} from '../service/UserContext'
import LoadingProgress from '../components/LoadingProgress'
import datatoggle from '@datatoggle/datatoggle-sdk'



type ProjectCreationState = {
  uri: string | null
  creating: boolean
}

const NewProjectPage: FunctionComponent<{ }> = (props) => {
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
      <Card sx={{width: '256px'}}>
        <CardContent sx={{padding: '24px'}}>
          <Typography variant="h6" component="h2" sx={{paddingBottom: '24px'}}>
            Choose a name for your project
          </Typography>
          <TextField id="standard-basic" label="Project name"  sx={{width: '100%'}} onChange={e => setName(e.target.value)}/>
        </CardContent>
        <CardActions sx={{padding: '8px 24px 24px 24px'}}>
          <Button fullWidth variant="contained" color="primary" disabled={name === ''} onClick={() => onCreateProject()}>Create project</Button>
        </CardActions>
      </Card>
    </SmallFormLayout>
  );
}

export default NewProjectPage
