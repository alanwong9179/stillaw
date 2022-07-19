import { useState } from 'react'
import { Box } from '@mui/material'
import MainHeader from './screen/MainHeader'
import PostList from './screen/PostList'
import { Routes, Route } from 'react-router-dom'
import NotFound from './screen/NotFound'
import Article from './screen/Article'
import { useLocation } from 'react-router-dom'

function App() {
  const currentRoute = useLocation().pathname;
  const articlePage = currentRoute.includes('article')
  return (
    <Box
      mt={articlePage ? 0 : 5}
      ml={{ xl: articlePage ? 0 : 40 , lg: articlePage ? 0 : 20, md: articlePage ? 0 : 20, sm: articlePage ? 0 : 15, xs: articlePage ? 0 : 5 }}
      mr={{ xl: articlePage ? 0 : 40 , lg: articlePage ? 0 : 20, md: articlePage ? 0 : 20, sm: articlePage ? 0 : 15, xs: articlePage ? 0 : 5 }}
    >
      <Box sx={{display: articlePage ? 'none' : 'block'}}>
        <MainHeader />
      </Box>
      <Box mt={ articlePage ? 0 : 6}>
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
