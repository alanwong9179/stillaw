import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { blueGrey } from "@mui/material/colors"
import moment from 'moment';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism'
import '../css/md.css'
import { useParams } from 'react-router-dom';
import { getPostDetails } from '../functions/selectDb';
import raw from 'raw.macro'
import { motion } from 'framer-motion';


export default function Article() {
  let { articleId } = useParams();
  const [postDetails, setPostDetails] = useState([])
  const [mdContent, setMdContent] = useState('')


  useEffect(() => {
    getPostDetails(articleId).then(pDetail => {
      setPostDetails(pDetail)
      let name = pDetail.key
      setMdContent(raw(`../posts/${name}.md`))
    })
  }, [])

  return (
    <motion.div key="articlepage" initial={{ opacity: 0}} animate={{ opacity: 1}} exit={{ opacity: 0}}  transition={{ duration: 0.4 }}>
      <Box
        sx={{ textAlign: 'center' }}
        ml={{ xl: 15, lg: 10, md: 5, sm: 2, xs: 0 }}
        mr={{ xl: 15, lg: 10, md: 5, sm: 2, xs: 0 }}>
        <Box mt={'10px'}>
          <Box>
            <Typography variant="h6" component="div" gutterBottom sx={{ fontFamily: "'EB Garamond', serif", color: blueGrey[800], mt: 1 }}>
              {
                postDetails.time !== undefined &&
                `Posted on ${moment.unix(postDetails.time.seconds).format('YYYY-MM-DD HH:mm:ss')}`
              }
            </Typography>
          </Box>
        </Box>
        <Box textAlign={'left'}>
          <ReactMarkdown
            children={mdContent}
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    style={xonokai}
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
              img: ({ node, ...props }) => <img style={{ maxWidth: '100%', }}{...props} />
            }}
          />
        </Box>
      </Box>
    </motion.div>

  )
}
