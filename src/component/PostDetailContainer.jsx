import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system'
import { useSpring, animated, easings, useTransition } from "react-spring";
import Article from '../screen/Article';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { getPostDetails } from '../functions/selectDb';

export default function PostDetailContainer({ selectedPost, setSelectedPost }) {


  const AnimatedBox = animated(Box)
  const [showup, setShowup] = useState(false)
  const [postDetails, setPostDetails] = useState([])

  useEffect(() => {
    if (selectedPost !== '' ) {
      document.body.style.overflow = "hidden"
      setShowup(true)
    }else{
      document.body.style.overflow = "auto"
      setShowup(false)

    }
  }, [selectedPost])

  useEffect(() => {
    showup &&
    getPostDetails(selectedPost).then(pDetail => {
      setPostDetails(pDetail)
    })
  },[showup])

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
            maxHeight: '100vh', 
            minHeight: '100vh', 
            position: 'absolute', 
            left: 0, 
            top:0,
            width:'100%',
            zIndex:'10',
            display:'flex',
            flexDirection:'column',
            overflow:'auto'
            }}
          >
            <Box sx={{flex:'0.1', backgroundColor: '#2c2c2ce0', textAlign:'right'}}>
              <IconButton onClick={()=>{setSelectedPost('')}}>
                <CloseIcon sx={{color:'#FFF'}}/>
              </IconButton>
            </Box>
            <Box sx={{ backgroundColor: '#ffffff' , flex:'9', overflowY: 'scroll'}}>
              {
                postDetails.length !== 0 &&
                <Article postDetail={postDetails}/>
              }

            </Box>
          </AnimatedBox>
          ))
          }
    </div>



  )
}
