import React from 'react'
import Typography from '@mui/material/Typography'
import {Box} from '@mui/material'

type Props = {
  children: React.ReactNode
  title?: string
  subtitle?: string
};

export const PanelSection = (props: Props) => {
  return (
    <Box paddingTop="24px" paddingBottom="24px">
      {props.title &&
      <Typography variant="h6" paddingBottom="16px">
        {props.title}
      </Typography>
      }
        {props.subtitle &&
        <Typography  paddingBottom="16px">
          {props.subtitle}
        </Typography>
        }
        {props.children}
    </Box>
  )
}
