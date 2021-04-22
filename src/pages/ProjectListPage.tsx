import React, {FunctionComponent, useContext, useEffect, useState} from 'react'
import { Redirect } from 'react-router-dom';
import {userContext} from '../components/AuthCheck'
import {ProjectSnippet} from '../service/restapi/data'
import {NEW_PROJECT_URL} from '../service/urls'
import {UserContext} from '../service/UserContext'
import {makeStyles} from '@material-ui/core/styles'
import MyAppBar from '../components/MyAppBar'

const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
}))


interface OwnProps {}

type Props = OwnProps;

const ProjectListPage: FunctionComponent<Props> = (props) => {

  const ctx: UserContext = useContext(userContext)
  const [data, setData] = useState<ProjectSnippet[] | null>(null);

  useEffect(() => {
    ctx.api.getProjectSnippets().then((result: ProjectSnippet[]) => {setData(result)})
  }, [ctx])

  const classes = useStyles();

  if (data) {
    if (data.length === 0){
     return <Redirect to={NEW_PROJECT_URL} />
    } else {
      return <>
        <MyAppBar/>
        <h1>PROJECT LIST PAGE</h1>
        <h1>{ctx.email}</h1>
      </>
    }
  } else {
    return <h1>LOADING PROJECTS</h1>
  }
};

export default ProjectListPage;
