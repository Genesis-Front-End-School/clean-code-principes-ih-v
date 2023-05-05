import { Box, Typography } from "@mui/material";
import { useAsyncError } from "react-router-dom";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const asyncError = useAsyncError() as { message?: string };
  const routerError = useRouteError() as { data?: string };

  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      color="error.main"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap={2}
      mt={10}
    >
      <Typography variant="h4">Sorry, but someting goes wrong...</Typography>
      {asyncError && (
        <Typography variant="h6">
          Error!{" "}
          {asyncError.message ?? <span>{JSON.stringify(asyncError)}</span>}
        </Typography>
      )}
      {routerError && (
        <Typography variant="h6">
          {routerError.data ?? <span>{JSON.stringify(routerError)}</span>}
        </Typography>
      )}
    </Box>
  );
};

export default Error;
