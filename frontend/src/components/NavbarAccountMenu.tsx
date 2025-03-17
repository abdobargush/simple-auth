"use client";

import useAuth from "@/hooks/useAuth";
import { AccountCircle } from "@mui/icons-material";
import { Box, IconButton, MenuItem, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NavbarAccountMenu = () => {
  const { logout, getUser } = useAuth();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () =>
    logout().then(() => {
      router.push("/login");
      handleClose();
    });

  const [userName, setUserName] = useState("");
  useEffect(() => {
    getUser().then((data) => setUserName(data.name));
  }, []);

  return (
    <Box display="flex" alignItems="center">
      <Typography>Welcome, {userName}</Typography>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default NavbarAccountMenu;
