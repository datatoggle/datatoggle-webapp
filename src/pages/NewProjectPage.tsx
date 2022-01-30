import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, {FunctionComponent, useContext, useState} from 'react'
import SmallFormLayout from '../components/SmallFormLayout'
import {Redirect} from 'react-router-dom'
import {projectUrl} from '../service/urls'
import {userContext} from '../components/AuthCheck'
import {UserContext} from '../service/UserContext'
import LoadingProgress from '../components/LoadingProgress'
import datatoggle from '@datatoggle/datatoggle-sdk'
import {TextField} from '@mui/material'



type ProjectCreationState = {
  uri: string | null
  creating: boolean
}

const NewProjectPage: FunctionComponent<{ }> = (props) => {
  const ctx: UserContext = useContext(userContext)
  const [name, setName] = useState<string>('')
  const [nameErrorMessage, setNameErrorMessage] = useState<string | null>(null)
  const [projectCreationState, setProjectCreationState] = useState<ProjectCreationState>({uri: null, creating: false})

  async function onCreateProject() {
    setNameErrorMessage(null)
    if (!name){
      setNameErrorMessage('Project name should not be empty')
      return
    }

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
      <Typography variant="h4" component="h2" sx={{paddingBottom: '48px'}}>
        Choose a name for your project
      </Typography>
      <TextField
        sx={{paddingBottom: '24px'}}
        variant={'outlined'}
        fullWidth
        id='Project Name'
        label='Project Name'
        value={name}
        error={nameErrorMessage != null}
        helperText={nameErrorMessage}
        onChange={e => setName(e.target.value)}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        disabled={false}
        onClick={() => onCreateProject()}
        size='large'>
        Create Project
      </Button>
    </SmallFormLayout>
  );
}

export default NewProjectPage
