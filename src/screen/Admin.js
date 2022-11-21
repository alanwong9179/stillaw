import { Box } from '@mui/system'
import React, {useState, useEffect} from 'react'
import { writeNewBlog } from '../functions/insertDb'
import getMd from '../functions/selectMd'

export default function Admin() {
    const [info, setInfo] = useState({blogId: '', coverImageUrl: '', tag: '', key: '', title: ''})

    const onWrite = () => {
        const {blogId, coverImageUrl, tag, key, title} = info

        writeNewBlog(blogId, coverImageUrl, tag, key, title)
    }

    


  return (
    <Box>
        <Box m={2}>blog id: <input type={"text"} onChange={(e)=>{setInfo({...info, blogId: e.target.value})}}/></Box>
        <Box m={2}>cover: <input type={"text"} onChange={(e)=>{setInfo({...info, coverImageUrl: e.target.value})}}/></Box>
        <Box m={2}>tag: <input type={"text"} onChange={(e)=>{setInfo({...info, tag: e.target.value})}}/></Box>
        <Box m={2}>key: <input type={"text"} onChange={(e)=>{setInfo({...info, key: e.target.value})}}/></Box>
        <Box m={2}>title: <input type={"text"} onChange={(e)=>{setInfo({...info, title: e.target.value})}}/></Box>
        <Box m={2}><button onClick={()=>{onWrite()}}>submit</button></Box>
    </Box>
  )
}
