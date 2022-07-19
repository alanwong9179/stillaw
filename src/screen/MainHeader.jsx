import React from 'react'
import { Box } from '@mui/system'
import { IconButton, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import { blueGrey } from "@mui/material/colors"
import { useSpring, animated } from "react-spring";
import Divider from '@mui/material/Divider';
import { useState, useEffect } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import useMeasure from 'react-use-measure'


const RightLink = ({locName, setHoverCheck, hoverCheck, setShowNav}) => {
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
            <Link style={{textDecoration: 'none', color:blueGrey[isHovered ? 500:300]}} to={`/${locName.toLowerCase()}`} onClick={()=>{setShowNav(false)}}>
                {locName.toUpperCase()}
            </Link>
            <StyledDivider sx={{backgroundColor:blueGrey[300], }} style={{ ...showBar}}/>
        </Box>
    )
}

export default function MainHeader() {
    const [hoverCheck, setHoverCheck] = useState();
    const AnimatedIconButton = animated(IconButton);
    const [showNav, setShowNav] = useState(false);
    
    const navProps = useSpring({transform: `translateX(${showNav? '20' : '0'}px)`, opacity: showNav ? 1 : 0});
    const closePros = useSpring({opacity: showNav ? 0 : 1});

    const AnimatedStack = animated(Stack);
    const dropMenuProps = useSpring({
        height: showNav ? 75 : 0, 
        opacity: showNav ? 1 : 0,
        config:{friction: 18}
        })

    

  return (
    <Box> 
    <Box display="flex" flexDirection="row" >
        <Box sx={{fontFamily:"'EB Garamond', serif", fontSize:'2rem'}} flex={1} >
            Still. aw
        </Box>

        <Box display={{xs:'none', sm: 'none', md:'block', lg:'block', xl:'block'}}>
            <Stack direction="row" spacing={2}>
                <RightLink locName={"home"} setHoverCheck={setHoverCheck} hoverCheck={hoverCheck}/>
                <RightLink locName={"about"} setHoverCheck={setHoverCheck} hoverCheck={hoverCheck}/>
                <RightLink locName={"works"} setHoverCheck={setHoverCheck} hoverCheck={hoverCheck}/>
            </Stack>
        </Box>

        <Box display={{xs:'block', sm: 'block', md:'none', lg:'none', xl:'none'}}>

            <AnimatedIconButton sx={{padding: 0}} onClick={()=>{setShowNav(!showNav)}} style={{...navProps}}>
                <CloseIcon /> 
            </AnimatedIconButton>

            <AnimatedIconButton sx={{padding: 0}} onClick={()=>{setShowNav(!showNav)}} style={{...closePros}}>
                <MenuIcon /> 
            </AnimatedIconButton>
        </Box>
    </Box>
    <Box mt={1}>
        <AnimatedStack sx={{textAlign:'center', overflow:'hidden'}} style={{...dropMenuProps}}>
                <RightLink locName={"home"} setHoverCheck={setHoverCheck} hoverCheck={hoverCheck} setShowNav={setShowNav} />
                <RightLink locName={"about"} setHoverCheck={setHoverCheck} hoverCheck={hoverCheck} setShowNav={setShowNav} />
                <RightLink locName={"works"} setHoverCheck={setHoverCheck} hoverCheck={hoverCheck} setShowNav={setShowNav} />
        </AnimatedStack>
    </Box>

    </Box>
  )
}
