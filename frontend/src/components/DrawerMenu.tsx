"use client";

import { MenuLink } from "@/app/dashboard/layout";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DrawerMenu = ({ links }: { links: Array<MenuLink> }) => {
  const pathname = usePathname();

  const isActive = (link: MenuLink) => pathname === link.path;

  return (
    <Box sx={{ overflow: "auto" }}>
      <List>
        {links.map((item) => {
          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                sx={{
                  bgcolor: isActive(item) ? grey[100] : "transparent",
                  "*": {
                    color: isActive(item) ? grey[900] : grey[600],
                  },
                  "& .MuiTypography-root": {
                    fontWeight: isActive(item) ? "700!important" : "400",
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default DrawerMenu;
