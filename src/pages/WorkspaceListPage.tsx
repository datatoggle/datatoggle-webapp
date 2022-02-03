import React, {FunctionComponent, useContext, useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'
import {userContext} from '../components/AuthCheck'
import {WorkspaceSnippet} from '../service/restapi/data'
import { NEW_WORKSPACE_URL, workspaceUrl} from '../service/urls'
import {UserContext} from '../service/UserContext'
import MyAppBar from '../components/MyAppBar'
import {Box, Card, Link} from '@mui/material'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import LoadingProgress from '../components/LoadingProgress'

interface OwnProps {
}

type Props = OwnProps;


const WorkspaceListPage: FunctionComponent<Props> = (props) => {

  const ctx: UserContext = useContext(userContext)
  const [workspaces, setWorkspaces] = useState<WorkspaceSnippet[] | null>(null)

  useEffect(() => {
    ctx.api.getWorkspaceSnippets().then((result: WorkspaceSnippet[]) => {
      setWorkspaces(result)
    })
  }, [ctx])

  if (workspaces == null) {
    return <LoadingProgress/>
  }

  if (workspaces.length === 0) {
    return <Redirect to={NEW_WORKSPACE_URL}/>
  } else {
    return <>
      <MyAppBar drawerDisplayed={false}/>
      <Box sx={{    display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'}}>

        <Box sx={{    width: '512px',
          display: 'flex',
          paddingTop: '64px',
          paddingBottom: '16px',}}>
        <Typography variant="h5" component="h2">
          Your workspaces
        </Typography>
          <Box flexGrow={1}/>
          <Link href={NEW_WORKSPACE_URL} underline={'none'}>
          <Button variant="contained" color={'primary'}>New workspace</Button>
          </Link>
        </Box>
        <>
          {workspaces.map((p: WorkspaceSnippet) => (
            <Card key={p.uri} sx={{    display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',}} onClick={() => null}>
              <Link href={workspaceUrl(p.uri)} underline={'none'}>
                <Button sx={{    height: '100%',
                  width: '100%',
                  textTransform: 'none',}}>
                  <Box sx={{    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%'}}>
                    <Typography variant="h6" component="h2">
                      {p.name}
                    </Typography>
                  </Box>
                </Button>
              </Link>
            </Card>))}
        </>
      </Box>
    </>
  }
}

export default WorkspaceListPage
