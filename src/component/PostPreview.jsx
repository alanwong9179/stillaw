import { Box } from '@mui/system'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { blueGrey } from "@mui/material/colors"
import { Divider } from '@mui/material';

export default function PostPreview({ postInfo }) {
  return (
    <Box>
      <Box >
        <LazyLoadImage
          style={{ objectFit: 'cover' }}
          effect="blur"
          height={'100%'}
          width={'100%'}
          src={[postInfo.imgUrl]} />
      </Box>
      <Box sx={{ textAlign: '-webkit-center' }} mt={1}>
        <Box sx={{ width: 'fit-content', backgroundColor: blueGrey[600], color: '#fff', borderRadius: '4px', padding: '1px 5px' }}>{postInfo.tag}</Box>
      </Box>
      <Box mt={1} sx={{ fontFamily: "'EB Garamond', serif" }} >
        {postInfo.title}
      </Box>
      <Box mt={1} sx={{ textAlign: '-webkit-center'}}>
        <hr style={{ width:'10%'}}></hr>
      </Box>
      <Box mt={1} sx={{ fontFamily: "'EB Garamond', serif" }}>
        {postInfo.time}
      </Box>

    </Box>
  )
}
