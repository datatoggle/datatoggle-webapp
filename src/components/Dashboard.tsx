import React, {FunctionComponent} from 'react'
import {CustomerConfig} from '../service/RestApi'
import Button from '@material-ui/core/Button'

interface OwnProps {
  config: CustomerConfig
}


type Props = OwnProps;

const Dashboard: FunctionComponent<Props> = (props) => {

  return <>
    <h1>{props.config.apiKey}</h1>
    {
      props.config.destinations.map(d =>
        <h2>{d.displayName}</h2>
      )
    }
    <Button variant="contained" color="primary">
      Hello World
    </Button></>
}

export default Dashboard
