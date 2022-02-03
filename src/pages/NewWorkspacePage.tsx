import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, {FunctionComponent, useContext, useState} from 'react'
import SmallFormLayout from '../components/SmallFormLayout'
import {Redirect} from 'react-router-dom'
import {workspaceUrl} from '../service/urls'
import {userContext} from '../components/AuthCheck'
import {UserContext} from '../service/UserContext'
import LoadingProgress from '../components/LoadingProgress'
import datatoggle from '@datatoggle/datatoggle-sdk'
import {TextField} from '@mui/material'



type WorkspaceCreationState = {
  uri: string | null
  creating: boolean
}

const NewWorkspacePage: FunctionComponent<{ }> = (props) => {
  const ctx: UserContext = useContext(userContext)
  const [name, setName] = useState<string>('')
  const [nameErrorMessage, setNameErrorMessage] = useState<string | null>(null)
  const [workspaceCreationState, setWorkspaceCreationState] = useState<WorkspaceCreationState>({uri: null, creating: false})

  async function onCreateWorkspace() {
    setNameErrorMessage(null)
    if (!name){
      setNameErrorMessage('Workspace name should not be empty')
      return
    }

    setWorkspaceCreationState({uri: null, creating: true})
    const workspaceUri: string = await ctx.api.createWorkspace(name)
    datatoggle.track("create_workspace", {
      workspace_uri: workspaceUri
    })

    setWorkspaceCreationState({uri: workspaceUri, creating: false})
  }

  if (workspaceCreationState.creating){
    return <LoadingProgress/>
  }

  if (workspaceCreationState.uri !== null){
    return <Redirect to={workspaceUrl(workspaceCreationState.uri)}/>
  }

  return (
    <SmallFormLayout>
      <Typography variant="h4" component="h2" sx={{paddingBottom: '48px'}}>
        Choose a name for your workspace
      </Typography>
      <TextField
        sx={{paddingBottom: '24px'}}
        variant={'outlined'}
        fullWidth
        id='Workspace Name'
        label='Workspace Name'
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
        onClick={() => onCreateWorkspace()}
        size='large'>
        Create Workspace
      </Button>
    </SmallFormLayout>
  );
}

export default NewWorkspacePage
