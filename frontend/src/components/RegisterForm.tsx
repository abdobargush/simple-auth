"use client";

import { Stack, Box, TextField, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { PersonAdd } from "@mui/icons-material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useNotifications } from "@toolpad/core";

const RegisterSchema = yup.object().shape({
  name: yup.string().required().min(3).label("Name"),
  email: yup.string().required().email().label("Email"),
  password: yup
    .string()
    .required()
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    )
    .min(8)
    .label("Passowrd"),
});
type RegisterData = yup.InferType<typeof RegisterSchema>;

const RegisterForm = () => {
  const notifications = useNotifications();
  const { register: handleRegister } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = (data: RegisterData) =>
    handleRegister({
      name: data.name,
      email: data.email,
      password: data.password,
    })
      .then(() => {
        notifications.show("Welcome aboard!", { severity: "success" });
        router.push("/dashboard");
      })
      .catch((message) => {
        notifications.show(`Registration Failed: ${message}`, {
          severity: "error",
        });
      });

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
      <Box textAlign="center">
        <PersonAdd
          sx={{
            p: 2,
            color: "#fff",
            bgcolor: grey[900],
            borderRadius: "100rem",
          }}
        />
      </Box>
      <TextField
        id="name"
        type="text"
        label="Name"
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ""}
        {...register("name")}
      />
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
        Register
      </Button>
    </Stack>
  );
};

export default RegisterForm;
