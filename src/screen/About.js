import React from "react";
import { Box } from "@mui/system";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { deepPurple } from "@mui/material/colors";
import { LayoutGroup, motion } from "framer-motion";
import { Divider, Grid, IconButton } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { useState } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";

const TAGLIST = [
  "React JS",
  "Node JS",
  "JavaScript",
  "React Native",
  "Expo",
  "Android",
  "iOS",
  "MySql",
  "MSSQL",
  "Sybase",
  "PowerBuilder",
  "Classic Asp",
  "VB Script",
  "PHP",
  "jQuery",
];

export default function About() {
  const [showEmail, setShowEmail] = useState(false);

  return (
    <motion.div
      key="aboutpage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Grid container>
      <Grid item xs={12} md={6} sx={{display:{xs:'block', sm:'block', md: 'none', lg: 'none', xl: 'none'}}}>
          <motion.div
            style={{ padding: 20 }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1 }}
          >
            <LazyLoadImage
              width={"100%"}
              src={
                "https://firebasestorage.googleapis.com/v0/b/stillaw-1b875.appspot.com/o/images%2F000047270011.jpg?alt=media&token=a2658107-9346-4996-aa33-6d9b006c54b3"
              }
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box mt={2}>
            <motion.div
              animate={{ x: 0, opacity: 1 }}
              initial={{ x: -20, opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <Box sx={{ fontSize: "2rem", fontWeight: "bold", color: "#555" }}>
                Alan Wong
              </Box>
            </motion.div>
            <motion.div
              animate={{ x: 0, opacity: 1 }}
              initial={{ x: -20, opacity: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Box
                sx={{
                  fontSize: "1rem",
                  color: "#555",
                  whiteSpace: "pre-wrap",
                  mt: 2,
                }}
              >
                {
                  "A full stack developer with experience in developing websites, CMS and mobile app for personal or businesses. \n\nAlso enjoying in movie, music and photography.\n\nWelcome to contact if you have any needed.\n\n"
                }
              </Box>
            </motion.div>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", mt: 1 }}>
            {TAGLIST.map((tag, i) => (
              <motion.div
                style={{ width: "fit-content", margin: 5 }}
                whileHover={{
                  scale: [null, 1.15, 1.1],
                  transition: { delay: 0 },
                }}
      
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + i * 0.1 }}
              >
                <Box
                  sx={{
                    backgroundColor: deepPurple[200],
                    color: "#FFF",
                    p: 1,
                    borderRadius: 10,
                    pl: 2,
                    pr: 2,
                    boxShadow: "1px 2px 9px 1px rgba(179,157,219,0.92)",
                    fontSize: "0.9rem",
                  }}
                >
                  {tag}
                </Box>
              </motion.div>
            ))}
          </Box>
          <motion.div
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: -20, opacity: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <Box sx={{ mt: 5, fontWeight: "bold", fontSize: "1.1rem" }}>
              Contact Me
            </Box>

            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
              }}
            >
              <LayoutGroup>
                <motion.div layout>
                  <IconButton
                    onClick={() => {
                      setShowEmail(!showEmail);
                    }}
                  >
                    <EmailIcon />
                  </IconButton>
                </motion.div>
                {showEmail && (
                  <motion.div layout canimate={{ opacity: showEmail ? 1 : 0 }}>
                    alanwong9179@gmail.com
                  </motion.div>
                )}
                <motion.div layout>
                  <IconButton
                    onClick={() => {
                      window.open(
                        "https://www.instagram.com/stillaw/",
                        "_blank"
                      );
                    }}
                  >
                    <InstagramIcon />
                  </IconButton>
                </motion.div>
              </LayoutGroup>
            </Box>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6} sx={{display:{xs:'none', sm:'none', md: 'block', lg: 'block', xl: 'block'}}}>
          <motion.div
            style={{ padding: 20 }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 3 }}
          >
            <LazyLoadImage
              width={"100%"}
              src={
                "https://firebasestorage.googleapis.com/v0/b/stillaw-1b875.appspot.com/o/images%2F000047270011.jpg?alt=media&token=a2658107-9346-4996-aa33-6d9b006c54b3"
              }
            />
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );
}
