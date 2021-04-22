import React, {FunctionComponent, useContext, useEffect, useState} from 'react'
import MyAppBar from '../components/MyAppBar'
import {
  Card,
  createStyles, Link,
  Theme,
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {UserContext} from '../service/UserContext'
import {userContext} from '../components/AuthCheck'
import {Destination, Project, ProjectSnippet} from '../service/restapi/data'
import {Redirect, useParams} from 'react-router-dom'
import LoadingPage from './LoadingPage'
import {NEW_PROJECT_URL, projectUrl} from '../service/urls'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

interface OwnProps {}

type Props = OwnProps;


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  }),
);


const ProjectPage: FunctionComponent<Props> = (props) => {

  let { uri } = useParams<{uri: string}>();
  const classes = useStyles();
  const ctx: UserContext = useContext(userContext)
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    ctx.api.getProject(uri).then((result: Project) => {
      setProject(result)
    })
  }, [ctx])

  if (project == null) {
    return <LoadingPage/>
  }

  if (project.destinations.length === 0) {
    return <Redirect to={NEW_PROJECT_URL}/>
  } else {
    return <>
      <MyAppBar/>
      <div className={classes.cardContainer}>

        <div className={classes.header}>
          <Typography variant="h5" component="h2">
            Your destinations
          </Typography>
          <div className={classes.grow}/>
          <Link href={NEW_PROJECT_URL} underline={'none'}>
            <Button variant="contained" color={'primary'}>New destination</Button>
          </Link>
        </div>
        <>
          {project.destinations.map((p: ProjectSnippet) => (
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
};

export default ProjectPage
