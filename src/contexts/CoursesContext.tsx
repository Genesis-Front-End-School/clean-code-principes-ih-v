import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { useParams } from "react-router-dom";

import { Box, useTheme } from "@mui/material";

import { style } from "../constants";

import PlayerContainer from "../routes/Course/PlayerContainer";

type StateType = typeof initialState;

export const initialState = {
  videoLink: "",
  videoTitle: "",
  search: "",
  filterLocked: false,
  rating: 2,
  page: 1,
};

export type CoursesContextType = {
  state: StateType;
  setState: Dispatch<SetStateAction<StateType>>;
} | null;

const CoursesContext = createContext<CoursesContextType>(null);

export const CoursesProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<StateType>(initialState);
  const { courseId } = useParams();
  const theme = useTheme();

  const smTop =
    "calc(" +
    theme.spacing(style.MARGIN_PREV) +
    " + " +
    style.ROOT_HEADER_HEIGHT +
    "px)";

  const aspectRatio =
    style.VIDEO_ASPECT_RATIO[0] + "/" + style.VIDEO_ASPECT_RATIO[1];

  return (
    <CoursesContext.Provider value={{ state, setState }}>
      <Box
        sx={{
          display: !courseId ? "none" : "block",
          position: { sm: "sticky", md: "static" },
          top: smTop,
          width: { xs: "100%", md: style.VIDEO_MAX_WIDH },
          minWidth: style.CARD_MIN_WIDTH,
          aspectRatio,
          mt: style.MARGIN_PREV,
          zIndex: 2,
        }}
      >
        <PlayerContainer
          link={state.videoLink}
          title={state.videoTitle}
          isDisplayed={!!courseId}
        />
      </Box>
      {children}
    </CoursesContext.Provider>
  );
};

export const useCoursesContext = () => {
  const context = useContext(CoursesContext);
  if (!context) {
    throw Error("useCoursesContext must be called withing CoursesProvider");
  }
  return context;
};

export default CoursesContext;
