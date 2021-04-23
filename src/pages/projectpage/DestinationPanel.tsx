import React, { FunctionComponent } from 'react';
import {Destination} from '../../service/restapi/data'

interface OwnProps {
  destination: Destination
}

type Props = OwnProps;

const DestinationPanel: FunctionComponent<Props> = (props) => {

  return (<>{props.destination.name}</>);
};

export default DestinationPanel;
