import { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import MainHeader from "./component/MainHeader";
import { blueGrey } from "@mui/material/colors";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import PostList from "./screen/PostList";
import Article from "./screen/Article";
import { motion } from "framer-motion";
import useScrollDirection from "./functions/useScrollDirection";
import Tutor from "./screen/Tutor";
import Admin from "./screen/Admin";

function App() {
  const location = useLocation();
  const scroll = useScrollDirection();

  const showFooter = ["article", "home"].some((loc) =>
    location.pathname.includes(loc)
  );

  return (
    <Box>
      <motion.div
        style={{
          zIndex: 10,
          position: "sticky",
          top: 0,
          backdropFilter: "blur(1px)",
          boxShadow: "0 1px 2px -2px #484848",
          backgroundColor: "#FFF",
        }}
        initial={{ y: 0 }}
        animate={{ y: scroll.isDown && !scroll.isTop ? -100 : 0 }}
        transition={{ type: "spring", bounce: 0 }}
      >
        <Box
          pt={3}
          pb={2}
          pl={{ xl: 40, lg: 20, md: 20, sm: 15, xs: 5 }}
          pr={{ xl: 40, lg: 20, md: 20, sm: 15, xs: 5 }}
        >
          <MainHeader />
        </Box>
      </motion.div>

      <Box
        pl={{ xl: 40, lg: 20, md: 20, sm: 15, xs: 5 }}
        pr={{ xl: 40, lg: 20, md: 20, sm: 15, xs: 5 }}
        minHeight="83vh"
      >
        <AnimatePresence exitBeforeEnter>
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<PostList />} />
            <Route path="/home/:page" element={<PostList />} />
            <Route path="/article/:articleId" element={<Article />} />

            <Route path="/admin" element={<Admin />} />
            <Route path="/tutor" element={<Tutor />} />
          </Routes>
        </AnimatePresence>
      </Box>

      {showFooter && (
        <Box
          sx={{
            textAlign: "center",
            mt: 15,
            color: "#FFF",

            backgroundColor: blueGrey[400],
            width: "100%",
          }}
        >
          <Box
            p={2}
            sx={{ fontSize: { xs: "0.3rem", sm: "0.3rem", md: "0.8rem" } }}
          >
            Copyright © 2022 Still.aw . All Rights Reserved
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default App;
