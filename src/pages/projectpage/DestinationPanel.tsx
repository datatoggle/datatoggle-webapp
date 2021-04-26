import React, {FunctionComponent} from 'react'
import {Destination, DestinationParam, ParamType} from '../../service/restapi/data'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import {Card, createStyles, Divider, FormControlLabel, Switch, Theme} from '@material-ui/core'
import DestinationParamComp from './DestinationParamComp'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    columnContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    header: {
      width: '512px',
      display: 'flex',
      paddingTop: '64px',
    },
    grow: {
      flexGrow: 1,
    },
    card: {
      width: '512px',
      borderRadius: '16px',
      padding: '24px'
    },
    actions: {
      padding: '0',
      display: 'flex',
      flexDirection: 'row-reverse'
    },
    cardContent: {
      padding: '0'//24px 24px 24px 24px'
    },
    enabledDiv: {
      display: 'flex'
    },
    separator: {
      marginTop: '24px',
      marginBottom: '24px'
    }
  }))


interface OwnProps {
  destination: Destination
}

type Props = OwnProps;

const DestinationPanel: FunctionComponent<Props> = (props) => {

  const classes = useStyles();

  return (
    <div className={classes.columnContainer}>

    <div className={classes.header}>

    </div>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <div className={classes.enabledDiv}>
            <Typography variant="h5" component="h2">
              {props.destination.name}
            </Typography>
            <div className={classes.grow}/>
          <FormControlLabel
            control={
              <Switch
                checked={true}
                onChange={() => null}
                name="checkedB"
                color="primary"
              />
            }
            style={ {marginRight: 0}}
            label="Enabled"
          />
          </div>
          <Divider className={classes.separator}/>
        {
          props.destination.config.map((p: DestinationParam) => (
            <DestinationParamComp param={p} key={p.uri}/>
          ))
        }
        </CardContent>
        <CardActions className={classes.actions}>
        <Button variant="contained" color="primary" onClick={() => null}>Save settings</Button>
        </CardActions>
      </Card>


    </div>
  )
};

export default DestinationPanel;
