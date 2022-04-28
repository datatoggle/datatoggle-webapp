import React, {FunctionComponent, useContext, useState} from 'react'
import {Box, Dialog, Snackbar} from '@mui/material'
import Typography from '@mui/material/Typography'
import MyTextField from '../../../components/MyTextField'
import MyButton from '../../../components/MyButton'
import {UserContext} from '../../../service/UserContext'
import {userContext} from '../../../components/AuthCheck'

interface OwnProps {
  onDiscard: () => void
  onSaved: () => void
  open: boolean
}

type Props = OwnProps;

const DestinationRequestDialog: FunctionComponent<Props> = (props) => {

  const ctx: UserContext = useContext(userContext)

  const [name, setName] = useState<string>("")
  const [url, setUrl] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [confirmationSnackbarOpened, setConfirmationSnackbarOpened] = useState(false)

  return (
    <>
    <Dialog open={props.open} onClose={props.onDiscard}>
      <Box padding={'48px'}>
        <Typography variant="h6"  sx={{paddingBottom: '24px'}}>Request a new destination</Typography>
        <MyTextField value={name} label={"Name of the destination"} onChange={(val) => {
  setName(val.target.value)
}}/>
        <MyTextField value={url} label={"Url of the destination"} onChange={(val) => {
  setUrl(val.target.value)
}}/>
        <MyTextField value={message} label={"What do you want to use this destination for?"} multiline={true} minRows={4} onChange={(val) => {
  setMessage(val.target.value)
}}/>
        <MyButton onClick={onRequestSent}>Send Request</MyButton>

      </Box>
    </Dialog>
    <Snackbar
      autoHideDuration={3000}
      onClose={() => setConfirmationSnackbarOpened(false)}
      open={confirmationSnackbarOpened}
      message="Request sent, thanks for your feedback!"></Snackbar>
    </>
  );

  async function onRequestSent() {
    await ctx.api.postEvent('destinationRequest', {
      destinationName: name,
      destinationUrl: url,
      message: message
    })
    setMessage('')
    setName('')
    setUrl('')
    setConfirmationSnackbarOpened(true)
    props.onSaved()
  }
};

export default DestinationRequestDialog;
