import React, { FunctionComponent } from 'react';
import {DestinationDef} from '../../../service/restapi/data'
import {Paper} from '@mui/material'

interface OwnProps {
  destinationsDefs: DestinationDef[]
}

type Props = OwnProps;

const DestinationsCatalogPanel: FunctionComponent<Props> = (props) => {

  return (<>
    {
      props.destinationsDefs.map(d => (
        <Paper>{d.name}</Paper>
      ))
    }
    </>)
};

export default DestinationsCatalogPanel;
