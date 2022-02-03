import React, {FunctionComponent, useContext, useEffect, useState} from 'react'
import Typography from '@mui/material/Typography'
import {Box, Card, Divider, FormControlLabel, Switch} from '@mui/material'
import DestinationParamComp from './DestinationParamComp'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import {DestinationConfig, DestinationParam, DestinationParamDef} from '../../service/restapi/data'
import {UserContext} from '../../service/UserContext'
import {userContext} from '../../components/AuthCheck'
import {MyDestination} from './WorkspacePage'
import datatoggle from '@datatoggle/datatoggle-sdk'

interface OwnProps {
  workspaceUri: string
  myDestination: MyDestination
  saved: boolean | null // null if displayed from workspace and not after post destination request
  onDestinationModified: (destinationUri: string) => void
}

type Props = OwnProps;

const DestinationPanel: FunctionComponent<Props> = (props) => {

  const ctx: UserContext = useContext(userContext)

  const paramDefs = props.myDestination.definition.paramDefs

  const [modifiedConfig, setModifiedConfig] = useState<DestinationConfig>(props.myDestination.configWithInfo.config)
  // init modifiedConfig with the passed in props
  useEffect(() => {
    setModifiedConfig(props.myDestination.configWithInfo.config)
  }, [props.myDestination.configWithInfo.config])

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
    <Box sx={{
      width: '512px',
      display: 'flex',
      paddingTop: '64px',
    }}>
    </Box>
      <Card sx={{
        width: '512px',
        borderRadius: '16px',
        padding: '24px'
      }}>
        <CardContent sx={{padding: '0'}}>
          <Box sx={{display: 'flex'}}>
            <Typography variant="h5" component="h2">
              {props.myDestination.definition.name}
            </Typography>
            <Box flexGrow={1}/>
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
          </Box>
          <Divider sx={{
            marginTop: '24px',
            marginBottom: '24px'
          }}/>
        {
          paramDefs.map((paramDef: DestinationParamDef) => (
            <DestinationParamComp
              paramDef={paramDef}
              initialValue={props.myDestination.configWithInfo.config.destinationSpecificConfig[paramDef.uri] || paramDef.defaultValue}
              onValueChanged={(value: DestinationParam) => {
                let newSpecificConfig = {
                  ...modifiedConfig.destinationSpecificConfig
                }
                newSpecificConfig[paramDef.uri] = value
                setModifiedConfig((prevState: DestinationConfig) => { return {
                  ...prevState,
                  destinationSpecificConfig: newSpecificConfig
                }})
              }}
              key={paramDef.uri}/>
          ))
        }
        </CardContent>
        <CardActions sx={{
          padding: '0',
          display: 'flex',
          flexDirection: 'row-reverse'}}>
        <Button
          variant="contained"
          color="primary"
          disabled={props.myDestination.configWithInfo.config === modifiedConfig}
          onClick={async () => {
          const reply = await ctx.api.postDestinationConfig(props.workspaceUri, modifiedConfig)
          if (reply.saved){
            props.onDestinationModified(props.myDestination.definition.uri)
            datatoggle.track("save_destination_config", {
              workspace_uri: props.workspaceUri,
              destination_uri: props.myDestination.definition.uri
            })
          }
        }}>{props.myDestination.configWithInfo.config === modifiedConfig ? "Setting saved" : "Save settings"}</Button>
        </CardActions>
      </Card>
    </Box>
  ) // SAVE BUTTON UPDATE PARAMS
};

export default DestinationPanel;
