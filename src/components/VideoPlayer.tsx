import {
  forwardRef,
  RefObject,
  memo,
  useLayoutEffect,
  VideoHTMLAttributes,
} from "react";

import Hls, { ErrorData, Events } from "hls.js";

type VideoPlayerProps = {
  link: string;
  attachCb?: () => void;
  errorCb?: (event: Events.ERROR, data: ErrorData) => void;
} & VideoHTMLAttributes<HTMLVideoElement>;

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ link, attachCb, errorCb, ...props }, ref) => {
    const videoRef = ref as RefObject<HTMLVideoElement>;

    useLayoutEffect(() => {
      let hls: Hls;
      if (videoRef?.current) {
        if (Hls.isSupported()) {
          hls = new Hls({
            enableWorker: false,
          });
          if (errorCb) {
            hls.on(Hls.Events.ERROR, function (event, data) {
              if (data.fatal && link) {
                errorCb(event, data);
              }
            });
          }
          if (attachCb) {
            hls.on(Hls.Events.MEDIA_ATTACHED, function () {
              attachCb();
            });
          }
          hls.loadSource(`${link}`);
          hls.attachMedia(videoRef.current);
        }
      }
      return () => {
        if (hls) {
          hls.destroy();
        }
      };
    }, [link, errorCb, attachCb, videoRef]);

    return <video ref={ref} {...props} />;
  }
);

export default memo(VideoPlayer);
