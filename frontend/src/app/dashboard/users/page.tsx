"use client";

import AppHeader from "@/components/AppHeader";
import AppTable from "@/components/AppTable";
import ConfirmDialog from "@/components/ConfirmDialog";
import UserFormDialog from "@/components/UserFormDialog";
import usePagination from "@/hooks/usePagination";
import useStore from "@/store";
import { User } from "@/types";
import { Add, Delete } from "@mui/icons-material";
import { Button, IconButton, Paper, TableCell, TableRow } from "@mui/material";
import { useNotifications } from "@toolpad/core";
import { useEffect, useState } from "react";

const UsersPage = () => {
  const notifications = useNotifications();
  const [isLoading, setIsLoading] = useState(true);
  const { users, fetchUsers, deleteUser } = useStore();

  /**
   * Fetch and searc users
   */
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination(1, 25);
  useEffect(() => {
    setIsLoading(true);
    fetchUsers({
      limit: rowsPerPage,
      skip: page * rowsPerPage,
    }).finally(() => {
      setIsLoading(false);
    });
  }, [page, rowsPerPage, fetchUsers]);

  /**
   * Create user
   */
  const [userFormDialogOpen, setUserFormDialogOpen] = useState(false);

  /**
   * Delete user
   */
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User>();
  const openDeleteDialog = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };
  const closeDeleteDialog = () => {
    setUserToDelete(undefined);
    setDeleteDialogOpen(false);
  };
  const handleDeleteUser = () => {
    deleteUser(userToDelete?.id as number).then(() => {
      notifications.show("User deleted.", {
        severity: "info",
      });
      closeDeleteDialog();
    });
  };

  return (
    <>
      <AppHeader title="Users">
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setUserFormDialogOpen(true)}
        >
          New User
        </Button>
      </AppHeader>
      <Paper>
        <AppTable
          headers={["Email", "Username", "Phone", "Gender", "Birth Date", ""]}
          PaginationProps={{
            count: users.total,
            page: page,
            rowsPerPage: rowsPerPage,
            onPageChange: handleChangePage,
            onRowsPerPageChange: handleChangeRowsPerPage,
          }}
          isLoading={isLoading}
        >
          {users.users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                {user.email}
              </TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>{user.birthDate}</TableCell>
              <TableCell align="right">
                <IconButton
                  color="error"
                  onClick={() => openDeleteDialog(user)}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </AppTable>
      </Paper>

      {/* Dialogs */}
      <UserFormDialog
        open={userFormDialogOpen}
        onClose={() => setUserFormDialogOpen(false)}
      />
      <ConfirmDialog
        title="Are you sure you want delete this user?"
        message="This can't be undone."
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={handleDeleteUser}
      />
    </>
  );
};

export default UsersPage;
