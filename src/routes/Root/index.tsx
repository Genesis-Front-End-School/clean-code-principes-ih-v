import { useState } from "react";
import { Outlet } from "react-router-dom";

import {
  Container,
  createTheme,
  CssBaseline,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";

import { CoursesProvider } from "../../contexts/CoursesContext";

import RootHeader from "./RootHeader";
import RootMain from "./RootMain";

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#9c27b0",
    },
    background: {
      default: "#cfd8dc",
    },
  },
  typography: {
    fontFamily: "Lato",
  },
};

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#9c27b0",
    },
    background: {
      default: "rgba(18,18,18,0.71)",
    },
  },
  typography: {
    fontFamily: "Lato",
  },
};

export default function Root() {
  const [themeName, setThemeName] = useState<"light" | "dark">("light");

  const themeOptions =
    themeName === "light" ? lightThemeOptions : darkThemeOptions;
  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container fixed>
        <RootHeader themeName={themeName} setThemeName={setThemeName} />
        <RootMain>
          <CoursesProvider>
            <Outlet />
          </CoursesProvider>
        </RootMain>
      </Container>
    </ThemeProvider>
  );
}
