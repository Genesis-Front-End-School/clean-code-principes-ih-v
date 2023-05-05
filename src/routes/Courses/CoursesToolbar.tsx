import { ChangeEvent, useEffect, useState } from "react";
import { initialState, useCoursesContext } from "../../contexts/CoursesContext";
import useDebounce from "../../hooks/useDebounce";

import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

import {
  Button,
  Checkbox,
  Grid,
  Paper,
  Slider,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import { style } from "../../constants";

const CoursesToolbar = () => {
  const { state, setState } = useCoursesContext();
  const [search, setSearch] = useState(state.search);
  const [rating, setRating] = useState<number>(state.rating);
  const theme = useTheme();

  const debSearch = useDebounce(search, 1000);
  const debRating = useDebounce(rating, 500);

  useEffect(() => {
    setState((prev) => ({ ...prev, search: debSearch }));
  }, [debSearch, setState]);

  useEffect(() => {
    setState((prev) => ({ ...prev, rating: debRating }));
  }, [debRating, setState]);

  const isFilterChanged =
    search || rating !== initialState.rating || state.filterLocked;

  const handleClearClick = () => {
    if (isFilterChanged) {
      setSearch(initialState.search);
      setRating(initialState.rating);
      setState((prev) => ({
        ...prev,
        filterLocked: initialState.filterLocked,
      }));
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleRatingChange = (event: Event, newValue: number | number[]) => {
    setRating(newValue as number);
  };

  const toggleCheckBox = () => {
    setState((prev) => ({ ...prev, filterLocked: !prev.filterLocked }));
  };

  const top = `calc(${theme.spacing(style.MARGIN_PREV)} + ${
    style.ROOT_HEADER_HEIGHT
  }px)`;

  return (
    <Paper
      elevation={16}
      sx={{
        position: "sticky",
        top,
        width: "100%",
        minWidth: style.CARD_MIN_WIDTH,
        mt: style.MARGIN_PREV,
        px: 2,
        py: 1,
        zIndex: 2,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack
            spacing={2}
            direction="row"
            alignItems="end"
            justifyContent="space-between"
          >
            <ImageSearchIcon color="primary" />
            <TextField
              label="Search course"
              value={search}
              type="search"
              variant="standard"
              fullWidth={true}
              autoFocus={true}
              onChange={handleSearchChange}
            />
            <Button
              size="small"
              startIcon={<FilterListOffIcon />}
              disabled={!isFilterChanged}
              onClick={handleClearClick}
            >
              Clear
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={2} direction="row" justifyContent="start">
            <Slider
              value={rating}
              min={0}
              max={5}
              step={0.5}
              marks={true}
              size="small"
              valueLabelDisplay="auto"
              color="secondary"
              sx={{ width: "150px" }}
              onChange={handleRatingChange}
            />
            <Typography variant="subtitle2" noWrap component="label">
              Filter with less rating
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={2} direction="row" justifyContent="start">
            <Checkbox
              checked={state.filterLocked}
              size="small"
              onChange={toggleCheckBox}
              sx={{
                p: 0,
                color: "secondary.main",
                "&.Mui-checked": {
                  color: "secondary.main",
                },
              }}
            />
            <Typography variant="subtitle2" noWrap component="label">
              Filter contained locked lessons
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CoursesToolbar;
