import React, {FunctionComponent, useContext, useState} from 'react'
import {DestinationDef} from '../../../service/restapi/data'
import {Box, Dialog, DialogActions, DialogTitle, Paper} from '@mui/material'
import Button from '@mui/material/Button'
import {PanelSection} from '../PanelSection'
import Typography from '@mui/material/Typography'
import {backgroundTransparent} from '../../../DesignConstants'
import {workspaceDestinationUrl} from '../../../service/urls'
import {PostDestinationConfigReply} from '../../../service/restapi/RestApi'
import datatoggle from '@datatoggle/datatoggle-sdk'
import {MyDestination} from '../WorkspacePage'
import {useHistory} from 'react-router-dom'
import {UserContext} from '../../../service/UserContext'
import {userContext} from '../../../components/AuthCheck'
import DestinationRequestDialog from './DestinationRequestDialog'

interface OwnProps {
  workspaceUri: string
  destinationDefs: DestinationDef[]
  myDestinations: MyDestination[]
  onNewDestinationCreated: (destinationUri: string) => void
}

type Props = OwnProps;

const DestinationsCatalogPanel: FunctionComponent<Props> = (props) => {

  const ctx: UserContext = useContext(userContext)
  let history = useHistory();
  const [dialogDestRequestOpen, setDialogDestRequestOpen] = useState<boolean>(false)

  const onCreateNewDestination = async (destinationDef: DestinationDef) => {

    const myDest = props.myDestinations.find(m => m.definition.uri === destinationDef.uri)
    if (myDest) {
      history.push(workspaceDestinationUrl(props.workspaceUri, myDest.definition.uri))
    } else {
      const result: PostDestinationConfigReply = await ctx.api.postDestinationConfig(props.workspaceUri, {
        destinationUri: destinationDef.uri,
        isEnabled: false,
        destinationSpecificConfig: {}
      })
      if (result.saved){
        datatoggle.track("create_destination", {
          workspace_uri: props.workspaceUri,
          destination_def_uri: destinationDef.uri
        })
        props.onNewDestinationCreated(destinationDef.uri)
      }
    }
  }

  return (
    <>
      <PanelSection title={'Destinations Catalog'} subtitle={'Select the destinations you want to add to DataToggle'}>
      <Box display='flex' flexDirection='row' flexWrap={'wrap'}>
        {
          props.destinationDefs.map(d => (
            <Box marginRight={'24px'} marginBottom={'24px'}  key={d.uri}>
            <Button onClick={() => onCreateNewDestination(d)}>
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
          <Button sx={{textTransform:'none'}} onClick={() => setDialogDestRequestOpen(true)}>
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
      <DestinationRequestDialog open={dialogDestRequestOpen} onSaved={() => setDialogDestRequestOpen(false)} onDiscard={() => setDialogDestRequestOpen(false)}></DestinationRequestDialog>
      </>)
};

export default DestinationsCatalogPanel;
