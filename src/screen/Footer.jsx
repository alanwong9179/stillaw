import { Box } from '@mui/system'
import React from 'react'

export default function Footer() {
  return (
    <Box display="flex" flexDirection={"row"} mt={2} mb={2}>
        <Box flex={1} sx={{textAlign:'center', fontFamily:"'EB Garamond', serif", }} >
            © 2022 still.aw
        </Box>
     
    </Box>
  )
}
