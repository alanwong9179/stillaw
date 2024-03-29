import { Box } from "@mui/system";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { blueGrey } from "@mui/material/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostTag from "./PostTag";
import { Skeleton } from "@mui/material";
import useMeasure from "react-use-measure";

export default function PostPreview({ postInfo }) {
  const [onHover, setOnHover] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [imageRef, imageBounds] = useMeasure();

  const navigate = useNavigate();
  const goToPost = (id) => {
    navigate(`/article/${id}`);
  };

  return (
    <Box>
      <Box sx={{ textAlign: "-webkit-center", position: "relative" }}>
        <Box
          ref={imageRef}
          sx={{
            width: "100%",
            height: "100%"
          }}
        >
          <LazyLoadImage
            style={{
              objectFit: "cover",
              borderRadius: "0px",
              aspectRatio: "1/1",
            }}
            effect="blur"
            height={"100%"}
            width={"100%"}
            afterLoad={() => {
              setLoaded(true);
            }}
            src={[postInfo.imgUrl]}
          />
        </Box>
        <Box
          onMouseEnter={() => {
            setOnHover(true);
          }}
          onMouseLeave={() => {
            setOnHover(false);
          }}
          onClick={() => {
            goToPost(postInfo.id);
          }}
          sx={{
            background:
              "linear-gradient(0deg, rgba(33,33,33,0.552280287114846) 0%, rgba(255,255,255,0) 50%)",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            transition: "opacity 1s",
            opacity: onHover ? 1 : 0,
            width: imageBounds.width,
            height: imageBounds.height - 8,
            display: "flex",
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              alignSelf: "flex-end",
              width: "100%",
              textAlign: "right",
              paddingRight: "10px",
              fontSize: "20px",
              color: "#FFF",
              paddingBottom: 2,
              fontWeight: "bolder",
            }}
          >
            MORE
          </Box>
        </Box>
      </Box>
      <Box sx={{ textAlign: "-webkit-center" }} mt={1}>
        {loaded ? (
          <PostTag tag={postInfo.tag} />
        ) : (
          <Skeleton variant="rounded" width={"90%"} height={26} />
        )}
      </Box>
      {loaded ? (
        <>
          <Box
            mt={1}
            sx={{ lineHeight: "1.5rem", height: "3rem", overflow: "hidden" }}
          >
            {postInfo.title}
          </Box>
          <Box sx={{ color: blueGrey[600], fontSize: "0.8rem", marginTop: 2 }}>
            {postInfo.date}
          </Box>
          <Box sx={{ textAlign: "-webkit-center" }}>
            <hr style={{ width: "20%" }}></hr>
          </Box>
          
        </>
      ) : (
        <Box mt={1} sx={{ textAlign: "-webkit-center" }}>
          <Skeleton variant="rounded" width={"90%"} height={50} />
        </Box>
      )}
    </Box>
  );
}
