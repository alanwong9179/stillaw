import { Box } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom'

const postInfo = {
    id: '1',
    time:'2022-06-09' ,
    tag:'BUGS', 
    title:'Why couldnt she understand that? She knew hed completely changed his life around her eating habits', 
    imgUrl: 'https://drive.google.com/u/0/uc?id=1HwrG3WjNLqNNwwo2p3NleP7v5KAOR8vP&export=download'}

export default function Article() {
    let { articleId } = useParams();

  return (
    <Box>
        <Box sx={{ fontFamily: "'EB Garamond', serif" }}>  
            {postInfo.title}
        </Box>
    </Box>
  )
}
