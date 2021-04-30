import React, {FunctionComponent, useContext} from 'react'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import {Card, createStyles, Divider, FormControlLabel, Switch, Theme} from '@material-ui/core'
import DestinationParamComp from './DestinationParamComp'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import {DestinationParamDef} from '../../service/restapi/data'
import {UserContext} from '../../service/UserContext'
import {userContext} from '../../components/AuthCheck'
import {MyDestination} from './ProjectPage'

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
  myDestination: MyDestination
  saved: boolean | null // null if displayed from project and not after post destination request
}

type Props = OwnProps;

const DestinationPanel: FunctionComponent<Props> = (props) => {

  const classes = useStyles();
  const ctx: UserContext = useContext(userContext)

  const currentConfig = new Map(Object.entries(props.myDestination.config.config.config))
  const errors = new Map(Object.entries(props.myDestination.config.paramErrors))
  const paramDefs = props.myDestination.definition.paramDefs

  return (
    <div className={classes.columnContainer}>
    <div className={classes.header}>

    </div>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <div className={classes.enabledDiv}>
            <Typography variant="h5" component="h2">
              {props.myDestination.definition.name}
            </Typography>
            <div className={classes.grow}/>
          <FormControlLabel
            control={
              <Switch
                checked={props.myDestination.config.config.isEnabled}
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
          paramDefs.map((p: DestinationParamDef) => (
            <DestinationParamComp paramDef={p} error={errors.get(p.uri) || null} value={currentConfig.get(p.uri) || null} key={p.uri}/>
          ))
        }
        </CardContent>
        <CardActions className={classes.actions}>
        <Button variant="contained" color="primary" onClick={() => null}>Save settings</Button>
        </CardActions>
      </Card>


    </div>
  ) // SAVE BUTTON UPDATE PARAMS
};

export default DestinationPanel;
