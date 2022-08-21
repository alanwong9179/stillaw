import { Grid } from '@mui/material'
import React, {useState, useEffect} from 'react'
import PostPreview from '../component/PostPreview'
import { getBlogs } from '../functions/selectDb'

const arr = ["","","","","","","","","",]

    const postInfo = {
    id: '1',
    time:'2022-06-09' ,
    tag:'BUGS', 
    title:'Why couldnt she understand that? She knew hed completely changed his life around her eating habits', 
    imgUrl: 'https://drive.google.com/u/0/uc?id=1HwrG3WjNLqNNwwo2p3NleP7v5KAOR8vP&export=download'}

export default function PostList() {
  const [posts, setposts] = useState([]);

  /*get post list */
  useEffect(()=>{
    getBlogs().then(blogs => {
      console.log(blogs)
      setposts(blogs)
    })
  },[])

  return (
    <Grid container rowSpacing={4} justifyContent={"space-around"}>
        {
        posts.length > 0 &&
        posts.map(i => (
        <Grid id={i.id} item sx={{textAlign:'center'}} xs={12} sm={12} md={6} lg={4} xl={4}>
        <PostPreview postInfo={i}/>
        </Grid>
        ))
        }
      
    </Grid>
  )
}
