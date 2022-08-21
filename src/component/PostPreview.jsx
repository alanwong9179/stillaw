import { Box } from '@mui/system'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { blueGrey } from "@mui/material/colors"
import { Divider } from '@mui/material';
import moment from 'moment'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostTag from './PostTag';

export default function PostPreview({ postInfo }) {
   
  const [onHover, setOnHover] = useState(false)
  const navigate = useNavigate();
  const goToPost = (id) => {
  navigate(`/article/${id}`)
  }

  return (
    <Box>
      <Box sx={{textAlign:'-webkit-center', position:'relative'}} >
        <Box 
        onMouseEnter={()=>{setOnHover(true)}} 
        onMouseLeave={()=>{setOnHover(false)}}
        sx={{
          width: {xl: 350, lg: 300, md: 300, sm: 320, xs: 280},
          height: {xl: 350, lg: 300,  md: 300, sm: 320, xs: 280},
          backgroundColor: blueGrey[50],
          cursor: 'pointer'
        }}
        onClick={()=>{goToPost(postInfo.id)}}
        >
          <LazyLoadImage
          style={{ objectFit: 'cover',  opacity: `${onHover ? '0.7' : '1'}`}}
          effect="blur"
          height={'100%'}
          width={'100%'}
          src={[postInfo.imgUrl]} />
        </Box>
        <Box 
       sx={{
        position:'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: onHover ? 1:0
       }}
      >
        More
      </Box>
      </Box>
      <Box sx={{ textAlign: '-webkit-center' }} mt={1}>
       <PostTag tag={postInfo.tag}/>
      </Box>
      <Box mt={1} sx={{ fontFamily: "'EB Garamond', serif" }} >
        {postInfo.title}
      </Box>
      <Box mt={1} sx={{ textAlign: '-webkit-center'}}>
        <hr style={{ width:'10%'}}></hr>
      </Box>
      <Box mt={1} sx={{ fontFamily: "'EB Garamond', serif" , color: blueGrey[600], fontSize: '0.8rem'}}>
        {(postInfo.date)}
      </Box>

      

    </Box>
  )
}
