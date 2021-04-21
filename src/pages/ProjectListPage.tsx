import React, {FunctionComponent, useContext, useEffect, useState} from 'react'
import { Redirect } from 'react-router-dom';
import {TokenContext} from '../components/AuthCheck'
import {ProjectSnippet} from '../service/restapi/data'
import {getProjectSnippets} from '../service/restapi/RestApi'
import {NEW_PROJECT_URL} from '../service/urls'

interface OwnProps {}

type Props = OwnProps;

const ProjectListPage: FunctionComponent<Props> = (props) => {

  const token: string = useContext<string>(TokenContext)
  const [data, setData] = useState<ProjectSnippet[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result: ProjectSnippet[] = await getProjectSnippets(token)
      setData(result);
    }
    fetchData()
  }, [])

  if (data) {
    if (data.length == 0){
     return <Redirect to={NEW_PROJECT_URL} />
    } else {
      return <h1>{data!.map(p => p.name)}</h1>
    }
  } else {
    return <h1>LOADING PROJECTS</h1>
  }
};

export default ProjectListPage;
