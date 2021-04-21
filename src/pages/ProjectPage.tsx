import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';

interface OwnProps {}

type Props = OwnProps;

const ProjectPage: FunctionComponent<Props> = (props) => {

  const uri: string = useParams();

  return  (<h1>PROJECT: {uri}</h1>);
};

export default ProjectPage;
