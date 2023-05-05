import { useMemo } from "react";
import { useAsyncValue } from "react-router-dom";
import { useCoursesContext } from "../../contexts/CoursesContext";

import { Box, Grid } from "@mui/material";

import { ICoursePreview } from "../../types";
import { style } from "../../constants";

import CoursePreview from "./CoursePreview";
import CoursesPagination from "./CoursesPagination";

const paginateDivider = 10;

const CoursesList = () => {
  const courses = useAsyncValue() as ICoursePreview[];
  const { state } = useCoursesContext();

  const filteredCourses = useMemo(() => {
    return courses.filter((item) => {
      if (state.search) {
        const searchWords = state.search.toLowerCase().trim().split(/\s+/);
        const searchResult = searchWords.every((word) => {
          return item.title.toLowerCase().includes(word);
        });
        if (!searchResult) return false;
      }
      if (state.rating && item.rating < state.rating) return false;

      if (state.filterLocked && item.containsLockedLessons) return false;

      return true;
    });
  }, [courses, state.filterLocked, state.rating, state.search]);

  const pageCourses = useMemo(() => {
    const startIdx = (state.page - 1) * paginateDivider;
    const endPageIdx = (state.page - 1) * paginateDivider + paginateDivider;
    const endIdx =
      endPageIdx <= filteredCourses.length
        ? endPageIdx
        : filteredCourses.length;
    return filteredCourses.slice(startIdx, endIdx);
  }, [filteredCourses, state.page]);

  return (
    <Box minWidth={style.CARD_MIN_WIDTH} mt={style.MARGIN_PREV} pb={7}>
      <Grid container spacing={2}>
        {pageCourses.map((course) => {
          return (
            <Grid key={course.id} item xs={12} md={6}>
              <CoursePreview item={course} />
            </Grid>
          );
        })}
      </Grid>
      <CoursesPagination
        length={filteredCourses.length}
        divider={paginateDivider}
      />
    </Box>
  );
};

export default CoursesList;
