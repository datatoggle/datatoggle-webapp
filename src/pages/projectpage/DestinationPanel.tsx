import React, {FunctionComponent, useContext, useEffect, useState} from 'react'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import {Card, createStyles, Divider, FormControlLabel, Switch, Theme} from '@material-ui/core'
import DestinationParamComp from './DestinationParamComp'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import {DestinationConfig, DestinationParamDef, Project} from '../../service/restapi/data'
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
  projectUri: string
  myDestination: MyDestination
  saved: boolean | null // null if displayed from project and not after post destination request
  onDestinationModified: (destinationUri: string) => void
}

type Props = OwnProps;

const DestinationPanel: FunctionComponent<Props> = (props) => {

  const classes = useStyles();
  const ctx: UserContext = useContext(userContext)

  const paramDefs = props.myDestination.definition.paramDefs

  const [modifiedConfig, setModifiedConfig] = useState<DestinationConfig>(props.myDestination.configWithInfo.config)

  useEffect(() => {
    setModifiedConfig(props.myDestination.configWithInfo.config)
  }, [props.myDestination.configWithInfo.config])

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
                checked={modifiedConfig.isEnabled}
                onChange={(event, checked) => setModifiedConfig(prevState => {
                  return {...prevState, isEnabled: checked}
                })}
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
            <DestinationParamComp
              paramDef={p}
              value={modifiedConfig.destinationSpecificConfig.get(p.uri) || null}
              onValueChanged={(value) => setModifiedConfig(prevState => {
                return {
                  ...prevState,
                  destinationSpecificConfig: new Map(prevState.destinationSpecificConfig).set(p.uri, value)
                }
              })}
              key={p.uri}/>
          ))
        }
        </CardContent>
        <CardActions className={classes.actions}>
        <Button
          variant="contained"
          color="primary"
          disabled={props.myDestination.configWithInfo.config === modifiedConfig}
          onClick={async () => {
          const reply = await ctx.api.postDestinationConfig(props.projectUri, modifiedConfig)
          if (reply.saved){
            props.onDestinationModified(props.myDestination.definition.uri)
          }
        }}>{props.myDestination.configWithInfo.config === modifiedConfig ? "Setting saved" : "Save settings"}</Button>
        </CardActions>
      </Card>


    </div>
  ) // SAVE BUTTON UPDATE PARAMS
};

export default DestinationPanel;
