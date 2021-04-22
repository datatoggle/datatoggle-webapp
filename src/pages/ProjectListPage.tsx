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
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
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
    alignItems: 'center'
  },
  projectCard: {
    width: '292px',
    height: '196px',
    borderRadius: '16px',
    margin: '16px'
  },
  button: {
    height: '100%',
    width: '100%',
    textTransform: 'none',
  }
}))


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

  if (projects) {
    if (projects.length === 0) {
      return <Redirect to={NEW_PROJECT_URL}/>
    } else {
      return <>
        <MyAppBar/>
        <div className={classes.cardContainer}>
          <Card className={classes.projectCard} onClick={() => null}>
            <Link href={NEW_PROJECT_URL} underline={'none'}>
            <Button className={classes.button}>
              <div className={classes.centerColumnContainer}>
                <AddIcon color={'primary'}/>
                <Typography variant="h6" component="h2" color={'primary'}>
                  Create new project
                </Typography>
              </div>
            </Button>
            </Link>
          </Card>
          <>
            {projects.map((p: ProjectSnippet) => (
              <Card className={classes.projectCard} onClick={() => null}>
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
  } else {
    return <h1>LOADING PROJECTS</h1>
  }
}

export default ProjectListPage
