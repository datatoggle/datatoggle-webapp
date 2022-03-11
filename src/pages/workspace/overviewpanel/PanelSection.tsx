import React from 'react'
import Typography from '@mui/material/Typography'

type Props = {
  children: React.ReactNode
  title: string
  subtitle?: string
};

export const PanelSection = (props: Props) => {
  return (
    <>
    <Typography variant="h6" paddingTop="48px" paddingBottom="16px">
      {props.title}
    </Typography>

      {props.subtitle &&
      <Typography  paddingBottom="16px">
        {props.subtitle}
      </Typography>
      }
      {props.children}
    </>
  )
}
