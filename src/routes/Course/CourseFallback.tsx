import { Skeleton, Stack } from "@mui/material";

import { style } from "../../constants";

const CourseFallback = () => {
  return (
    <Stack spacing={1} sx={{ width: "100%", mt: style.MARGIN_PREV }}>
      <Stack spacing={1} direction="row">
        <Skeleton
          animation="wave"
          variant="text"
          sx={{ fontSize: "4rem", width: 150 }}
        />
        <Stack spacing={2} direction="column" width={"100%"} py={4}>
          <Skeleton animation="wave" variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton animation="wave" variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton animation="wave" variant="text" sx={{ fontSize: "1rem" }} />
        </Stack>
      </Stack>
      <Skeleton animation="wave" variant="text" sx={{ fontSize: "2rem" }} />
      <Skeleton animation="wave" variant="text" sx={{ fontSize: "1rem" }} />
    </Stack>
  );
};
export default CourseFallback;
