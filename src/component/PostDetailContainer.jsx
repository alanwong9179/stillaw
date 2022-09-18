import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system'
import { useSpring, animated, easings, useTransition } from "react-spring";
import Article from '../screen/Article';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

export default function PostDetailContainer({ selectedPost, setSelectedPost }) {


  const AnimatedBox = animated(Box)
  const [showup, setShowup] = useState(false)

  useEffect(() => {
    selectedPost !== '' ?
      setShowup(true)
      :
      setShowup(false)
  }, [selectedPost])

  const transitions = useTransition(showup, {
    from: { opacity: 0 ,y: 300},
    enter: { opacity: 1 ,y: 0},
    leave: { opacity: 0 , y: 300},
    config:{easing: easings.easeInOutBack, duration: 500}
  })




  return (
    <div>
      {
        transitions((props, item, key) =>  
          item &&
          (
            <AnimatedBox
            key={key}
            style={props}
            sx={{
            minHeight: '125vh', 
            position: 'absolute', 
            left: 0, 
            top:0,
            width:'100%',
            zIndex:'10',
            display:'flex',
            flexDirection:'column'
            }}
          >
            <Box sx={{flex:'0.5', backgroundColor: '#2c2c2ce0'}}>
              <IconButton onClick={()=>{setSelectedPost('')}}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ backgroundColor: '#ffffff' , flex:'9'}}>
              <Article />
            </Box>
          </AnimatedBox>
          ))
          }
    </div>



  )
}
