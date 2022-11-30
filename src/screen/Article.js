import { Box} from "@mui/material";
import React, { useEffect, useState } from "react";
import { blueGrey } from "@mui/material/colors";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { twilight } from "react-syntax-highlighter/dist/esm/styles/prism";
import "../css/md.css";
import { useParams } from "react-router-dom";
import { getPostDetails } from "../functions/selectDb";
import { motion } from "framer-motion";
import {getMd} from "../functions/selectMd";
import rehypeRaw from "rehype-raw";
import Lottie from "react-lottie-player";
import loadingdot from '../animation/loadingdot.json'

export default function Article() {
  let { articleId } = useParams();
  const [postDetails, setPostDetails] = useState([]);
  const [mdContent, setMdContent] = useState("");

  useEffect(() => {
    getPostDetails(articleId).then((pDetail) => {
      setPostDetails(pDetail);
      let name = pDetail.key;
      getMd(name).then((md) => {
        setMdContent(md);
      });
    });
    window.scrollTo(0, 0)

  }, []);

  return mdContent === "" ? (
    <Box width="100%" sx={{ display: "flex", textAlign: "-webkit-center" }}>
      <Box sx={{ flex: 1, mt: "10%" }}>
          <Lottie
          loop
          animationData={loadingdot}
          play
          style={{ width: 150, height: 150 }}
        />
      </Box>
    </Box>
  ) : (
    <motion.div
      key="articlepage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Box
        sx={{ textAlign: "center" }}
        ml={{ xl: 15, lg: 10, md: 5, sm: 2, xs: 0 }}
        mr={{ xl: 15, lg: 10, md: 5, sm: 2, xs: 0 }}
      >
        <Box mt={"10px"}>
          <Box
            sx={{
              textAlign: "left",
              color: blueGrey[800],
              mt: 1,
              fontWeight: "900",
            }}
          >
            {postDetails.time !== undefined &&
              `Posted on ${moment
                .unix(postDetails.time.seconds)
                .format("YYYY-MM-DD HH:mm:ss")}`}
          </Box>
        </Box>
        <Box textAlign={"left"} className="md">
          <ReactMarkdown
            children={mdContent}
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
      </Box>

    </motion.div>
  );
}
