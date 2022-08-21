import { Divider, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import profilepic from '../img/profilepic.jpg'
import Grow from '@mui/material/Grow';
import Fade from '@mui/material/Fade';

import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import Slide from '@mui/material/Slide';


export default function About() {

    const [showGrow, setShowGrow] = useState(false)

    const introArr = [

        "A music lover",
        "A movie lover",

    ]

    const firstP = (<Box>
        <Typography variant='body1'>
            Alan Wong, Hong Kong based.
        </Typography>
        <Typography variant='body1' pt={2}>
            A full stack programmer,
        </Typography>
        <Typography variant='body1' pt={2}>
            A music, moive, photography lover.
        </Typography>
    </Box>)

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
                    <IconButton>
                        <EmailIcon />
                    </IconButton>
                    <Box display={"inline-block"}>
                        alanwong9179@gmail.com
                    </Box>
                </Box>
            </Box>
        </Box>
    )


    return (
        <>
            <Box display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }} >
                <Box display={"flex"} flexDirection={"row"} pt={5}>
                    <Box flex={1}>
                        <LazyLoadImage
                            style={{ objectFit: 'cover' }}
                            effect="blur"
                            height={500}
                            afterLoad={() => { setShowGrow(true) }}
                            src={[profilepic]} />
                    </Box>
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
                <Box display={"flex"} flexDirection={"column"} pt={5} >
                    <Box flex={1} textAlign="center">
                        <LazyLoadImage
                            style={{ objectFit: 'cover' }}
                            effect="blur"
                            height={400}
                            afterLoad={() => { setShowGrow(true) }}
                            src={[profilepic]} />
                    </Box>
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