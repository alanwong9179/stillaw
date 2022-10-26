import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { blueGrey } from "@mui/material/colors"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Button } from '@mui/material';
import { getLastestBlogId } from '../functions/selectDb';
import {writeNewBlog} from '../functions/insertDb';
const MDToolBar = (props) => {

  return(
    <Box display={'flex'} flexDirection={'row'}>
      <Box ><Button>IMG</Button></Box>
    </Box>
  )
}

export const Admin = () => {
 
  const [value, setValue] = useState('');
  const [postDetails, setPostDetails] = useState({post_id: '', tags:[], key:'', tempTag: '', imageUrl: ''});

  useEffect(()=>{
    initPage()
  }, [])

  

  const initPage = () => {
    getLastestBlogId().then(b_id => {
      setPostDetails({...postDetails, post_id: b_id + 1})
    })

    setValue('')
    setPostDetails({post_id: '', tags:[], key:'', tempTag: '', imageUrl: ''})
  }

  const uploadBlog = () => {
    writeNewBlog(
      postDetails.post_id,
      value,
      postDetails.imageUrl,
      postDetails.tags[0],
      postDetails.key
    ).then(res =>{
      if (res) {
        initPage()
      }
      else {
        alert('failed')
      }
    })
  }

  return (
    <Box>

      <Box display={'flex'} flexDirection={'column'} p={5}>
        <Box  display={'flex'} flexDirection={'row'} alignItems={"center"}>
            <Box flex={0.1}>Post ID :</Box>
            <Box flex={0.9}><TextField  InputProps={{readOnly: true}} id="outlined-basic" variant="outlined" sx={{width: '80%'}} value={postDetails.post_id}/></Box>
        </Box>
        <Box  display={'flex'} flexDirection={'row'} alignItems={"center"} mt={1}>
            <Box flex={0.1}>Post Key :</Box>
            <Box flex={0.9}><TextField id="outlined-basic" value={postDetails.key} variant="outlined" sx={{width: '80%'}} onChange={(e)=>{setPostDetails({...postDetails, key: e.target.value})}}/></Box>
        </Box>
        <Box  display={'flex'} flexDirection={'row'} alignItems={"center"} mt={1}>
            <Box flex={0.1}>Image Url :</Box>
            <Box flex={0.9}><TextField id="outlined-basic" variant="outlined" sx={{width: '80%'}} onChange={(e)=>{setPostDetails({...postDetails, imageUrl: e.target.value})}}/></Box>
        </Box>
        <Box  display={'flex'} flexDirection={'row'} alignItems={"center"} mt={1}>
            <Box flex={0.1}>Post Tags :</Box>
            <Box flex={0.9}><TextField id="outlined-basic" value={postDetails.tempTag} variant="outlined" sx={{width: '80%'}} onKeyPress={(e)=>{
              if(e.key === "Enter"){
                let tags = postDetails.tags
                tags.push(postDetails.tempTag)
                setPostDetails({...postDetails, post_tags: tags, tempTag: ''})
              }
            }} onChange={(e)=>{setPostDetails({...postDetails, tempTag: e.target.value})}}/></Box>
        </Box>
        <Box>
          {
          postDetails.tags.map(t => (
            <Box sx={{backgroundColor:blueGrey[500], width:'min-content', display:'inline-block', m: 1, pt: 0.5, pb:0.5, pl: 1, pr: 1, borderRadius: 1.5}} >{t}</Box>
          ))
          }
        </Box>
       
      </Box>
  
    <Box textAlign={"center"}>
      <Button variant="contained" color="success" onClick={()=>{uploadBlog()}}>Upload</Button>
    </Box>

    
    </Box>


  )
}