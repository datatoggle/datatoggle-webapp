import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';

interface OwnProps {}

type Props = OwnProps;

const ProjectPage: FunctionComponent<Props> = (props) => {

  const {uri} = useParams<{uri: string}>();

  return  (<h1>{uri}</h1>);
};

export default ProjectPage;
