import React from "react";
import { Box } from "@mui/system";
import { IconButton, Stack } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { blueGrey } from "@mui/material/colors";
import { useSpring, animated } from "react-spring";
import Divider from "@mui/material/Divider";
import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const RightLink = ({ locName, setHoverCheck, hoverCheck, setShowNav }) => {
  const StyledDivider = animated(Divider);

  const isHovered = locName === hoverCheck;
  const [showBar, onShowBar] = useSpring(() => ({
    marginLeft: "50%",
    marginRight: "50%",
    opacity: 0,
  }));

  useEffect(() => {
    onShowBar.start({
      marginLeft: isHovered ? "0%" : "50%",
      marginRight: isHovered ? "0%" : "50%",
      opacity: isHovered ? 1 : 0,
    });
  }, [hoverCheck]);

  return (
    <Box
      sx={{ fontWeight: 400, mt: { xs: 1, sm: 1, md: 0, lg: 0, xl: 0 } }}
      onMouseEnter={() => {
        setHoverCheck(locName);
      }}
      onMouseLeave={() => {
        setHoverCheck();
      }}
    >
      {
        <Link
          style={{
            textDecoration: "none",
            color: blueGrey[isHovered ? 500 : 300],
          }}
          to={locName}
        >
          {locName.toUpperCase()}
        </Link>
      }
      <StyledDivider
        sx={{ backgroundColor: blueGrey[300] }}
        style={{ ...showBar }}
      />
    </Box>
  );
};

export default function MainHeader() {
  const [hoverCheck, setHoverCheck] = useState();
  const AnimatedIconButton = animated(IconButton);
  const [showNav, setShowNav] = useState(false);

  const location = useLocation();

  const navProps = useSpring({
    transform: `translateX(${showNav ? "20" : "0"}px)`,
    opacity: showNav ? 1 : 0,
  });
  const closePros = useSpring({ opacity: showNav ? 0 : 1 });

  const AnimatedStack = animated(Stack);
  const dropMenuProps = useSpring({
    height: showNav ? 80 : 0,
    opacity: showNav ? 1 : 0,
    config: { friction: 18 },
  });

  useEffect(() => {
    setShowNav(false);
  }, [location.pathname]);

  return (
    <Box>
      <Box display="flex" flexDirection="row" sx={{ alignItems: "center" }}>
        <Box sx={{ fontSize: "2rem" }} flex={1}>
          Still. aw
        </Box>

        <Box
          display={{
            xs: "none",
            sm: "none",
            md: "block",
            lg: "block",
            xl: "block",
          }}
        >
          <Stack direction="row" spacing={2}>
            <RightLink
              locName={"home"}
              setHoverCheck={setHoverCheck}
              hoverCheck={hoverCheck}
            />
            <RightLink
              locName={"about"}
              setHoverCheck={setHoverCheck}
              hoverCheck={hoverCheck}
            />
            {/*
                 <RightLink
              locName={"archives"}
              setHoverCheck={setHoverCheck}
              hoverCheck={hoverCheck}
            />
              */}
          </Stack>
        </Box>

        <Box
          display={{
            xs: "block",
            sm: "block",
            md: "none",
            lg: "none",
            xl: "none",
          }}
        >
          <AnimatedIconButton
            sx={{ padding: 0 }}
            onClick={() => {
              setShowNav(!showNav);
            }}
            style={{ ...navProps }}
          >
            <CloseIcon />
          </AnimatedIconButton>

          <AnimatedIconButton
            sx={{ padding: 0 }}
            onClick={() => {
              setShowNav(!showNav);
            }}
            style={{ ...closePros }}
          >
            <MenuIcon />
          </AnimatedIconButton>
        </Box>
      </Box>

      <Box mt={1}>
        <AnimatedStack
          sx={{ textAlign: "center", overflow: "hidden" }}
          style={{ ...dropMenuProps }}
        >
          <RightLink
            locName={"home"}
            setHoverCheck={setHoverCheck}
            hoverCheck={hoverCheck}
            setShowNav={setShowNav}
          />
          <RightLink
            locName={"about"}
            setHoverCheck={setHoverCheck}
            hoverCheck={hoverCheck}
            setShowNav={setShowNav}
          />
          {/*
                <RightLink
            locName={"archives"}
            setHoverCheck={setHoverCheck}
            hoverCheck={hoverCheck}
            setShowNav={setShowNav}
          />
            */}
        </AnimatedStack>
      </Box>
    </Box>
  );
}
