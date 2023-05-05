import { useAsyncValue } from "react-router-dom";

import noImg from "../../assets/no-img.jpg";
import loadingImg from "../../assets/loading-white.gif";
import { Box, Chip, Paper, Typography } from "@mui/material";

import { ICourse } from "../../types";
import { style } from "../../constants";
import secondsToTime from "../../utils/secondsToTime";

const CorseDescription = () => {
  const course = useAsyncValue() as ICourse;

  const duration = course.lessons.reduce((acc, item) => {
    return acc + item.duration;
  }, 0);

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        minWidth: style.CARD_MIN_WIDTH,
        p: 2,
        mt: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box
          sx={{
            width: 150,
            minWidth: 150,
            height: 80,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "primary.main",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <img
            loading="lazy"
            src={course.previewImageLink + "/cover.webp"}
            alt={loadingImg}
            onError={(e) => {
              e.currentTarget.src = noImg;
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "fill",
            }}
          />
        </Box>
        <Box>
          <Typography
            variant="h6"
            component="h6"
            lineHeight={1.2}
            pb={1}
            color="primary"
          >
            <b>{course.title}</b>
          </Typography>
          <Typography variant="body2" color="text.secondary" component="p">
            {`Published: ${course.launchDate.toDateString()}`}
          </Typography>
          <Typography variant="subtitle2" color="secondary.light" component="p">
            {`Total duration: ${secondsToTime(duration)}`}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="body1" component="span" color="text.secondary">
          About the course:
        </Typography>
        <Typography variant="body1" component="span" ml={1}>
          <b>{course.description}</b>
        </Typography>
      </Box>
      <Box>
        <Typography variant="subtitle2" component="span" color="text.secondary">
          Skills:
        </Typography>
        <Typography variant="subtitle2" component="span" ml={1}>
          {course.meta.skills?.join(", ")}
        </Typography>
      </Box>
      <Box>
        {course.tags.map((item, i) => {
          return (
            <Chip key={i} label={`#${item}`} size="small" color="primary" />
          );
        })}
      </Box>
    </Paper>
  );
};

export default CorseDescription;
