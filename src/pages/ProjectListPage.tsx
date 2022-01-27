import React, {FunctionComponent, useContext, useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'
import {userContext} from '../components/AuthCheck'
import {ProjectSnippet} from '../service/restapi/data'
import { NEW_PROJECT_URL, projectUrl} from '../service/urls'
import {UserContext} from '../service/UserContext'
import MyAppBar from '../components/MyAppBar'
import {Box, Card, Link} from '@mui/material'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import LoadingProgress from '../components/LoadingProgress'

interface OwnProps {
}

type Props = OwnProps;


const ProjectListPage: FunctionComponent<Props> = (props) => {

  const ctx: UserContext = useContext(userContext)
  const [projects, setProjects] = useState<ProjectSnippet[] | null>(null)

  useEffect(() => {
    ctx.api.getProjectSnippets().then((result: ProjectSnippet[]) => {
      setProjects(result)
    })
  }, [ctx])

  if (projects == null) {
    return <LoadingProgress/>
  }

  if (projects.length === 0) {
    return <Redirect to={NEW_PROJECT_URL}/>
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
          Your projects
        </Typography>
          <Box flexGrow={1}/>
          <Link href={NEW_PROJECT_URL} underline={'none'}>
          <Button variant="contained" color={'primary'}>New project</Button>
          </Link>
        </Box>
        <>
          {projects.map((p: ProjectSnippet) => (
            <Card key={p.uri} sx={{    display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',}} onClick={() => null}>
              <Link href={projectUrl(p.uri)} underline={'none'}>
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

export default ProjectListPage
