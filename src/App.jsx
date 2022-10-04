import { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import MainHeader from "./screen/MainHeader";
import PostList from "./screen/PostList";
import { Routes, Route} from "react-router-dom";
import NotFound from "./screen/NotFound";
import Article from "./screen/Article";
import { useLocation } from "react-router-dom";
import { animated, useSpring } from "react-spring";
import Footer from "./screen/Footer";
import { Admin } from "./screen/Admin";
import About from "./screen/About";
import useScrollDirection from "./functions/useScrollDirection";
import Work from "./screen/Work";

function App() {
  const currentRoute = useLocation().pathname;
  const articlePage = currentRoute.includes("article");
  const adminPage = currentRoute.includes("admin")

  const AnimatedBox = animated(Box);

  const scrollDirection = useScrollDirection()
  /*animation*/
  const [moveHeader, onMoveHeader] = useSpring(() => ({
    loop: false,
    from: { y: 0 },
    to: { y: 0 },
  }));

  useEffect(() => {
      scrollDirection === 'down' ?
      onMoveHeader.start({
        from: { y: moveHeader.y.get()},
        to: {y: -73}
      }) 
      :
      onMoveHeader.start({
        from: { y: moveHeader.y.get()},
        to: {y: 0},
      })
      
  }, [scrollDirection]);

  /*page control*/
  const onPageChange = (e, v) => {
    setPage(v)
  }

  return (
    <Box >
      <AnimatedBox 
         sx={{
          display: adminPage ? "block" : "block",
          zIndex: 10,
          position: "sticky",
           top: 0,
          backdropFilter: "blur(1px)",
          boxShadow: "0 1px 2px -2px #484848"
         // backgroundColor: blueGrey[50]
          
        }}
        pt={3}
        pb={2}
        pl={{ xl: 40, lg: 20, md: 20, sm: 15, xs: 5 }}
        pr={{ xl: 40, lg: 20, md: 20, sm: 15, xs: 5 }}
        style={{...moveHeader}}
      >
        <MainHeader />
      </AnimatedBox>

      <Box
        pt={articlePage ? 0 : "0px"}
        pl={{ xl: 40, lg: 20, md: 20, sm: 15, xs: 5 }}
        pr={{ xl: 40, lg: 20, md: 20, sm: 15, xs: 5 }}
        minHeight='83vh'
      >
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/home/:page" element={<PostList />} />
          <Route path="/article/:articleId" element={<Article />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<About />} />
          <Route path="/archives" element={<Work />} />
          <Route path="*" element={<NotFound />}/>
        </Routes>

      </Box>
      <Box
        mt={3}
        ml={{ xl: 40, lg: 20, md: 20, sm: 15, xs: 5 }}
        mr={{ xl: 40, lg: 20, md: 20, sm: 15, xs: 5 }}
      >
        <Footer />
      </Box>
    </Box>
  );
}

export default App;
