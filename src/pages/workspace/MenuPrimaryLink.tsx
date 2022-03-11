import React, {FunctionComponent} from 'react'
import {ListItem, ListItemIcon, ListItemText} from '@mui/material'
import {useHistory} from 'react-router-dom'
import {SvgIconTypeMap} from '@mui/material/SvgIcon/SvgIcon'
import {OverridableComponent} from '@mui/material/OverridableComponent'

interface OwnProps {
  label: string
  icon: OverridableComponent<SvgIconTypeMap> // type of mui icons
  url: string
  isActive: boolean
}

type Props = OwnProps;

const MenuPrimaryLink: FunctionComponent<Props> = (props) => {

  const history = useHistory()

  return (
    <ListItem button key={props.url} onClick={() => history.push(props.url)}>
      <ListItemIcon><props.icon color={props.isActive ? 'primary': undefined}/></ListItemIcon>
      <ListItemText primary={props.label} primaryTypographyProps={{ variant: "h6", color: props.isActive ? 'primary': undefined }}/>
    </ListItem>
  );
};

export default MenuPrimaryLink;
