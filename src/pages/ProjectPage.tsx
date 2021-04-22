import React, { FunctionComponent } from 'react';
import MyAppBar from '../components/MyAppBar'
import {
  createStyles,
  Theme,
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

interface OwnProps {}

type Props = OwnProps;


const useStyles = makeStyles((theme: Theme) =>
  createStyles({}),
);


const ProjectPage: FunctionComponent<Props> = (props) => {

  const classes = useStyles();

  return  <>
      <MyAppBar/>
    </>;
};

export default ProjectPage;
