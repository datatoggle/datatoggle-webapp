import React, { FunctionComponent } from 'react';
import Typography from '@material-ui/core/Typography'
import {Card, createStyles, Link, Theme} from '@material-ui/core'
import {NEW_PROJECT_URL, projectUrl} from '../../service/urls'
import Button from '@material-ui/core/Button'
import {Project, ProjectSnippet} from '../../service/restapi/data'
import {makeStyles} from '@material-ui/core/styles'


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



interface OwnProps {
  project: Project
}

type Props = OwnProps;

const OverviewPanel: FunctionComponent<Props> = (props) => {

  const project = props.project
  const classes = useStyles();

  return (     <div className={classes.cardContainer}>

    <div className={classes.header}>
      <Typography variant="h5" component="h2">
        Your API key
      </Typography>
    </div>

    <Typography variant="body1" component="h2">
      {project.apiKey}
    </Typography>


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
  </div>);
};

export default OverviewPanel;
