import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import MainHeader from './screen/MainHeader'
import PostList from './screen/PostList'
import { Routes, Route } from 'react-router-dom'
import NotFound from './screen/NotFound'
import Article from './screen/Article'
import { useLocation } from 'react-router-dom'
import { useScrollDirection } from 'react-use-scroll-direction';
import { animated, useSpring } from 'react-spring'
import useMeasure from 'react-use-measure'

function App() {
  const currentRoute = useLocation().pathname;
  const articlePage = currentRoute.includes('article')
  const { isScrollingUp, isScrollingDown } = useScrollDirection()
  const [ref, bounds] = useMeasure()

  const AnimatedBox = animated(Box)

  const [moveHeader, onMoveHeader] = useSpring(()=>({
    loop: false,
    from: { y: -73,},
    to: {  y: 0,},
  }))

  useEffect(() => {
    isScrollingDown ?
    onMoveHeader.start({
      from :{
        y:  `-${bounds.height}px`
      },
      to: {
        y: 0 
      }
     // transform: `translateY(-${bounds.height}px)`
    })
    :
    isScrollingUp ?
    onMoveHeader.start({
      from :{
        y: 0 
      },
      to: {
        y:  `-${bounds.height}px`

      }
     // transform: `translateY(-${bounds.height}px)`
    })
    :
    null

  }, [isScrollingUp, isScrollingDown])
  

  console.log(isScrollingDown)

  return (
    <Box
   //   mt={articlePage ? 0 : 5}
  //    ml={{ xl: articlePage ? 0 : 40 , lg: articlePage ? 0 : 20, md: articlePage ? 0 : 20, sm: articlePage ? 0 : 15, xs: articlePage ? 0 : 5 }}
   //   mr={{ xl: articlePage ? 0 : 40 , lg: articlePage ? 0 : 20, md: articlePage ? 0 : 20, sm: articlePage ? 0 : 15, xs: articlePage ? 0 : 5 }}
  
    >
      <AnimatedBox 
      sx={{display: articlePage ? 'block' : 'block', backgroundColor:'#2200FF',zIndex:10, position:'fixed', top: 0, right: 0, left:0}} 
      pt={3}
      pb={2}
      pl={{ xl: 40 , lg: 20, md: 20, sm: 15, xs: 5 }}
      pr={{ xl: 40 , lg: 20, md: 20, sm: 15, xs: 5 }}
      style={{...moveHeader}}
      ref={ref}
      >
        <MainHeader />
      </AnimatedBox>
      <Box 
      mt={ articlePage ? 0 : 6}
      ml={{ xl: 40 , lg: 20, md: 20, sm: 15, xs: 5 }}
      mr={{ xl: 40 , lg: 20, md: 20, sm: 15, xs: 5 }}
      >
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/home" element={<PostList />} />
          <Route path="/article/:articleId" element={<Article />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default App
