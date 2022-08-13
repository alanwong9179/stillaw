import { Box } from '@mui/system'
import React from 'react'
import { writeNewBlog } from '../functions/insertDb'

export default function Footer() {
  return (
    <Box display="flex" flexDirection={"row"} mt={2} mb={2}>
        <Box flex={1} sx={{textAlign:'center', fontFamily:"'EB Garamond', serif"}} onClick={()=>{writeNewBlog("1")}}>
            © 2022 still.aw
        </Box>
     
    </Box>
  )
}
