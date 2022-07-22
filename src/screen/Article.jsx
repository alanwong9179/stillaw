import { Box, Typography } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom'
import { blueGrey } from "@mui/material/colors"
import PostTag from '../component/PostTag';
import moment from 'moment';

const postInfo = {
  id: '1',
  time: '2022-06-09',
  tag: 'BUGS',
  title: '[Node.js] MySQL with Promise 處理非同理問題',
  imgUrl: 'https://drive.google.com/u/0/uc?id=1HwrG3WjNLqNNwwo2p3NleP7v5KAOR8vP&export=download',
  content: '<div style="height: 1000px">123</div>'
}

export default function Article() {
  let { articleId } = useParams();

  return (
    <Box>
      <Box
        mt={5}
     //   ml={{ xl: 40, lg: 20, md: 20, sm: 15, xs: 5 }}
       // mr={{ xl: 40, lg: 20, md: 20, sm: 15, xs: 5 }}
      >
        <Typography variant="h3" component="div" gutterBottom sx={{ fontFamily: "'Noto Sans HK', sans-serif", fontSize: '2.5rem', fontWeight: 600, color: blueGrey[800]}}>
          {postInfo.title}
        </Typography>
        <PostTag tag={postInfo.tag}/>
        <Typography variant="h6" component="div" gutterBottom sx={{ fontFamily: "'EB Garamond', serif", color: blueGrey[800], mt: 1}}>
          Post on {moment(postInfo.time).format('DD MMM YYYY')}
        </Typography>

        <Box dangerouslySetInnerHTML={{__html: postInfo.content}} />
      </Box>

    </Box>
  )
}
