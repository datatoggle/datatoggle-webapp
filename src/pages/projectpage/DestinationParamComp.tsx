import React, { FunctionComponent } from 'react';
import {Checkbox, createStyles, FormControlLabel, TextField, Theme} from '@material-ui/core'
import {DestinationParamDef, ParamType} from '../../service/restapi/data'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 8,
      paddingBottom: 8
    }
  }))


interface OwnProps {
  paramDef: DestinationParamDef
  error: string | null
  value: string | boolean | null
  onValueChanged: (value: string | boolean) => void
}

type Props = OwnProps;

const DestinationParamComp: FunctionComponent<Props> = (props) => {

  const classes = useStyles();

  let paramValueComp
  switch (props.paramDef.type) {
    case ParamType.Boolean:
      paramValueComp = <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={props.value as boolean}
            onClick={() => props.onValueChanged(!(props.value as boolean))}
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
        value={props.value as string}
        onChange={(event) => props.onValueChanged(event.target.value)}
      />
      break;

  }


  return (
    <div className={classes.root}>
      {
        paramValueComp
      }
    </div>
  );
};

export default DestinationParamComp;
