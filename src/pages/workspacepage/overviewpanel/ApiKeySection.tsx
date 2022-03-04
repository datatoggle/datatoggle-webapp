
import React, {useState} from 'react'
import Typography from '@mui/material/Typography'
import {Alert, Chip, Snackbar} from '@mui/material'
import {CopyAll} from '@mui/icons-material'

type Props = {
  apiKey: string
};

export const ApiKeySection = (props: Props) => {

  const [apiKeyCopiedAlertOpen, setApiKeyCopiedAlertOpen] = useState<boolean>(false);

  return (
    <>
      <Typography variant="h6" paddingTop="48px" paddingBottom="16px">
        My API key
      </Typography>

      <Typography  paddingBottom="16px">
        This API key is used to initialize the DataToggle API on your website.
      </Typography>

      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={apiKeyCopiedAlertOpen} autoHideDuration={6000} onClose={() => {setApiKeyCopiedAlertOpen(false)}}>
        <Alert onClose={() => {setApiKeyCopiedAlertOpen(false)}} severity="success">
          Api key was copied to the clipboard
        </Alert>
      </Snackbar>
      <div>
        <Chip icon={<CopyAll/>} label={props.apiKey} variant="outlined" onClick={() => {
          navigator.clipboard.writeText(props.apiKey).then(() => {
            setApiKeyCopiedAlertOpen(true)
          })
        }} />
      </div>
    </>
  )
}
