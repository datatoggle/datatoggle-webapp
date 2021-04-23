import React, {FunctionComponent, useContext, useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'
import {userContext} from '../components/AuthCheck'
import {ProjectSnippet} from '../service/restapi/data'
import { NEW_PROJECT_URL, projectUrl} from '../service/urls'
import {UserContext} from '../service/UserContext'
import {makeStyles} from '@material-ui/core/styles'
import MyAppBar from '../components/MyAppBar'
import {Card, Link} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import LoadingPage from './LoadingPage'

const useStyles = makeStyles({
  centerColumnContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    width: '512px',
    height: '128px',
    borderRadius: '16px',
    margin: '16px'
  },
  button: {
    height: '100%',
    width: '100%',
    textTransform: 'none',
  },
  header: {
    width: '512px',
    display: 'flex',
    paddingTop: '64px',
    paddingBottom: '16px',
  },
  grow: {
    flexGrow: 1,
  },
})


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

  const classes = useStyles()

  if (projects == null) {
    return <LoadingPage/>
  }

  if (projects.length === 0) {
    return <Redirect to={NEW_PROJECT_URL}/>
  } else {
    return <>
      <MyAppBar drawerDisplayed={false}/>
      <div className={classes.cardContainer}>

        <div className={classes.header}>
        <Typography variant="h5" component="h2">
          Your projects
        </Typography>
          <div className={classes.grow}/>
          <Link href={NEW_PROJECT_URL} underline={'none'}>
          <Button variant="contained" color={'primary'}>New project</Button>
          </Link>
        </div>
        <>
          {projects.map((p: ProjectSnippet) => (
            <Card className={classes.card} onClick={() => null}>
              <Link href={projectUrl(p.uri)} underline={'none'}>
                <Button className={classes.button}>
                  <div className={classes.centerColumnContainer}>
                    <Typography variant="h6" component="h2">
                      {p.name}
                    </Typography>
                  </div>
                </Button>
              </Link>
            </Card>))}
        </>
      </div>
    </>
  }
}

export default ProjectListPage
