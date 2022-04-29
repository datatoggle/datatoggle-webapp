import React, {FunctionComponent, useEffect, useState} from 'react'
import {Box, Checkbox, FormControlLabel, TextField} from '@mui/material'
import {AtomicType, DestinationParam, DestinationParamDef, ParamDict, ParamType} from '../../../service/restapi/data'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import DestinationParamDictEntry from './DestinationParamDictEntry'

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
      paramValueComp = <><Typography variant="subtitle1">
        {props.paramDef.name}
      </Typography>
        {
          (modifiedParam as [string,AtomicType][]).map( ([dictKey, dictValue]: [string,AtomicType], idx: number) => {
            return <DestinationParamDictEntry
              key={idx}
                isNew={false}
                entryKey={dictKey}
                value={dictValue}
                onKeyChanged={(newKey: string) => {
                  let modifiedDict = modifiedParam as [String,AtomicType][]
                  modifiedDict[idx] = [newKey, dictValue]
                  onDictChanged(modifiedDict)
                }}
                onValueChanged={(newValue: AtomicType) => {
                  let modifiedDict = modifiedParam as [String,AtomicType][]
                  modifiedDict[idx] = [dictKey, newValue]
                  onDictChanged(modifiedDict)
                }}
                onRemoved={() => {
                  let modifiedDict = modifiedParam as [String,AtomicType][]
                  modifiedDict.splice(idx, 1)
                  onDictChanged(modifiedDict)
                }
                }
              />
          })
        }
      <Button
        variant="contained"
        color="primary"
        onClick={ () => {
          let modifiedDict = modifiedParam as [String,AtomicType][]
          modifiedDict.push(["", ""])
          onDictChanged(modifiedDict)
        }
        }
      >
        Add entry
      </Button>
        </>
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
