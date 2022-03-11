import React, {FunctionComponent} from 'react'
import {ListItem, ListItemText} from '@mui/material'
import {useHistory} from 'react-router-dom'

interface OwnProps {
  label: string
  url: string
  isActive: boolean
}

type Props = OwnProps;

const MenuPrimaryLink: FunctionComponent<Props> = (props) => {

  const history = useHistory()

  return (
    <ListItem button key={props.url} onClick={() => history.push(props.url)}>
      <ListItemText
        inset
        primary={props.label}
        primaryTypographyProps={{ variant: "subtitle2",
          color: props.isActive ? 'primary': undefined }}
      />
    </ListItem>
  )
}

export default MenuPrimaryLink;
