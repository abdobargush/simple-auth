import { Box, Container, Link, Paper, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import type { Metadata } from "next";
import RegisterForm from "@/components/RegisterForm";
import RouterLink from "next/link";

export const metadata: Metadata = {
  title: "Register",
};

const LoginPage = () => {
  return (
    <Stack
      position="relative"
      height="100vh"
      width="100vw"
      alignItems="center"
      justifyContent="center"
      bgcolor={grey[100]}
      sx={{
        "&:after": {
          content: '""',
          position: "absolute",
          height: "50vh",
          width: "100%",
          bgcolor: grey[900],
          zIndex: "1",
          top: 0,
        },
      }}
    >
      <Container maxWidth="xs" sx={{ position: "relative", zIndex: 9 }}>
        <Box component={Paper} p={3}>
          <RegisterForm />
          <Box mt={2}>
            <Typography textAlign="center">
              Already have account?
              <Link
                component={RouterLink}
                href="/login"
                ml={0.5}
                color="secondary"
              >
                Login Now!
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Stack>
  );
};

export default LoginPage;
