import React, {FunctionComponent, useContext, useEffect, useState} from 'react'
import { Redirect } from 'react-router-dom';
import {userContext} from '../components/AuthCheck'
import {ProjectSnippet} from '../service/restapi/data'
import {NEW_PROJECT_URL} from '../service/urls'
import {UserContext} from '../service/UserContext'

interface OwnProps {}

type Props = OwnProps;

const ProjectListPage: FunctionComponent<Props> = (props) => {

  const ctx: UserContext = useContext(userContext)
  const [data, setData] = useState<ProjectSnippet[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result: ProjectSnippet[] = await ctx.api.getProjectSnippets()
      setData(result);
    }
    fetchData()
  }, [ctx])

  if (data) {
    if (data.length === 0){
     return <Redirect to={NEW_PROJECT_URL} />
    } else {
      return <h1>{data!.map(p => p.name)}</h1>
    }
  } else {
    return <h1>LOADING PROJECTS</h1>
  }
};

export default ProjectListPage;
