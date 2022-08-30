import { Divider, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import profilepic from '../img/profilepic.jpg'
import Fade from '@mui/material/Fade';
import { useSpring, animated, easings } from "react-spring";
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';


export default function About() {

    const [showGrow, setShowGrow] = useState(false)
    const [showEmail, setShowEmail] = useState(false)
    const [picLoaded, setPicLoaded] = useState(false)

    const AnimatedBox = animated(Box)
    const AnimatedText = animated(Typography)

    const showImageAnim = useSpring({
        loop: false,
        from: {opacity: 0, y: 200},
        to: {opacity: 1, y: 0},
        config: {
            duration: 2000,
            easing:easings.easeInOutQuart
        }
    })


    const firstP = (
    <Box >
        <Box overflow="hidden"  >
        <AnimatedText style={picLoaded ? { ...showImageAnim} : {}} variant='body1' sx={{fontFamily: "'Manrope', serif", fontWeight:600 , fontSize: '2rem'}}>
            Alan Wong, Hong Kong based.
        </AnimatedText>
        </Box>
        <Box  overflow="hidden"  >
        <AnimatedText style={picLoaded ? { ...showImageAnim} : {}} variant='body1' pt={2} sx={{fontFamily: "'Manrope', serif", fontWeight:600 , fontSize: '2rem'} }>
            A full stack programmer,
        </AnimatedText>
        </Box>
        <Box  overflow="hidden"  >
        <AnimatedText style={picLoaded ? { ...showImageAnim} : {}} variant='body1' pt={2} sx={{fontFamily: "'Manrope', serif", fontWeight:600 , fontSize: '2rem'}}>
            A music, moive, photography lover.
        </AnimatedText>
        </Box>

    </Box>
    )

    const basedP = (
        <Box>
            <Divider />
            <Box display="flex" flexDirection={"row"} >
                <Box>
                    <IconButton onClick={() => window.open("https://www.instagram.com/stillaw/", "_blank")}>
                        <InstagramIcon />
                    </IconButton>
                </Box>
                <Box>
                    <IconButton onClick={() => window.open("https://www.linkedin.com/in/ho-nam-wong-12a0441b5", "_blank")}>
                        <LinkedInIcon />
                    </IconButton>
                </Box>
                <Box>
                    <IconButton onClick={() => { setShowEmail(!showEmail) }}>
                        <EmailIcon />
                    </IconButton>

                    <Fade in={showEmail}>

                                <Box display={'inline-block'} pl={2}>
                                    alanwong9179@gmail.com
                                </Box>
                 
                        

                    </Fade>
                </Box>
            </Box>
        </Box>
    )


    return (
        <>
            <Box display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }} >
                <Box display={"flex"} flexDirection={"row"} mt={1} pt={2} sx={{overflow:'hidden'}}>
                    <AnimatedBox flex={1} style={picLoaded ? { ...showImageAnim} : {}}>
                        <LazyLoadImage
                            style={{ objectFit: 'cover' }}
                            effect="blur"
                            height={500}
                            afterLoad={() => { setShowGrow(true) 
                                setPicLoaded(true) }}
                            src={[profilepic]} />
                    </AnimatedBox>
                    <Box display={"flex"} flex={1} flexDirection={"column"}>
                        <Box flex={1}>
                            <Fade in={showGrow} {...(showGrow ? { timeout: 1000 } : {})}>
                                {firstP}
                            </Fade>
                        </Box>
                        <Box>
                            <Fade in={showGrow} {...(showGrow ? { timeout: 2000 } : {})}>
                                {basedP}
                            </Fade>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none' }} >
                <Box display={"flex"} flexDirection={"column"} mt={1} >
                    <AnimatedBox flex={1} textAlign="center" style={picLoaded ? { ...showImageAnim} : {}}>
                        <LazyLoadImage
                            style={{ objectFit: 'cover' }}
                            effect="blur"
                            height={300}
                            afterLoad={() => { setShowGrow(true) 
                                setPicLoaded(true) }}
                            src={[profilepic]} />
                    </AnimatedBox>
                    <Box display={"flex"} flex={1} flexDirection={"column"} pt={5}>
                        <Box flex={1}>
                            <Fade in={showGrow} {...(showGrow ? { timeout: 1000 } : {})}>
                                {firstP}
                            </Fade>
                        </Box>
                        <Box pt={5}>
                            <Fade in={showGrow} {...(showGrow ? { timeout: 2000 } : {})}>
                                {basedP}
                            </Fade>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>

    )
}