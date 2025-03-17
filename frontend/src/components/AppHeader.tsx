import { Stack, Typography } from "@mui/material";

const AppHeader = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      mb={4}
    >
      <Typography component="h1" variant="h3">
        {title}
      </Typography>
      {children}
    </Stack>
  );
};

export default AppHeader;
