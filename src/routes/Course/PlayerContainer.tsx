import { memo, useCallback, useEffect, useRef, useState } from "react";

import noVideo from "../../assets/no-video.webp";
import lockedVideo from "../../assets/locked.jpg";
import SpeedIcon from "@mui/icons-material/Speed";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import PictureInPictureAltIcon from "@mui/icons-material/PictureInPictureAlt";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

import FluidImage from "../../components/FluidImage";
import VideoPlayer from "../../components/VideoPlayer";

const enablePIPMode = (VideoElement: HTMLVideoElement) => {
  if (document.pictureInPictureEnabled) {
    VideoElement.requestPictureInPicture();
  }
};

const disablePIPmode = () => {
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
  }
};

const PlayerContainer = ({
  link,
  title,
  isDisplayed,
}: {
  link: string;
  title: string;
  isDisplayed: boolean;
}) => {
  const [status, setStatus] = useState<"video" | "locked" | "error">("video");
  const [speed, setSpeed] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      const step = 0.25;
      if (event.ctrlKey && event.key === "ArrowUp") {
        setSpeed((prev) => {
          const result = prev + step;
          if (result <= 2) {
            return result;
          } else {
            return prev;
          }
        });
      }
      if (event.ctrlKey && event.key === "ArrowDown") {
        setSpeed((prev) => {
          const result = prev - step;
          if (result >= 0.25) {
            return result;
          } else {
            return prev;
          }
        });
      }
    }

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  }, [speed]);

  useEffect(() => {
    if (link === "corrupted") {
      setStatus(() => "error");
    } else if (link === "locked") {
      setStatus(() => "locked");
    } else {
      setStatus("video");
    }
    if (videoRef.current) {
      videoRef.current.currentTime = Number(localStorage.getItem(link));
    }
  }, [link]);

  useEffect(() => {
    function onLeavePIP() {
      if (!isDisplayed) videoRef.current?.pause();
    }
    if (videoRef.current) {
      videoRef.current.onleavepictureinpicture = onLeavePIP;
      if (!isDisplayed && !videoRef.current.paused) {
        enablePIPMode(videoRef.current);
      } else {
        disablePIPmode();
      }
    }
  }, [isDisplayed]);

  const handleTimeUpdate = useCallback(() => {
    const currentTime = videoRef.current?.currentTime;
    if (currentTime) {
      localStorage.setItem(link, Math.round(currentTime).toString());
    }
  }, [link]);

  const handleError = useCallback(() => {
    setStatus("error");
  }, []);

  const handlePIP = () => {
    if (videoRef.current) {
      enablePIPMode(videoRef.current);
    }
  };

  const displayTitle = () => {
    if (status === "locked") return `Video locked: ${title}`;
    if (status === "error") return `Video corrupted: ${title}`;
    return title;
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
      }}
    >
      <CardHeader
        title={displayTitle().slice(0, 60) + (title.length >= 60 ? "..." : "")}
        titleTypographyProps={{
          color: "primary",
          fontWeight: "bold",
          fontSize: "1.1em",
        }}
        sx={{
          flexBasis: 56,
          flexGrow: 0,
          flexShrink: 0,
        }}
      />
      <CardMedia
        sx={{
          height: "0px",
          flexGrow: 1,
          flexShrink: 1,
        }}
      >
        {status === "locked" && <FluidImage src={lockedVideo} />}
        {status === "error" && <FluidImage src={noVideo} />}
        {status === "video" && (
          <VideoPlayer
            ref={videoRef}
            link={link}
            controls={true}
            autoPlay={true}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "fill",
            }}
            playsInline={true}
            onTimeUpdate={handleTimeUpdate}
            errorCb={handleError}
          />
        )}
      </CardMedia>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 2,
          flexBasis: 56,
          flexGrow: 0,
          flexShrink: 0,
          py: "8px!important",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SpeedIcon sx={{ color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            Playback speed: <b>{speed}</b>
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            To change press: <b>Ctrl +</b>
          </Typography>
          <ArrowUpwardIcon sx={{ color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            or
          </Typography>
          <ArrowDownwardIcon sx={{ color: "text.secondary" }} />
        </Box>
        <Tooltip title="Enable PIP (picture in picture) mode">
          <IconButton onClick={handlePIP}>
            <PictureInPictureAltIcon />
          </IconButton>
        </Tooltip>
      </CardContent>
    </Card>
  );
};

export default memo(PlayerContainer);
