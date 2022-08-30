import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system'
import { useSpring, animated, easings, useTransition } from "react-spring";


export default function PostDetailContainer({ selectedPost }) {
  const AnimatedBox = animated(Box)
  const [showup, setShowup] = useState(false)

  useEffect(() => {
    selectedPost !== '' &&
      setShowup(true)
  }, [selectedPost])

  const transitions = useTransition(showup, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  })




  return (
    <div>
      {
        transitions.map(({ item, key, props: style }) => 
          item &&
          (
            <animated.Box
            key={key}
            stlyle={props}
          /*sx={{
           minHeight: '100vh', 
           backgroundColor:'#330029', 
           position: 'absolute', 
           left: 0, 
           top:0,
           width:'100%',
           }}*/
          >

            <Box sx={{ marginTop: '5%', backgroundColor: '#330029' }}>
              info
            </Box>
          </animated.Box>
          )
          
        )
      }
    </div>



  )
}
