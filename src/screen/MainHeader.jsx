import React from 'react'
import { Box } from '@mui/system'
import { Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import { blueGrey, grey } from "@mui/material/colors"
import { useSpring, animated } from "react-spring";
import Divider from '@mui/material/Divider';
import { useState, useEffect } from 'react'


const RightLink = ({locName, setHoverCheck, hoverCheck}) => {

    const StyledDivider = animated(Divider)
    const isHovered = locName === hoverCheck
    const [showBar, onShowBar] = useSpring(() =>({ 
        marginLeft: '50%',
        marginRight: '50%',
        opacity: 0
    }))

    useEffect(() => {
     onShowBar.start({  
        marginLeft:  isHovered ? '0%' : '50%',
        marginRight: isHovered ? '0%' : '50%',
        opacity:isHovered ? 1 : 0,
    })

    }, [hoverCheck])
    
    return (
        <Box sx={{fontFamily:"'EB Garamond', serif"}} onMouseEnter={()=>{setHoverCheck(locName)}} onMouseLeave={()=>{setHoverCheck()}}>
            <Link style={{textDecoration: 'none', color:blueGrey[isHovered ? 500:300]}} to={`/${locName.toLowerCase()}`}>
                {locName.toUpperCase()}
            </Link>
            <StyledDivider sx={{backgroundColor:blueGrey[300], }} style={{ ...showBar}}/>
        </Box>
    )
}

export default function MainHeader() {
    const [hoverCheck, setHoverCheck] = useState();


  return (
    <Box display="flex" flexDirection="row" >
        <Box sx={{fontFamily:"'EB Garamond', serif", fontSize:'2rem'}} flex={1} >
            Still. aw
        </Box>
        <Box>
            <Stack direction="row" spacing={2}>
                <RightLink locName={"home"} setHoverCheck={setHoverCheck} hoverCheck={hoverCheck}/>
                <RightLink locName={"about"} setHoverCheck={setHoverCheck} hoverCheck={hoverCheck}/>
                <RightLink locName={"works"} setHoverCheck={setHoverCheck} hoverCheck={hoverCheck}/>

               
            </Stack>
        </Box>
    </Box>

  )
}
