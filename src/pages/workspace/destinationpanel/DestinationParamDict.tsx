import React, { FunctionComponent } from 'react';
import {AtomicType, DestinationParamDef} from '../../../service/restapi/data'
import Typography from '@mui/material/Typography'
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material'
import {Add, Delete} from '@mui/icons-material'
import {
  textBoxBorderColor,
  textBoxBorderRadius,
  textBoxLeftPadding, textBoxColor,
  textBoxVerticalPadding
} from '../../../DesignConstants'

interface OwnProps {
  paramDef: DestinationParamDef
  value: [string,AtomicType][]
  onValueChanged: (value: [string,AtomicType][]) => void
}

type Props = OwnProps;

const DestinationParamDict: FunctionComponent<Props> = (props) => {


  function strToValue(str: string): AtomicType {
    // return value if number of boolean, else return string
    try {
      return JSON.parse(str)
    } catch (e) {
      return str
    }
  }


  return (<>
      <Box sx={{border: 1, borderRadius: textBoxBorderRadius, borderColor:textBoxBorderColor}}>
        <Box paddingLeft={textBoxLeftPadding} paddingTop={textBoxVerticalPadding} paddingBottom={textBoxVerticalPadding}>
        <Typography variant="subtitle1" color={textBoxColor}>
          {props.paramDef.name}
        </Typography>
        </Box>
        <Box padding={'24px'} paddingTop={'8px'}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: 256, borderBottom:"none" }} >Key</TableCell>
                <TableCell style={{ borderBottom:"none" }}>Value</TableCell>
                <TableCell style={{ width: 0, borderBottom:"none" }} align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                props.value.map( ([dictKey, dictValue]: [string,AtomicType], idx: number) =>
                  <TableRow key={idx}>
                <TableCell  style={{ borderBottom:"none", width: 256 }} >
                  <TextField value={dictKey} onChange={(event) => {
                    props.value[idx] = [event.target.value, dictValue]
                    props.onValueChanged(props.value)
                  }}/>
                </TableCell>
                <TableCell style={{ borderBottom:"none"}}>
                  <TextField fullWidth value={dictValue}
                             onChange={(event) => {
                               props.value[idx] = [dictKey, strToValue(event.target.value)]
                               props.onValueChanged(props.value)
                             }}/>
                </TableCell>
                <TableCell  style={{ borderBottom:"none", width: 0 }} align="right">
                  <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => {
                    props.value.splice(idx, 1)
                    props.onValueChanged(props.value)
                  }
                  }>
                    <Delete />
                  </IconButton>
                </TableCell>
                </TableRow>)
              }
              <TableRow >
                <TableCell align="left" style={{ borderBottom:"none"}}>
                  <IconButton color="primary" aria-label="upload picture" component="span"
                              onClick={ () => {
                                let modifiedDict = props.value as [String,AtomicType][]
                                modifiedDict.push(["", ""])
                                props.onValueChanged(props.value)
                              }
                              }>
                    <Add />
                  </IconButton>
                </TableCell>
                <TableCell style={{ borderBottom:"none"}}></TableCell>
                <TableCell style={{ borderBottom:"none"}}></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default DestinationParamDict;
