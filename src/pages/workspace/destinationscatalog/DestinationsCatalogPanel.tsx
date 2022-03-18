import React, { FunctionComponent } from 'react';
import {DestinationDef} from '../../../service/restapi/data'
import {Box, Paper} from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import UpvotyWidget from '../../../components/react-upvoty/UpvotyWidget'
import {PanelSection} from '../PanelSection'

interface OwnProps {
  destinationDefs: DestinationDef[]
}

type Props = OwnProps;

const DestinationsCatalogPanel: FunctionComponent<Props> = (props) => {

  return (
    <>
      <PanelSection title={'Destinations Catalog'} subtitle={'Select the destinations you want to add'}>
      <Box display='flex' flexDirection='row' flexWrap={'wrap'}>
        {
          props.destinationDefs.map(d => (
            <Box marginRight={'24px'} marginBottom={'24px'}>
            <Button>
            <Paper elevation={0} variant={'outlined'} key={d.uri}>
              <Box padding={'24px'} display='flex' flexDirection='column' alignItems={'center'} >
                <img  src={`${process.env.PUBLIC_URL}/destinations/${d.uri}-logo.svg`}  alt={d.name} height={'128px'} width={'128px'}/>
              </Box>
            </Paper>
            </Button>
            </Box>

          ))
        }
      </Box>
      </PanelSection>

      <PanelSection title={'Destinations Requests'} subtitle={'Vote for the destinations you need'}>
      <UpvotyWidget baseUrl={'datatoggle.upvoty.com'} boardHash='63d2b57f23ba902496a1038c262b687a3591c069b9385ece5f8f4596d3300981'/>
      </PanelSection>
    </>)
};

export default DestinationsCatalogPanel;
