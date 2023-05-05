import { ReactNode } from "react";

import { Container } from "@mui/material";

import { style } from "../../constants";

type RootMainProps = {
  children: ReactNode;
};

const RootMain = ({ children }: RootMainProps) => {
  return (
    <Container
      component="main"
      maxWidth="md"
      disableGutters={true}
      sx={{ position: "relative", paddingTop: `${style.ROOT_HEADER_HEIGHT}px` }}
    >
      {children}
    </Container>
  );
};

export default RootMain;
