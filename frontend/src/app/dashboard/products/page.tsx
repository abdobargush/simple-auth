"use client";

import AppHeader from "@/components/AppHeader";
import AppTable from "@/components/AppTable";
import ConfirmDialog from "@/components/ConfirmDialog";
import ProductFormDialog from "@/components/ProductFormDialog";
import usePagination from "@/hooks/usePagination";
import useStore from "@/store";
import { Product } from "@/types";
import { Add, Delete } from "@mui/icons-material";
import { Button, IconButton, Paper, TableCell, TableRow } from "@mui/material";
import { useNotifications } from "@toolpad/core";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const notifications = useNotifications();
  const { products, fetchProducts, deleteProduct } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination(1, 25);

  useEffect(() => {
    setIsLoading(true);
    fetchProducts({
      limit: rowsPerPage,
      skip: page * rowsPerPage,
    }).finally(() => {
      setIsLoading(false);
    });
  }, [page, rowsPerPage, fetchProducts]);

  /**
   * Create product
   */
  const [userFormDialogOpen, setProductFormDialogOpen] = useState(false);

  /**
   * Delete product
   */
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setProductToDelete] = useState<Product>();
  const openDeleteDialog = (product: Product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };
  const closeDeleteDialog = () => {
    setProductToDelete(undefined);
    setDeleteDialogOpen(false);
  };
  const handleDeleteProduct = () => {
    deleteProduct(userToDelete?.id as number).then(() => {
      notifications.show("Product deleted.", { severity: "info" });
      closeDeleteDialog();
    });
  };

  return (
    <>
      <AppHeader title="Products">
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setProductFormDialogOpen(true)}
        >
          New Product
        </Button>
      </AppHeader>
      <Paper>
        <AppTable
          headers={["SKU", "Title", "Category", "Price", ""]}
          PaginationProps={{
            count: products.total,
            page: page,
            rowsPerPage: rowsPerPage,
            onPageChange: handleChangePage,
            onRowsPerPageChange: handleChangeRowsPerPage,
          }}
          isLoading={isLoading}
        >
          {products.products?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell align="right">
                <IconButton
                  color="error"
                  onClick={() => openDeleteDialog(product)}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </AppTable>
      </Paper>

      {/* Dialogs */}
      <ProductFormDialog
        open={userFormDialogOpen}
        onClose={() => setProductFormDialogOpen(false)}
      />
      <ConfirmDialog
        title="Are you sure you want delete this product?"
        message="This can't be undone."
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={handleDeleteProduct}
      />
    </>
  );
};

export default ProductsPage;
