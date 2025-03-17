"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useStore from "@/store";
import { CreateUserPayload } from "@/types";
import { useNotifications } from "@toolpad/core";

const userSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .label("Email"),
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username can't be longer than 20 characters")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Username can only contain alphanumeric characters"
    ),
  gender: yup
    .string()
    .required("Gender is required")
    .oneOf(["male", "female"], "Gender must be either 'male' or 'female'"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number can only contain digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number can't be longer than 15 digits"),
  birthDate: yup
    .string()
    .required("Birth date is required")
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "Birth date must be in the format YYYY-MM-DD"
    )
    .test("is-valid-date", "Birth date must be a valid date", (value) =>
      value ? !isNaN(Date.parse(value)) : false
    ),
});
type UserData = yup.InferType<typeof userSchema>;

const UserFormDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const notifications = useNotifications();
  const { createUser } = useStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserData>({
    resolver: yupResolver(userSchema),
  });
  const onSubmit = (data: UserData) => {
    createUser(data as CreateUserPayload).then(() => {
      notifications.show("User created succefully!", {
        severity: "success",
      });
      reset();
      onClose();
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ component: "form", onSubmit: handleSubmit(onSubmit) }}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>New User</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message ?? ""}
            {...register("email")}
          />
          <TextField
            margin="dense"
            id="username"
            label="Username"
            fullWidth
            error={!!errors.username}
            helperText={errors.username?.message ?? ""}
            {...register("username")}
          />
          <TextField
            margin="dense"
            id="phone"
            label="Phone Number"
            type="phone"
            fullWidth
            error={!!errors.phone}
            helperText={errors.phone?.message ?? ""}
            {...register("phone")}
          />
          <TextField
            margin="dense"
            id="gender"
            label="Geneder"
            fullWidth
            select
            defaultValue=""
            error={!!errors.gender}
            helperText={errors.gender?.message ?? ""}
            {...register("gender")}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            type="date"
            id="birthdate"
            label="Birth Date"
            fullWidth
            error={!!errors.birthDate}
            helperText={errors.birthDate?.message ?? ""}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            {...register("birthDate")}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">Add User</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserFormDialog;
