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
import { CreaeteProductPayload } from "@/types";
import { useNotifications } from "@toolpad/core";

const productSchema = yup.object().shape({
  sku: yup
    .string()
    .required("SKU is required")
    .min(3, "SKU must be at least 3 characters long"),
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters long"),
  category: yup
    .string()
    .required("Category is required")
    .oneOf(
      ["groceries", "food", "clothes", "electronics"],
      "Category must be one of: groceries, food, clothes, electronics"
    ),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters long"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be greater than 0")
    .typeError("Price must be a valid number"),
});
type ProductData = yup.InferType<typeof productSchema>;

const ProductFormDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const notifications = useNotifications();
  const { createProduct } = useStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductData>({
    resolver: yupResolver(productSchema),
  });
  const onSubmit = (data: ProductData) => {
    createProduct(data as CreaeteProductPayload).then(() => {
      notifications.show("Product created succefully!", {
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
      <DialogTitle>New Product</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            margin="dense"
            id="sku"
            label="SKU"
            fullWidth
            error={!!errors.sku}
            helperText={errors.sku?.message ?? ""}
            {...register("sku")}
          />
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            fullWidth
            error={!!errors.title}
            helperText={errors.title?.message ?? ""}
            {...register("title")}
          />

          <TextField
            margin="dense"
            id="price"
            label="Price"
            type="number"
            slotProps={{
              htmlInput: {
                step: "0.1",
              },
            }}
            fullWidth
            error={!!errors.price}
            helperText={errors.price?.message ?? ""}
            {...register("price")}
          />
          <TextField
            margin="dense"
            id="category"
            label="Category"
            fullWidth
            select
            defaultValue=""
            error={!!errors.category}
            helperText={errors.category?.message ?? ""}
            {...register("category")}
          >
            <MenuItem value="groceries">Groceries</MenuItem>
            <MenuItem value="food">Food</MenuItem>
            <MenuItem value="clothes">Clothes</MenuItem>
            <MenuItem value="electronics">Electronics</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            error={!!errors.description}
            helperText={errors.description?.message ?? ""}
            multiline
            {...register("description")}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">Add Product</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductFormDialog;
