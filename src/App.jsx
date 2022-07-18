import { useState } from 'react'
import {Box} from '@mui/material'
import MainHeader from './screen/MainHeader'
import PostList from './screen/PostList'


function App() {


  return (
    <Box 
     mt={5}
     ml={{xl:40,lg:20,md:20,sm:20,xs:10} } 
     mr={{xl:40,lg:20,md:20,sm:20,xs:10} }  
    >
      <Box><MainHeader /></Box>
      <Box mt={6}><PostList /></Box>
    </Box>
  )
}

export default App
