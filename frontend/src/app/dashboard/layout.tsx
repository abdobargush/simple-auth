import { InsertChart, People, Widgets } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NavbarAccountMenu from "@/components/NavbarAccountMenu";
import { grey } from "@mui/material/colors";
import DrawerMenu from "@/components/DrawerMenu";

const drawerWidth = 240;

export type MenuLink = {
  label: string;
  path: string;
  icon: React.ReactElement;
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const menuLinks: Array<MenuLink> = [
    {
      label: "Users",
      path: "/dashboard/users",
      icon: <People />,
    },
    {
      label: "Products",
      path: "/dashboard/products",
      icon: <Widgets />,
    },
    {
      label: "Statistics",
      path: "/dashboard/statistics",
      icon: <InsertChart />,
    },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: grey[100] }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: 999 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" flexGrow={1}>
            Next Dashboard
          </Typography>
          <NavbarAccountMenu />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          zIndex: 998,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <DrawerMenu links={menuLinks} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
