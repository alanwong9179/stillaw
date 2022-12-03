import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { writeNewBlog, writeNewMurmur } from "../functions/insertDb";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, orange, grey } from "@mui/material/colors";
import { ThemeContext } from "@emotion/react";
import { Button, Divider, Grid, TextField } from "@mui/material";
import { getLastestBlogId, getMurId } from "../functions/selectDb";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { twilight } from "react-syntax-highlighter/dist/esm/styles/prism";
import "../css/md.css";
import rehypeRaw from "rehype-raw";
import {uploadMd, uploadImage } from "../functions/uploadDb";
import { getImageLink } from "../functions/selectMd";
import LoadingAdmin from "./LoadingAdmin";

const adminTheme = createTheme({
  palette: {
    primary: {
      main: orange[500],
      light: orange[400],
      dark: orange[600],
    },
    secondary:{
      main: grey[500],
      light: grey[400],
      dark: grey[600],
    }
  },
});

export default function Admin() {
  const [info, setInfo] = useState({
    blogId: "",
    coverImageUrl: "",
    tag: "",
    key: "",
    title: "",
  });
  const [auth, setAuth] = useState(false);
  const [type, setType] = useState(1); //0 = murmur , 1 = blog
  const [blogMd, setBlogMd] = useState("");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (type === 0) {
      getMurId().then((murId) => {
        setInfo({
          blogId: murId,
          coverImageUrl: "",
          tag: "",
          key: "",
          title: "",
        });
      });
    } else {
      getLastestBlogId().then((blogId) => {
        setInfo({
          blogId: blogId,
          coverImageUrl: "",
          tag: "",
          key: "",
          title: "",
        });
      });
    }
  }, [type]);

  useEffect(() => {
    setAuth(true);
  }, []);

  const onUpload = (markdownFile) => {
    setLoading(true)
    uploadMd(`/${type === 0 ? 'MurMur' : 'Blogs'}/${info.key}.md`, markdownFile).then(md => {
      console.log(md)
      onWrite()
    })
  }
  const onWrite = () => {
    const { blogId, coverImageUrl, tag, key, title } = info;
    type === 0 ? 
    writeNewMurmur(blogId, coverImageUrl, tag, key, title).then(f => {setLoading(false)})
    :
    writeNewBlog(blogId, coverImageUrl, tag, key, title).then(f => {setLoading(false)})

  };

  const addImage = async (file) => {
    setLoading(true)
    let imagePath = `/${info.key}/${file.name}`;
    uploadImage(imagePath, file).then(img => {
      if (img){
        getImageLink(imagePath).then(path => {
          setBlogMd(blogMd + `\n<br>[<img src="${path}" width="400"/>](${path})<div style="color:#000000ad">image desc......</div>`)
          setLoading(false)
        })
      }
    })

  };

  const addBanner = async (file) => {
    setLoading(true)
    let imagePath = `/${info.key}/${file.name}`;
    uploadImage(imagePath, file).then(img => {
      if (img){
        getImageLink(imagePath).then(path => {
          setInfo({ ...info, coverImageUrl: path });
          setLoading(false)
        })
      }
    })
  }

  const UploadBanner = () => {
    return (
      <Button  variant="contained"   sx={{ color: "#FFF" }} component="label">
          <input
              type="file"
              name="myUploadFile"
              onChange={(e) => {
                e.target.files[0] !== null &&
                addBanner(e.target.files[0]);
              }}
              hidden
            />
        Upload
      </Button>
    )
  }

  return auth ? (
    <ThemeProvider theme={adminTheme}>
      <Box>
        <Box sx={{ width: "100%", textAlign: "right" }}>
          <Button
            variant="contained"
            color={type===0? 'primary':'secondary'}
            sx={{ color: "#FFF" }}
            onClick={() => {
              setType(0);
            }}
          >
           MurMur
          </Button>
          <Button
            variant="contained"
            color={type===1? 'primary':'secondary'}
            sx={{ color: "#FFF", ml: 2 }}
            onClick={() => {
              setType(1);
            }}
          >
            Blog
          </Button>
        </Box>
        <Box mt={4}>
          <Grid container spacing={2} alignItems="center">
          <Grid item xs={2}>
              Key (MD Title)
            </Grid>
            <Grid item xs={10}>
              <TextField
                fullWidth
                value={info.key}
                onChange={(e) => {
                  setInfo({ ...info, key: e.target.value });
                }}
              ></TextField>
            </Grid>
            <Grid item xs={2}>
              {type === 0 ? "MurMur " : "Blog "} ID
            </Grid>
            <Grid item xs={10}>
              <TextField fullWidth disabled value={info.blogId}></TextField>
            </Grid>
            <Grid item xs={2}>
              Cover Image Link
            </Grid>
            <Grid item xs={10}>
              <TextField
                value={info.coverImageUrl}
                fullWidth
                onChange={(e) => {
                  setInfo({ ...info, coverImageUrl: e.target.value });
                }}
                InputProps={{endAdornment: <UploadBanner />}}
              ></TextField>
            </Grid>
            <Grid item xs={2}>
              Tag
            </Grid>
            <Grid item xs={10}>
              <TextField
                value={info.tag}
                fullWidth
                onChange={(e) => {
                  setInfo({ ...info, tag: e.target.value });
                }}
              ></TextField>
            </Grid>
            <Grid item xs={2}>
              Title
            </Grid>
            <Grid item xs={10}>
              <TextField
                fullWidth
                value={info.title}
                onChange={(e) => {
                  setInfo({ ...info, title: e.target.value });
                }}
              ></TextField>
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{ mt: 2 }} />
        <Box width="100%" mt={4}>
          <Button variant="contained" sx={{ color: "#FFF" }} component="label">
            Image
            <input
              type="file"
              name="myUploadFile"
              onChange={(e) => {
                e.target.files[0] !== null &&
                addImage(e.target.files[0]);
              }}
              hidden
            />
          </Button>
        </Box>

        <Grid container specing={2} mt={2}>
          <Grid item xs={6}>
            <TextField
              value={blogMd}
              onChange={(e) => {
                setBlogMd(e.target.value);
              }}
              multiline
              fullWidth
              rows={50}
            />
          </Grid>
          <Grid item xs={6}>
            <Box textAlign={"left"} className="md" m={2}>
              <ReactMarkdown
                children={blogMd}
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        children={String(children).replace(/\n$/, "")}
                        style={twilight}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  img: ({ node, ...props }) => (
                    <img alt={"alt"} style={{ maxWidth: "100%" }} {...props} />
                  ),
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Box m={2}>
          <button
            onClick={() => {
              let blob = new Blob([blogMd], { type: "text/plain" });
              onUpload(blob);
            }}
          >
            blob
          </button>
        </Box>
      </Box>

      <LoadingAdmin open={loading}/>
    </ThemeProvider>
  ) : (
    <Box>
      <input
        type="password"
        onChange={(e) => {
          e.target.value === "joyce0409" && setAuth(true);
        }}
      />
    </Box>
  );


}
