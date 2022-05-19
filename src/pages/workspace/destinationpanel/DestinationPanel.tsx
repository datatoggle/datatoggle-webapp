import React, {FunctionComponent, useContext, useEffect, useState} from 'react'
import {Box, Card, FormControlLabel, Switch, Tooltip} from '@mui/material'
import DestinationParamComp from './DestinationParamComp'
import LoadingButton from '@mui/lab/LoadingButton';
import {
  DestinationConfigWithInfo,
  DestinationParam,
  DestinationParamDef
} from '../../../service/restapi/data'
import {UserContext} from '../../../service/UserContext'
import {userContext} from '../../../components/AuthCheck'
import {MyDestination} from '../WorkspacePage'
import datatoggle from '@datatoggle/datatoggle-sdk'
import {useParams} from 'react-router-dom'
import {PanelSection} from '../PanelSection'
import {backgroundTransparent} from '../../../DesignConstants'
import {isDestinationEnablable} from './destinationCheck'

interface OwnProps {
  workspaceUri: string
  myDests: MyDestination[]
  onDestinationModified: (destinationUri: string) => void
}

type Props = OwnProps;

const DestinationPanel: FunctionComponent<Props> = (props) => {

  const ctx: UserContext = useContext(userContext)
  let { destination_def_uri } = useParams<{destination_def_uri: string}>();

  const myDestination:MyDestination = props.myDests.find(d => d.definition.uri === destination_def_uri)!!

  const paramDefs: DestinationParamDef[] = myDestination.definition.paramDefs

  const [modifiedConfig, setModifiedConfig] = useState<DestinationConfigWithInfo>(myDestination.configWithInfo)
  const [lastSaveFailed, setLastSaveFailed] = useState<boolean>(false)
  const [waitingForSaveCallback, setWaitingForSaveCallback] = useState<boolean>(false)

  // init modifiedConfig with the passed in props
  useEffect(() => {
    setModifiedConfig(myDestination.configWithInfo)
    setLastSaveFailed(false)
    setWaitingForSaveCallback(false)
  }, [myDestination.configWithInfo])

  const enablable = isDestinationEnablable(modifiedConfig.config, myDestination.definition)

  // NB: Box under tooltip is here because tooltip does not work around disabled components
  return (
    <>
      <PanelSection>
        <Card sx={{backgroundColor:backgroundTransparent, borderRadius:'8px', padding: '24px'}}>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
        <FormControlLabel
          control={
            <Tooltip title={enablable ? "" : "All mandatory fields (*) must be filled to enable destination"}>
              <Box>
                <Switch
                  disabled={!enablable && !modifiedConfig.config.isEnabled}
                  checked={modifiedConfig.config.isEnabled}
                  onChange={(event, checked) => setModifiedConfig(prevState => {
                    return {
                      ...prevState,
                      config: {
                        ...prevState.config,
                        isEnabled: checked
                      }
                    }
                  })}
                  name="checkedB"
                  color="primary"
                />
              </Box>
            </Tooltip>
          }
          style={ {marginRight: 0, alignSelf: 'flex-end'}}
          label="Enabled"
        />
      <LoadingButton
        variant="contained"
        color="primary"
        loading={waitingForSaveCallback}
        disabled={myDestination.configWithInfo === modifiedConfig}
        onClick={onSaveClick}>
        {myDestination.configWithInfo === modifiedConfig ? "Setting saved" : "Save settings"}</LoadingButton>
      </Box>
        </Card>
      </PanelSection>
        <PanelSection>
        {
          paramDefs.map((paramDef: DestinationParamDef) => (
            <DestinationParamComp
              destinationUri={myDestination.definition.uri}
              paramDef={paramDef}
              saveFailed={lastSaveFailed}
              errorMessage={modifiedConfig.paramErrors[paramDef.uri]}
              initialValue={myDestination.configWithInfo.config.destinationSpecificConfig[paramDef.uri] || paramDef.defaultValue}
              onValueChanged={(value: DestinationParam) => {
                let newSpecificConfig = {
                  ...modifiedConfig.config.destinationSpecificConfig
                }
                newSpecificConfig[paramDef.uri] = value
                setModifiedConfig((prevState: DestinationConfigWithInfo) => { return {
                  ...prevState,
                  config: {
                    ...prevState.config,
                    destinationSpecificConfig: newSpecificConfig
                  }
                }})
              }}
              key={paramDef.uri}/>
          ))
        }
    </PanelSection>
  </>
  )

  async function onSaveClick() {
    setWaitingForSaveCallback(true)
    const reply = await ctx.api.postDestinationConfig(props.workspaceUri, modifiedConfig.config)
    if (reply.saved) {
      props.onDestinationModified(myDestination.definition.uri)
      datatoggle.track("save_destination_config", {
        workspace_uri: props.workspaceUri,
        destination_uri: myDestination.definition.uri
      })
    } else {
      let paramErrors = reply.configWithInfo.paramErrors
      setModifiedConfig(prevState => ({
        ...prevState,
        paramErrors
      }))
      setLastSaveFailed(!reply.saved)
      setWaitingForSaveCallback(false)
    }


  }


};

export default DestinationPanel;
