import { Box, Typography } from '@mui/material';
import React from 'react'
import { blueGrey } from "@mui/material/colors"
import moment from 'moment';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism'


export default function Article({postDetail}) {
  //let { articleId } = useParams();
  const {content, tag, title, time} = postDetail

  return (
      <Box>
      <Box
        sx={{textAlign:'center' }}
        ml={{ xl: 40, lg: 20, md: 20, sm: 15, xs: 5 }}
        mr={{ xl: 40, lg: 20, md: 20, sm: 15, xs: 5 }}
      >
        <Box
          mt={'10px'}
        >
          <Box >
          <Typography variant="h3" component="div" gutterBottom sx={{ fontFamily: "'Manrope', serif", fontSize: '2.5rem', fontWeight: 600, color: blueGrey[800], }}>
            {title}
          </Typography>
          </Box>
          <Box>
          <Typography variant="h6" component="div" gutterBottom sx={{ fontFamily: "'EB Garamond', serif", color: blueGrey[800], mt: 1 }}>
            Posted on {moment(time.seconds*1000).format('YYYY-MM-DD')}
          </Typography>

          </Box>
        </Box>

        <ReactMarkdown
        children={content}
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
  
  )
}
