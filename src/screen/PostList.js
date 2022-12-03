import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import PostPreview from "../component/PostPreview";
import { getBlogs } from "../functions/selectDb";
import Pagination from "@mui/material/Pagination";
import { motion, AnimatePresence } from "framer-motion";
import BlogTypePicker from "../component/BlogTypePicker";
import { Box } from "@mui/material";
import useMeasure from "react-use-measure";
import MurmurPerview from "../component/MurmurPerview";

export default function PostList() {
  const [posts, setposts] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const [type, setType] = useState(1);
  //type 0 = murmur , 1 = blog

  const [contentRef, contentBounds] = useMeasure();

  //const { page } = useParams();

  /*get post list */
  useEffect(() => {
    setposts([]);
    getBlogs(type).then((blogs) => {
      let pageApply = 1;
      for (let b = 0; b < blogs.length; b++) {
        if (b % 9 === 0 && b !== 0) {
          pageApply++;
        }
        blogs[b].page = pageApply;
      }
      setPageCount(parseInt((blogs.length / 9).toFixed(0)));
      setposts(blogs);
    });
  }, [type]);

  const variants = {
    initial: {
      x: 500,
      transition: { duration: 0.8 },
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: 100,
      transition: { duration: 0.1 },
      opacity: 0,
    },
  };

  return (
    <motion.div
      key="postlistpage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{ marginBottom: 40 }}
    >
      <Box mt={2}>
        <BlogTypePicker type={type} setType={setType} />
      </Box>

      <AnimatePresence exitBeforeEnter>
      { type === 1 ?
        <motion.div
          key="blog"
          initial={"initial"}
          variants={variants}
          animate={"animate"}
          exit={"exit"}
        >
          <Grid
            ref={contentRef}
            container
            rowSpacing={4}
            justifyContent={"left"}
            pt={1}
            spacing={5}
          >

            {  posts.length > 0 &&
                posts.map(
                (i, index) =>
                  i.page === (page || 1) && (
                    <Grid
                      key={index}
                      item
                      sx={{ textAlign: "center" }}
                      xs={12}
                      sm={12}
                      md={6}
                      lg={4}
                      xl={4}
                    >
                   <PostPreview postInfo={i} />
                    </Grid>
                  )
              )}
          </Grid>
        </motion.div>
        :
        <motion.div
        key="murmur"
        initial={"initial"}
        variants={variants}
        animate={"animate"}
        exit={"exit"}
      >
        <Grid
          ref={contentRef}
          container
          rowSpacing={4}
          justifyContent={"left"}
          pt={1}
          spacing={5}
        >

          {  posts.length > 0 &&
              posts.map(
              (i, index) =>
                i.page === (page || 1) && (
                  <Grid
                    key={index}
                    item
                    sx={{ textAlign: "center" }}
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    xl={6}
                  >
                  <MurmurPerview postInfo={i}/>
                  </Grid>
                )
            )}
        </Grid>
      </motion.div>
        }
      </AnimatePresence>
      {page > 1 && (
        <Pagination
          sx={{
            ul: {
              justifyContent: "center",
            },
            mt: 5,
          }}
          count={pageCount}
          shape="rounded"
          page={parseInt(page)}
        />
      )}
    </motion.div>
  );
}
