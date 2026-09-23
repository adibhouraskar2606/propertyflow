import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  Apartment,
  Build,
  Dashboard,
} from "@mui/icons-material";

import {
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";


function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const drawerWidth = 240;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            PropertyFlow
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />

        <List>
          <ListItemButton
            selected={location.pathname === "/"}
            onClick={() => navigate("/")}
          >
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>

            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton
            selected={location.pathname.startsWith(
              "/properties"
            )}
            onClick={() => navigate("/properties")}
          >
            <ListItemIcon>
              <Apartment />
            </ListItemIcon>

            <ListItemText primary="Properties" />
          </ListItemButton>

          <ListItemButton
            selected={location.pathname.startsWith(
              "/maintenance"
            )}
            onClick={() => navigate("/maintenance")}
          >
            <ListItemIcon>
              <Build />
            </ListItemIcon>

            <ListItemText primary="Maintenance" />
          </ListItemButton>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
}

export default AppLayout;