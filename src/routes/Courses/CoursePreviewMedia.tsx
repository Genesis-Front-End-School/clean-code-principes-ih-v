import { useEffect, useRef } from "react";

import noImg from "../../assets/no-img.jpg";
import noVideo from "../../assets/no-video.webp";
import loadingImg from "../../assets/loading-white.gif";

import VideoPlayer from "../../components/VideoPlayer";
import { CoursePreviewState } from "./CoursePreview";
import FluidImage from "../../components/FluidImage";

type CoursePreviewMediaProps = {
  status: CoursePreviewState;
  videoLink: string | undefined;
  imageLink: string;
  onSuccess: () => void;
  onError: () => void;
};

const CoursePreviewMedia = ({
  status,
  videoLink,
  imageLink,
  onSuccess,
  onError,
}: CoursePreviewMediaProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (status === "success") {
        videoRef.current.playbackRate = 1.5;
        videoRef.current.play();
      } else {
        if (videoRef.current.played) videoRef.current.pause();
      }
    }
  }, [status]);

  const mountVideo =
    videoLink && (status === "pending" || status === "success");

  return (
    <>
      {mountVideo && (
        <VideoPlayer
          ref={videoRef}
          style={{
            display: status === "pending" ? "none" : "inherit",
            width: "100%",
            height: "100%",
            objectFit: "fill",
          }}
          link={videoLink}
          controls={false}
          muted={true}
          playsInline={true}
          attachCb={onSuccess}
          errorCb={onError}
        />
      )}
      {status === "pending" && <FluidImage src={loadingImg} />}
      {status === "error" && <FluidImage src={noVideo} />}
      {status === "idle" && (
        <FluidImage
          src={imageLink}
          onError={(e) => {
            e.currentTarget.src = noImg;
          }}
        />
      )}
    </>
  );
};

export default CoursePreviewMedia;
