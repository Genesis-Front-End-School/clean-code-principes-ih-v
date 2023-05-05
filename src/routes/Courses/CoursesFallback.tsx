import { Box, Skeleton, Stack } from "@mui/material";

import { style } from "../../constants";

const FallbackElement = () => {
  return (
    <Stack spacing={2} sx={{ width: 400, height: 500 }}>
      <Skeleton animation="wave" variant="text" sx={{ fontSize: "4rem" }} />
      <Skeleton animation="wave" variant="text" sx={{ fontSize: "2rem" }} />
      <Skeleton animation="wave" variant="text" sx={{ fontSize: "10rem" }} />
      <Skeleton animation="wave" variant="text" sx={{ fontSize: "3rem" }} />
      <Skeleton animation="wave" variant="text" sx={{ fontSize: "5rem" }} />
      <Skeleton animation="wave" variant="text" sx={{ fontSize: "2rem" }} />
      <Stack spacing={2} direction="row" sx={{ width: "100%" }}>
        <Skeleton
          animation="wave"
          variant="text"
          sx={{ fontSize: "1rem", width: "100%" }}
        />
        <Skeleton
          animation="wave"
          variant="text"
          sx={{ fontSize: "1rem", width: "100%" }}
        />
      </Stack>
    </Stack>
  );
};

const CoursesFallback = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        gap: 2,
        justifyContent: "center",
        flexWrap: "wrap",
        mt: style.MARGIN_PREV,
      }}
    >
      <FallbackElement />
      <FallbackElement />
    </Box>
  );
};

export default CoursesFallback;
