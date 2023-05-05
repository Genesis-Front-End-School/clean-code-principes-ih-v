import { useEffect } from "react";
import { useCoursesContext } from "../../contexts/CoursesContext";

import { AppBar, Pagination, Theme } from "@mui/material";

type CoursesPaginationProps = {
  divider: number;
  length: number;
};

const CoursesPagination = ({ divider, length }: CoursesPaginationProps) => {
  const { state, setState } = useCoursesContext();

  useEffect(() => {
    if (state.page > Math.ceil(length / divider)) {
      setState((prev) => ({ ...prev, page: 1 }));
    }
  }, [divider, length, setState, state.page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setState((prev) => ({ ...prev, page: value }));
  };

  return (
    <AppBar
      position="fixed"
      component="footer"
      sx={{
        alignItems: "center",
        top: "auto",
        bottom: 0,
        py: 0.5,
        bgcolor: (theme: Theme) => theme.palette.primary.light,
      }}
    >
      <Pagination
        color="secondary"
        count={Math.ceil(length / divider)}
        page={state.page}
        onChange={handlePageChange}
      />
    </AppBar>
  );
};

export default CoursesPagination;
