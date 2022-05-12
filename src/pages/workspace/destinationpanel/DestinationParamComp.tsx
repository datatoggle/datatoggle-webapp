import React, {FunctionComponent, useEffect, useState} from 'react'
import {Box, FormControlLabel, Switch, TextField} from '@mui/material'
import {AtomicType, DestinationParam, DestinationParamDef, ParamDict, ParamType} from '../../../service/restapi/data'
import DestinationParamDict from './DestinationParamDict'
import DocLink from '../../../components/DocLink'
import {
  textBoxBorderColor,
  textBoxBorderRadius,
  textBoxHorizontalPadding
} from '../../../DesignConstants'

interface OwnProps {
  destinationUri: string
  paramDef: DestinationParamDef
  initialValue: DestinationParam
  errorMessage: string | null
  // saveFailed: boolean
  onValueChanged: (value: DestinationParam) => void
}

type ModifiableParamValue = AtomicType | [String,AtomicType][]

type Props = OwnProps;

function getInitialModified(initialValue: DestinationParam, paramDef: DestinationParamDef): ModifiableParamValue {
  return paramDef.type === ParamType.Dict ?
    Object.entries(initialValue as ParamDict) : (initialValue as AtomicType)
}

const DestinationParamComp: FunctionComponent<Props> = (props) => {

  let updateNoDictValue = (value: AtomicType) => {
    setModifiedParam(value)
    props.onValueChanged(value as AtomicType)
  }

  const onDictChanged = (pairs: [String,AtomicType][]) => {
    setModifiedParam(pairs)
    props.onValueChanged(Object.fromEntries(pairs))
  }

  const [modifiedParam, setModifiedParam] = useState<ModifiableParamValue>(getInitialModified(props.initialValue, props.paramDef))
  useEffect(() => setModifiedParam(getInitialModified(props.initialValue, props.paramDef)), [props.initialValue, props.paramDef])

  const docLink = `https://docs.datatoggle.com/destinations/${props.destinationUri}#${props.paramDef.uri}`

  let paramValueComp
  switch (props.paramDef.type) {
    case ParamType.Boolean:
      paramValueComp = <Box
        display={'flex'} justifyContent={'space-between'}
        paddingLeft={textBoxHorizontalPadding}
        paddingRight={textBoxHorizontalPadding}
        paddingTop={'7px'} // to get same height as TexBox
        paddingBottom={'7px'}
        sx={{border: 1, borderRadius: textBoxBorderRadius, borderColor:textBoxBorderColor}}
      >
        <FormControlLabel
        control={
          <Switch
            checked={modifiedParam as boolean}
            onChange={(event, checked) => updateNoDictValue(checked)}
            name={props.paramDef.name}
            color="primary"
          />
        }
        style={{marginLeft: 0}}
        labelPlacement="start"
        label={props.paramDef.name + (props.paramDef.isMandatory ? null : " *")}
      />
        <DocLink docLink={docLink}/>
      </Box>
      break;
    case ParamType.String:
      paramValueComp = <TextField
          error={props.errorMessage != null}
          helperText={props.errorMessage || null}
          variant={'outlined'}
          fullWidth id={props.paramDef.uri}
          label={props.paramDef.name + (props.paramDef.isMandatory ? " *" : "")}
          value={modifiedParam as string}
          onChange={(event) => updateNoDictValue(event.target.value)}
          InputProps={{
            endAdornment:(
              <DocLink docLink={docLink}/>)}}
        />
      break;
    case ParamType.Dict:
      paramValueComp = <DestinationParamDict
          docLink={docLink}
          paramDef={props.paramDef}
          value={modifiedParam as [string,AtomicType][]}
          onValueChanged={(value) => onDictChanged(value)}
          />
  }

  return (
    <Box sx={{
      paddingTop: 0,
      paddingBottom: '24px'}}>
      {
        paramValueComp
      }
    </Box>
  );
};

export default DestinationParamComp;
