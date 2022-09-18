import { Box } from '@mui/system'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { blueGrey } from "@mui/material/colors"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostTag from './PostTag';
import { Skeleton } from '@mui/material'
import { useSpring, animated } from '@react-spring/web'


export default function PostPreview({ postInfo , setSelectedPost}) {

  const [onHover, setOnHover] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const navigate = useNavigate();
  const goToPost = (id) => {
    navigate(`/article/${id}`)
  }

  const AnimatedBox = animated(Box)

  return (


    <Box>
      <Box sx={{ textAlign: '-webkit-center', position: 'relative' }} >
        <Box
          sx={{
            width: { xl: 350, lg: 300, md: 300, sm: 320, xs: 280 },
            height: { xl: 350, lg: 300, md: 300, sm: 320, xs: 280 },
            backgroundColor: blueGrey[50],
            cursor: 'pointer',
            borderRadius: 10
          }}
          onClick={() => { 
           setSelectedPost(postInfo.id) 
          }}
        >
          <LazyLoadImage
            style={{ objectFit: 'cover', borderRadius: 20}}
            effect="blur"
            height={'100%'}
            width={'100%'}
            afterLoad={() => { setLoaded(true) }}
            src={[postInfo.imgUrl]} />
        </Box>
        <AnimatedBox
        onMouseEnter={() => { setOnHover(true) }}
        onMouseLeave={() => { setOnHover(false) }}
          sx={{
            background: 'linear-gradient(0deg, rgba(33,33,33,0.552280287114846) 0%, rgba(255,255,255,0) 50%)',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: onHover ? 1 : 0,
            width: { xl: 350, lg: 300, md: 300, sm: 320, xs: 280 },
            height: { xl: 350, lg: 300, md: 300, sm: 320, xs: 280 },
            borderRadius: 5

          }}
        >    
        More
        </AnimatedBox>
      </Box>
      <Box sx={{ textAlign: '-webkit-center' }} mt={1}>
        {
          loaded? 
          <PostTag tag={postInfo.tag} />
          :
          <Skeleton variant="rounded" width={'90%'} height={26}/>
        }
      </Box>
      {
        loaded?
        <>
              <Box mt={1} sx={{ fontFamily: "'EB Garamond', serif" }} >
        {postInfo.title}
      </Box>
      <Box mt={1} sx={{ textAlign: '-webkit-center' }}>
        <hr style={{ width: '10%' }}></hr>
      </Box>
      <Box mt={1} sx={{ fontFamily: "'EB Garamond', serif", color: blueGrey[600], fontSize: '0.8rem' }}>
        {(postInfo.date)}
      </Box>
        </>
        :
        <Box mt={1} sx={{ textAlign: '-webkit-center' }}>
          <Skeleton variant="rounded" width={'90%'} height={50} />
        </Box>
      }



    </Box>


  )
}
