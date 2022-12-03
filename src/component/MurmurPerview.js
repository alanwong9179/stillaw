import React from 'react'
import { motion } from 'framer-motion'
import { Box } from '@mui/system'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import "react-lazy-load-image-component/src/effects/blur.css";
import PostTag from './PostTag';
import { Paper } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";


export default function MurmurPerview({postInfo}) {

    const {date, id, imgUrl, page, tag, time, title} = postInfo
    
    const navigate = useNavigate();
    const goToPost = (id) => {
        navigate(`/murmur/${id}`, {state: {page: page}});
      };

  return (
   <motion.div
    whileHover={{y: -5}}
   >
    <Paper elevation={3} onClick={()=>{goToPost(id)}} sx={{cursor:'pointer'}} >
        <Box sx={{display:'flex', flexDirection:'row'}}>
            <Box flex={1}>
            <LazyLoadImage
            style={{
              objectFit: "cover",
              borderRadius: "0px",
              aspectRatio: "1/1",
            }}
            effect="blur"
            height={"100%"}
            width={"100%"}
            afterLoad={() => {
           //   setLoaded(true);
            }}
            src={[imgUrl]}
          />
            </Box>
            <Box flex={3} sx={{display:'flex', flexDirection:'column', alignItems:'flex-start', ml: 2, p: 1}}>
               
                <Box flex={1} fontSize={'1.2rem'} fontWeight={"bold"} color={blueGrey[900]}>{title}</Box>
                <Box flex={1}><PostTag tag={tag}/></Box>
                <Box sx={{alignSelf:'flex-end', fontSize:'0.5rem', color:blueGrey[700]}}>{date} {time}</Box>
              
            </Box>
        </Box>
    </Paper>
   </motion.div>
  )
}
