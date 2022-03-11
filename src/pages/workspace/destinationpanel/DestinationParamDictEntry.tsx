import React, {FunctionComponent} from 'react'
import {TextField} from '@mui/material'
import Button from '@mui/material/Button'
import {AtomicType} from '../../../service/restapi/data'

interface OwnProps {
  entryKey: string
  value: AtomicType
  isNew: boolean // if yes, button is add, else it's remove
  onKeyChanged: (newValue: string) => void
  onValueChanged: (newValue: AtomicType) => void
  onRemoved: () => void
}

function strToValue(str: string): AtomicType {
  // return value if number of boolean, else return string
  try {
    return JSON.parse(str)
  } catch (e) {
      return str
  }
}

type Props = OwnProps;

const DestinationParamDictEntry: FunctionComponent<Props> = (props) => {

  return (
    <div>
    <TextField
      variant={'outlined'}
      label='key'
      value={props.entryKey}
      onChange={(event) => props.onKeyChanged(event.target.value)}
    />
  <TextField
    variant={'outlined'}
    label='value'
    value={props.value}
    onChange={(event) => props.onValueChanged(strToValue(event.target.value))}
  />
  <Button
    variant="contained"
    color="primary"
    onClick={() => props.onRemoved()}
  >
    Remove
  </Button>
    </div>
  );
};

export default DestinationParamDictEntry;
