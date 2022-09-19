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
  const [postDetails, setPostDetails] = useState({post_id: '', tags:[], title:'', tempTag: '', imageUrl: ''});

  useEffect(()=>{
    initPage()
  }, [])

  

  const initPage = () => {
    getLastestBlogId().then(b_id => {
      setPostDetails({...postDetails, post_id: b_id + 1})
    })

    setValue('')
    setPostDetails({post_id: '', tags:[], title:'', tempTag: '', imageUrl: ''})
  }

  const uploadBlog = () => {
    writeNewBlog(
      postDetails.post_id,
      value,
      postDetails.imageUrl,
      postDetails.tags[0],
      postDetails.title
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
            <Box flex={0.1}>Post Title :</Box>
            <Box flex={0.9}><TextField id="outlined-basic" value={postDetails.post_title} variant="outlined" sx={{width: '80%'}} onChange={(e)=>{setPostDetails({...postDetails, title: e.target.value})}}/></Box>
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
      
    <Box display={'flex'} flex={"row"}>
      <Box flex={0.4} padding={5}>
      <MDToolBar setValue={setValue}/>
      <TextField
          id="outlined-multiline-static"
          multiline
          rows={30}
          sx={{width:'100%'}}
          onChange={(e)=>{setValue(e.target.value)}}
        />
      </Box>
      <Box flex={0.6}>
      <ReactMarkdown
        children={value}
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={nord}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
          img:({node,...props})=><img style={{maxWidth:'100%', }}{...props}/>
        }}
      />

      </Box>
    </Box>

    <Box textAlign={"center"}>
      <Button variant="contained" color="success" onClick={()=>{uploadBlog()}}>Upload</Button>
    </Box>

    
    </Box>


  )
}