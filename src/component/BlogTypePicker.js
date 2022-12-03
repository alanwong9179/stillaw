import { Button } from "@mui/material";
import React from "react";
import { blueGrey } from "@mui/material/colors";
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const typeTheme = createTheme({
  palette: {
    primary: {
      main: blueGrey[600],
    },
    diselected: {
      main: blueGrey[100],
    },
  },
});

//type 0 -> murmur type 1 -> blog
const TypeButton = ({ title, isSelected, onSet }) => {
  return (
    <ThemeProvider theme={typeTheme}>
      <Button color={isSelected ? "primary" : "diselected"} onClick={onSet}>
        {title}
      </Button>
    </ThemeProvider>
  );
};

export default function BlogTypePicker({ type, setType }) {
  return (
    <Box>
      <TypeButton
        title={"blog"}
        isSelected={type === 1}
        onSet={() => {
          setType(1);
        }}
      />
      <TypeButton
        title={"murmur"}
        isSelected={type === 0}
        onSet={() => {
          setType(0);
        }}
      />
    </Box>
  );
}
