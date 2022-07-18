import { Grid } from '@mui/material'
import React from 'react'
import PostPreview from '../component/PostPreview'

const arr = ["","","","","","","","","",]

    const postInfo = {
    id: '001',
    time:'2022-06-09' ,
    tag:'BUGS', 
    title:'Why couldnt she understand that? She knew hed completely changed his life around her eating habits', 
    imgUrl: 'https://drive.google.com/u/0/uc?id=1HwrG3WjNLqNNwwo2p3NleP7v5KAOR8vP&export=download'}

export default function PostList() {
  return (
    <Grid container spacing={3}>
        {arr.map(i => (
        <Grid id={i} item sx={{textAlign:'center'}} xs={12} sm={12} md={6} lg={4} xl={4}>
        <PostPreview postInfo={postInfo}/>
        </Grid>
        ))}
      
    </Grid>
  )
}
