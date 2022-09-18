import { Grid } from '@mui/material'
import React, { useState, useEffect } from 'react'
import PostPreview from '../component/PostPreview'
import { getBlogs } from '../functions/selectDb'
import PostDetailContainer from '../component/PostDetailContainer'

export default function PostList() {
  const [posts, setposts] = useState([]);
  const [selectedPost, setSelectedPost] = useState('')

  useEffect(()=>{
    console.log(selectedPost)
  },[selectedPost])

  /*get post list */
  useEffect(() => {
    getBlogs().then(blogs => {
      console.log(blogs)
      setposts(blogs)
    })
  }, [])

  return (
    <>
    <Grid container rowSpacing={4} justifyContent={"left"} pt={1}>
      {
        posts.length > 0 &&
        posts.map((i, index)=> (
          <Grid key={index} item sx={{ textAlign: 'center' }} xs={12} sm={12} md={6} lg={4} xl={4}>
            <PostPreview postInfo={i} setSelectedPost={setSelectedPost}/>
          </Grid>
        ))
      }

    </Grid>

    <PostDetailContainer selectedPost={selectedPost} setSelectedPost={setSelectedPost}/>
    </>

  )
}
