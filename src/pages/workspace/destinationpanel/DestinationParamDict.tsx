import React, { FunctionComponent } from 'react';
import {AtomicType, DestinationParamDef} from '../../../service/restapi/data'
import Typography from '@mui/material/Typography'
import DestinationParamDictEntry from './DestinationParamDictEntry'
import Button from '@mui/material/Button'

interface OwnProps {
  paramDef: DestinationParamDef
  value: [string,AtomicType][]
  onValueChanged: (value: [string,AtomicType][]) => void
}

type Props = OwnProps;

const DestinationParamDict: FunctionComponent<Props> = (props) => {
  return (<>
      <Typography variant="subtitle1">
      {props.paramDef.name}
    </Typography>
      {
        props.value.map( ([dictKey, dictValue]: [string,AtomicType], idx: number) => {
          return <DestinationParamDictEntry
            key={idx}
            isNew={false}
            entryKey={dictKey}
            value={dictValue}
            onKeyChanged={(newKey: string) => {
              props.value[idx] = [newKey, dictValue]
              props.onValueChanged(props.value)
            }}
            onValueChanged={(newValue: AtomicType) => {
              props.value[idx] = [dictKey, newValue]
              props.onValueChanged(props.value)
            }}
            onRemoved={() => {
              props.value.splice(idx, 1)
              props.onValueChanged(props.value)
            }
            }
          />
        })
      }
      <Button
        variant="contained"
        color="primary"
        onClick={ () => {
          let modifiedDict = props.value as [String,AtomicType][]
          modifiedDict.push(["", ""])
          props.onValueChanged(props.value)
        }
        }
      >
        Add entry
      </Button>
    </>
  );
};

export default DestinationParamDict;
