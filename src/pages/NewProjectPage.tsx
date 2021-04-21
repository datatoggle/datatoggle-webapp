import React, {FunctionComponent, useContext} from 'react'
import {TokenContext} from '../components/AuthCheck'

interface OwnProps {}

type Props = OwnProps;

const NewProjectPage: FunctionComponent<Props> = (props) => {

  const token: string = useContext<string>(TokenContext)

  return <h1>NEW PROJECT: {token}</h1>
};

export default NewProjectPage;
