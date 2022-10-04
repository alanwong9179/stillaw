import { Grid } from '@mui/material'
import React, { useState, useEffect } from 'react'
import PostPreview from '../component/PostPreview'
import { getBlogs } from '../functions/selectDb'
import PostDetailContainer from '../component/PostDetailContainer'
import Pagination from "@mui/material/Pagination";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom'

export default function PostList() {
  const [posts, setposts] = useState([]);
  const [selectedPost, setSelectedPost] = useState('')
  const [pageCount, setPageCount] = useState(1)
  const { page } = useParams();
  const loc = useLocation();

  /*get post list */
  useEffect(() => {
    console.log(loc)
    if (page === undefined) {
      //navigate(`/home/1`);
      window.location.href = window.location.href + 'home/1'
    }else{
      getBlogs().then(blogs => {
        let pageApply = 1
        for (let b = 0; b < blogs.length; b++) {
          if (b % 9 === 0 && b !== 0) {
            pageApply++
          }
          blogs[b].page = pageApply
        }
        setPageCount(
          parseInt((blogs.length / 9).toFixed(0))
        )
        setposts(blogs)
      })
    }

  }, [])

  return (
    <>
      <Grid container rowSpacing={4} justifyContent={"left"} pt={1} >
        {
          posts.length > 0 &&
          posts.map((i, index) => (
            i.page.toString() === (page || 1 ) &&
            <Grid key={index} item sx={{ textAlign: 'center' }} xs={12} sm={12} md={6} lg={4} xl={4}>
              <PostPreview postInfo={i} setSelectedPost={setSelectedPost} />
            </Grid>
          ))
        }
      </Grid>
    
      {
         posts.length > 0 &&
         <Pagination
         sx={{
           'ul': {
             justifyContent: 'center',
             'button': { fontFamily: "'Manrope', serif" }
           },
           mt: 5
         }}
         count={pageCount} shape="rounded" page={parseInt(page)} />

      }
       <PostDetailContainer selectedPost={selectedPost} setSelectedPost={setSelectedPost} />
    </>

  )
}
