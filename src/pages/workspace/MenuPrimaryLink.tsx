import React, {FunctionComponent} from 'react'
import {ListItem, ListItemIcon, ListItemText} from '@mui/material'
import {useHistory} from 'react-router-dom'
import {SvgIconComponent} from '@mui/icons-material'

interface OwnProps {
  label: string
  icon: SvgIconComponent // type of mui icons
  url: string
  isActive: boolean
}

type Props = OwnProps;

const MenuPrimaryLink: FunctionComponent<Props> = (props) => {

  const history = useHistory()

  return (
    <ListItem button onClick={() => history.push(props.url)}>
      <ListItemIcon><props.icon color={props.isActive ? 'primary': undefined}/></ListItemIcon>
      <ListItemText primary={props.label} primaryTypographyProps={{ variant: "h6", color: props.isActive ? 'primary': undefined }}/>
    </ListItem>
  );
};

export default MenuPrimaryLink;
