import { forwardRef, ImgHTMLAttributes } from "react";

const FluidImage = forwardRef<
  HTMLImageElement,
  ImgHTMLAttributes<HTMLImageElement>
>(({ ...props }: ImgHTMLAttributes<HTMLImageElement>, ref) => {
  return (
    <img
      ref={ref}
      alt=""
      {...props}
      loading="lazy"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "fill",
      }}
    />
  );
});

export default FluidImage;
