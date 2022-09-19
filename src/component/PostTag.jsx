import React from 'react'
import { Box } from '@mui/material'
import { blueGrey } from "@mui/material/colors"

export default function PostTag({tag}) {
  return (
    <Box sx={{ width: 'fit-content', backgroundColor: blueGrey[600], color: '#fff', borderRadius: '4px', padding: '1px 5px', fontSize:'0.8rem' , fontFamily: "'Manrope', serif"}}>
        {tag}
    </Box>
  )
}
