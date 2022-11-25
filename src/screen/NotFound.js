import React from 'react'
import Lottie from 'react-lottie-player'
import NotFoundAnimation from '../animation/notfound.json'
import { Box } from '@mui/system'

export default function NotFound() {
  return (
    <Box display="flex" flexDirection="row" justifyContent={'center'}>
       
    <Lottie
    loop
    animationData={NotFoundAnimation}
    play
    style={{ width: 300, height: 300 }}
    />
     </Box>
  )
}
