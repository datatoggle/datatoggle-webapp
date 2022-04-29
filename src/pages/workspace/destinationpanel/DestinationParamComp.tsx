import React, {FunctionComponent, useEffect, useState} from 'react'
import {Box, Checkbox, FormControlLabel, TextField} from '@mui/material'
import {AtomicType, DestinationParam, DestinationParamDef, ParamDict, ParamType} from '../../../service/restapi/data'
import DestinationParamDict from './DestinationParamDict'

interface OwnProps {
  paramDef: DestinationParamDef
  initialValue: DestinationParam
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

  let paramValueComp
  switch (props.paramDef.type) {
    case ParamType.Boolean:
      paramValueComp = <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={modifiedParam as boolean}
            onClick={() => updateNoDictValue(!modifiedParam)}
          />
        }
        style={{marginLeft: 0}}
        labelPlacement="start"
        label={props.paramDef.name}
      />
      break;
    case ParamType.String:
      paramValueComp = <TextField
        variant={'outlined'}
        fullWidth id={props.paramDef.uri}
        label={props.paramDef.name}
        value={modifiedParam as string}
        onChange={(event) => updateNoDictValue(event.target.value)}
      />
      break;
    case ParamType.Dict:
      paramValueComp = <DestinationParamDict
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
