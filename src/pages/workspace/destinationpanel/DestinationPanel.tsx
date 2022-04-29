import React, {FunctionComponent, useContext, useEffect, useState} from 'react'
import {Box, Card, FormControlLabel, Switch} from '@mui/material'
import DestinationParamComp from './DestinationParamComp'
import Button from '@mui/material/Button'
import {DestinationConfig, DestinationParam, DestinationParamDef} from '../../../service/restapi/data'
import {UserContext} from '../../../service/UserContext'
import {userContext} from '../../../components/AuthCheck'
import {MyDestination} from '../WorkspacePage'
import datatoggle from '@datatoggle/datatoggle-sdk'
import {useParams} from 'react-router-dom'
import {PanelSection} from '../PanelSection'
import {backgroundTransparent, messageBackgroundColor} from '../../../DesignConstants'
import CardContent from '@mui/material/CardContent'

interface OwnProps {
  workspaceUri: string
  myDests: MyDestination[]
  saved: boolean | null // null if displayed from workspace and not after post destination request
  onDestinationModified: (destinationUri: string) => void
}

type Props = OwnProps;

const DestinationPanel: FunctionComponent<Props> = (props) => {

  const ctx: UserContext = useContext(userContext)
  let { destination_def_uri } = useParams<{destination_def_uri: string}>();

  const myDestination:MyDestination = props.myDests.find(d => d.definition.uri === destination_def_uri)!!

  const paramDefs = myDestination.definition.paramDefs

  const [modifiedConfig, setModifiedConfig] = useState<DestinationConfig>(myDestination.configWithInfo.config)
  // init modifiedConfig with the passed in props
  useEffect(() => {
    setModifiedConfig(myDestination.configWithInfo.config)
  }, [myDestination.configWithInfo.config])

  return (
    <>
      <PanelSection>
        <Card sx={{backgroundColor:backgroundTransparent, borderRadius:'8px', padding: '24px'}}>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
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
          style={ {marginRight: 0, alignSelf: 'flex-end'}}
          label="Enabled"
        />
      <Button
        variant="contained"
        color="primary"
        disabled={myDestination.configWithInfo.config === modifiedConfig}
        onClick={async () => {
          const reply = await ctx.api.postDestinationConfig(props.workspaceUri, modifiedConfig)
          if (reply.saved){
            props.onDestinationModified(myDestination.definition.uri)
            datatoggle.track("save_destination_config", {
              workspace_uri: props.workspaceUri,
              destination_uri: myDestination.definition.uri
            })
          }
        }}>{myDestination.configWithInfo.config === modifiedConfig ? "Setting saved" : "Save settings"}</Button>
      </Box>
        </Card>
      </PanelSection>
        <PanelSection>
        {
          paramDefs.map((paramDef: DestinationParamDef) => (
            <DestinationParamComp
              paramDef={paramDef}
              initialValue={myDestination.configWithInfo.config.destinationSpecificConfig[paramDef.uri] || paramDef.defaultValue}
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
    </PanelSection>
  </>
  ) // SAVE BUTTON UPDATE PARAMS
};

export default DestinationPanel;
