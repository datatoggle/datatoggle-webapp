import React, { FunctionComponent } from 'react';
import {IconButton, Tooltip} from '@mui/material'
import {Help} from '@mui/icons-material'

interface OwnProps {
  docLink: string
}

type Props = OwnProps;

const DocLink: FunctionComponent<Props> = (props) => {

  return (
    <Tooltip title={props.docLink}>
      <IconButton
        aria-label="Help"
        component="span"
        color={'primary'}
        onClick={() => window.open(props.docLink)}>
        <Help />
      </IconButton>
    </Tooltip>);
};

export default DocLink;
