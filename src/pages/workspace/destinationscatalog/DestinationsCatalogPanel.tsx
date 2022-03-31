import React, { FunctionComponent } from 'react';
import {DestinationDef} from '../../../service/restapi/data'
import {Box, Paper} from '@mui/material'
import Button from '@mui/material/Button'
import {PanelSection} from '../PanelSection'
import Typography from '@mui/material/Typography'
import {backgroundTransparent} from '../../../DesignConstants'

interface OwnProps {
  destinationDefs: DestinationDef[]
}

type Props = OwnProps;

const DestinationsCatalogPanel: FunctionComponent<Props> = (props) => {

  return (
    <>
      <PanelSection title={'Destinations Catalog'} subtitle={'Select the destinations you want to add to DataToggle'}>
      <Box display='flex' flexDirection='row' flexWrap={'wrap'}>
        {
          props.destinationDefs.map(d => (
            <Box marginRight={'24px'} marginBottom={'24px'}  key={d.uri}>
            <Button>
            <Paper elevation={0} variant={'outlined'} sx={{borderRadius:'8px'}}>
              <Box padding={'24px'} display='flex' flexDirection='column' alignItems={'center'} >
                <img  src={`${process.env.PUBLIC_URL}/destinations/${d.uri}-logo.svg`}  alt={d.name} height={'128px'} width={'128px'}/>
              </Box>
            </Paper>
            </Button>
            </Box>
          ))
        }
        <Box marginRight={'24px'} marginBottom={'24px'}>
          <Button sx={{textTransform:'none'}}>
            <Paper elevation={0} variant={'outlined'}  sx={{backgroundColor:backgroundTransparent, borderRadius:'8px'}}>
              <Box padding={'24px'} display='flex' flexDirection='column' alignItems={'center'} >
                <Box height={'128px'} width={'128px'} display='flex' alignItems={'center'} >
                  <Typography variant="body1" color={'primary'} >Request a new destination</Typography>
                </Box>
              </Box>
            </Paper>
          </Button>
        </Box>
      </Box>
      </PanelSection>

    </>)
};

export default DestinationsCatalogPanel;
