import { Dispatch } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SchoolIcon from "@mui/icons-material/School";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import { style } from "../../constants";

type RootHeaderProps = {
  themeName: string;
  setThemeName: Dispatch<React.SetStateAction<"light" | "dark">>;
};

const RootHeader = ({ themeName, setThemeName }: RootHeaderProps) => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const handleThemeChange = () => {
    setThemeName((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <AppBar component="nav" sx={{ height: style.ROOT_HEADER_HEIGHT }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          sx={{
            mr: 2,
            backgroundColor: !courseId ? "inherit" : "secondary.light",
          }}
          onClick={() => navigate("/")}
        >
          {!courseId ? <SchoolIcon /> : <ArrowBackIcon />}
        </IconButton>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" noWrap component="div">
            Courses platform
          </Typography>
          <Typography variant="body1" noWrap component="div">
            Learn, grow, ahieve goals...
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip
          title={
            themeName === "light"
              ? "Toggle to dark theme"
              : "Toggle to light theme"
          }
        >
          <IconButton edge="end" onClick={handleThemeChange} color="inherit">
            {themeName === "light" && <DarkModeIcon />}
            {themeName === "dark" && <LightModeIcon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default RootHeader;
