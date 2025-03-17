"use client";

import { Stack, Box, TextField, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Lock } from "@mui/icons-material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useNotifications } from "@toolpad/core";

const loginSchema = yup.object().shape({
  email: yup.string().required().email().label("Email"),
  password: yup.string().required().min(8).label("Passowrd"),
});
type LoginData = yup.InferType<typeof loginSchema>;

const LoginForm = () => {
  const notifications = useNotifications();
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = (data: LoginData) =>
    login(data.email, data.password)
      .then(() => {
        notifications.show("Welcome back!", { severity: "success" });
        router.push("/dashboard");
      })
      .catch((message) => {
        notifications.show(message, { severity: "error" });
      });

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
      <Box textAlign="center">
        <Lock
          sx={{
            p: 2,
            color: "#fff",
            bgcolor: grey[900],
            borderRadius: "100rem",
          }}
        />
      </Box>
      <TextField
        id="email"
        type="email"
        label="Email"
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ""}
        {...register("email")}
      />
      <TextField
        id="password"
        type="password"
        label="Password"
        helperText={errors.password ? errors.password.message : ""}
        error={!!errors.password}
        {...register("password")}
      />
      <Button type="submit" variant="contained" size="large">
        Login
      </Button>
    </Stack>
  );
};

export default LoginForm;
