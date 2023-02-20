import React, { useState, useEffect, useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import HomeIcon from "@mui/icons-material/Home";
import Visibility from "@mui/icons-material/Visibility";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import StoreIcon from "@mui/icons-material/Store";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LockResetIcon from "@mui/icons-material/LockReset";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AppsIcon from "@mui/icons-material/Apps";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { makeStyles } from "@mui/styles";
import Navigation from "../navigation/Navigation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ListItem from "@mui/material/ListItem";
import Skeleton from "@mui/material/Skeleton";
import SettingsPowerIcon from "@mui/icons-material/SettingsPower";
import { getDataWithToken } from "../../services/GetDataService";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import CircleIcon from "@mui/icons-material/Circle";
import MenuIcon from "@mui/icons-material/Menu";
const useStyles = makeStyles((theme) => ({
  linkStyle: {
    textDecoration: "none",
    color: "#858e9b",
  },
  menuItem: {
    marginBottom: "5px !important",
    padding: "6px 16px !important",

    "& span": {
      fontSize: "17px",
      fontWeight: "500 !important",
      [theme.breakpoints.down("xl")]: {
        fontSize: "14px",
      },
      [theme.breakpoints.down("md")]: {
        fontSize: "12px",
      },
    },
    ["& .MuiListItemIcon-root"]: {
      minWidth: "46px",
    },
    ["& .MuiSvgIcon-root"]: {
      position: "relative",
      top: "-2px",
      color: "#858e9b",
      fontSize: "24px",
      [theme.breakpoints.down("md")]: {
        fontSize: "10px",
      },
    },
    ["&.MuiListItemButton-root:hover"]: {
      color: "#0298A8 !important",
      background: "#4CCFE0 !important",
      borderRadius: "10px !important",
      ["& .MuiSvgIcon-root"]: {
        color: "#0298A8 !important",
      },
    },
  },

  menuItemActive: {
    color: "#0298A8 !important",
    background: "#4CCFE0 !important",
    borderRadius: "10px !important",
    ["& .MuiSvgIcon-root"]: {
      color: "#0298A8 !important",
    },
  },
  menuSubItem: {
    padding: "6px 16px !important",
    "& span": {
      fontSize: "17px",
      fontWeight: "500 !important",
      [theme.breakpoints.down("xl")]: {
        fontSize: "14px",
      },
      [theme.breakpoints.down("md")]: {
        fontSize: "12px",
      },
    },
    ["& .MuiListItemIcon-root"]: {
      minWidth: "15px",
    },
    ["& .MuiSvgIcon-root"]: {
      position: "relative",
      top: "-2px",
      color: "#858e9b",
      fontSize: "7px",
      [theme.breakpoints.down("md")]: {
        fontSize: "7px",
      },
    },
    ["&.MuiListItemButton-root:hover"]: {
      backgroundColor: "transparent !important",
      color: "#0298A8 !important",
      ["& .MuiSvgIcon-root"]: {
        color: "#0298A8 !important",
      },
    },
  },
  subMenuItemActive: {
    color: "#0298A8 !important",
    // background: "#4CCFE0 !important",
    // borderRadius: "10px !important",
    ["& .MuiSvgIcon-root"]: {
      color: "#0298A8 !important",
    },
  },
  // menuSubItem: {
  //   padding: "6px 32px 2px 38px !important",
  //   "& span": {
  //     fontSize: "16px",
  //     fontWeight: 500,
  //     [theme.breakpoints.down("xl")]: {
  //       fontSize: "12px",
  //     },
  //     [theme.breakpoints.down("md")]: {
  //       fontSize: "10px",
  //     },
  //   },
  //   ["& .MuiListItemIcon-root"]: {
  //     minWidth: "46px",
  //   },
  //   ["& .MuiSvgIcon-root"]: {
  //     color: "#858e9b",
  //     fontSize: "24px",
  //     [theme.breakpoints.down("md")]: {
  //       fontSize: "10px",
  //     },
  //   },
  // },

  MuiDrawer: {
    backgroundColor: "#fff !important",
    color: "#858e9b !important",
    // paddingRight: "7px",
    // paddingLeft: "7px",
  },
  logoStyle: {
    position: "relative",
    top: "8px",
    left: "-11px",
    cursor: "pointer",
    maxWidth: "155px",
  },
}));

const drawerWidth = 270;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   // background: "#fff !important",
//   // boxShadow: "none !important",
//   borderBottom: "1px solid #dddddd !important",
//   transition: theme.transitions.create(["margin", "width"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   zIndex: `${theme.zIndex.drawer + 1} !important`,
//   background: "#fff !important",
//   boxShadow: "none !important",
//   ...(open && {
//     // background: "#fff !important",
//     // boxShadow: "none !important",
//     borderBottom: "1px solid #dddddd !important",
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(["margin", "width"], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: "#fff !important",
  boxShadow: "none",
  zIndex: theme.zIndex.drawer + 1,
  borderBottom: "1px solid #dddddd !important",
  ...(open && {
    // width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Layout() {
  const classes = useStyles();
  let navigate = useNavigate();
  let pathname = useLocation().pathname;
  console.log("pathname", pathname);

  const { login, tuso_admin_panel, logout } = useContext(AuthContext);
  console.log("tuso_admin_panel", tuso_admin_panel);

  const theme = useTheme();
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [kycRequestOpen, setKycRequestOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [manageRolesOpen, setManageRolesOpen] = useState(false);
  const [manageAccessOpen, setManageAccessOpen] = useState(false);
  const [bankingLogOpen, setBankingLogOpen] = useState(false);

  const [openLoadingDialog, setOpenLoadingDialog] = useState(false);
  const time = parseInt(1000 * 60 * 120);

  const navigateRoutes = (routeName) => {
    navigate(routeName, { replace: true });
  };

  const fnLogout = () => {
    logout();
    navigate("/");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = useState(true);
  const manageOpen = (id) => {
    if (activeMenu === id) {
      setActiveMenu("");
    } else {
      setActiveMenu(id);
    }
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  const checkCategoryRoute = () => {
    const userPathname = [
      "/add-category",
      "/update-category",
      "/category-list",
    ];
    if (userPathname.includes(pathname)) {
      return true;
    } else {
      return false;
    }
  };
  const checkUserRoute = () => {
    const userPathname = [
      "/user-list",
      "/profile-creation",
      "/user-access-control",
    ];
    if (userPathname.includes(pathname)) {
      return true;
    } else {
      return false;
    }
  };
  const checkConfigurationRoute = () => {
    const userPathname = [
      "/country",
      "/role",
      "/department",
      "/category",
      "/quick-list",
      "/urgency",
      "/company",
    ];
    if (userPathname.includes(pathname)) {
      return true;
    } else {
      return false;
    }
  };
  const withoutLayout = ["/", "/forgot-password", "/reset-password", "/verify"];

  if (withoutLayout.includes(pathname)) {
    return (
      <Navigation
        openLoadingDialog={openLoadingDialog}
        setOpenLoadingDialog={setOpenLoadingDialog}
      />
    );
  } else if (!tuso_admin_panel.token) {
    return (
      <Navigation
        openLoadingDialog={openLoadingDialog}
        setOpenLoadingDialog={setOpenLoadingDialog}
      />
    );
  } else {
    return (
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <img
                src="/image/logoTuso.png"
                alt=""
                className={classes.logoStyle}
              />
              <IconButton
                onClick={handleDrawerClose}
                aria-label="open drawer"
                edge="start"
                style={{
                  ml: 2,
                  position: "relative",
                  top: "-14px",
                  left: "55px",
                  borderRadius: "10px",
                  border: "1px solid rgba(158,31,96,1)",

                  padding: "5px",
                  "&:hover": {
                    background: "rgba(158,31,96,1)",
                  },
                }}
                // sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                <MenuIcon
                  sx={{ color: "rgba(158,31,96,1)", fontSize: "26px" }}
                />
              </IconButton>
            </Typography>

            <div variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <IconButton
                id="basic-button"
                aria-controls={menuOpen ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={menuOpen ? "true" : undefined}
                onClick={handleClick}
                style={{
                  padding: 0,
                  color: "#9e1f63",
                  fontSize: "14px",
                  textTransform: "none",
                }}
              >
                <SettingsPowerIcon sx={{ width: 40, height: 40 }} />
              </IconButton>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigateRoutes("/change-password");
                  }}
                >
                  Change Password
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    fnLogout();
                  }}
                >
                  Sign Out
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          classes={{ paper: classes.MuiDrawer }}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            {/* <img
              src="/image/logoTuso.png"
              alt=""
              style={{
                width: "155px",
                display: "block",
                margin: "auto",
                cursor: "pointer",
              }}
            />
            <IconButton onClick={handleDrawerClose}>
              <MenuIcon />
            </IconButton> */}
          </DrawerHeader>
          <Divider />
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <Avatar
              src="/image/user.jpg"
              sx={{ width: 40, height: 40 }}
              style={{ display: "block", margin: " auto auto 10px auto" }}
            />
            {tuso_admin_panel ? tuso_admin_panel.email : ""}
          </div>
          <Divider />

          <List>
            <Link to="/dashboard" className={classes.linkStyle}>
              <ListItemButton
                className={`${classes.menuItem} ${
                  pathname === "/dashboard" ? classes.menuItemActive : null
                }`}
                onClick={() => {
                  manageOpen("Dashboard");
                }}
              >
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>

                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </Link>

            <ListItemButton
              // className={`${classes.menuItem}`}
              className={`${classes.menuItem} ${
                checkCategoryRoute() ? classes.menuItemActive : null
              }`}
              onClick={() => {
                manageOpen("Category");
              }}
            >
              {" "}
              <ListItemIcon>
                <PersonAddAlt1Icon />
              </ListItemIcon>
              <ListItemText primary="Category" />
              {activeMenu === "Category" ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse
              in={activeMenu === "Category"}
              timeout="auto"
              unmountOnExit
              style={{
                borderLeft: "1px solid rgba(31,158,158,0.7)",
                marginLeft: "25px",
              }}
            >
              <List component="div" disablePadding>
                <Link to="/add-category" className={classes.linkStyle}>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    className={`${classes.menuSubItem} ${
                      pathname === "/add-category"
                        ? classes.subMenuItemActive
                        : null
                    }`}
                  >
                    <ListItemIcon>
                      <CircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Category" />
                  </ListItemButton>
                </Link>
                

                <Link to="/category-list" className={classes.linkStyle}>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    className={`${classes.menuSubItem} ${
                      pathname === "/category-list"
                        ? classes.subMenuItemActive
                        : null
                    }`}
                  >
                    <ListItemIcon>
                      <CircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Category List" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>

            <ListItemButton
              className={`${classes.menuItem} ${
                checkUserRoute() ? classes.menuItemActive : null
              }`}
              onClick={() => {
                manageOpen("Location");
              }}
            >
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText primary="Location" />
              {activeMenu === "Location" ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse
              in={activeMenu === "Location"}
              timeout="auto"
              unmountOnExit
              style={{
                borderLeft: "1px solid rgba(31,158,158,0.7)",
                marginLeft: "25px",
              }}
            >
              <List component="div" disablePadding>
                <Link to="/user-list" className={classes.linkStyle}>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    className={`${classes.menuSubItem} ${
                      pathname === "/user-list"
                        ? classes.subMenuItemActive
                        : null
                    }`}
                  >
                    <ListItemIcon>
                      <CircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="User list" />
                  </ListItemButton>
                </Link>

                <Link to="/profile-creation" className={classes.linkStyle}>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    className={`${classes.menuSubItem} ${
                      pathname === "/profile-creation"
                        ? classes.subMenuItemActive
                        : null
                    }`}
                  >
                    <ListItemIcon>
                      <CircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile creation" />
                  </ListItemButton>
                </Link>
                <Link to="/user-access-control" className={classes.linkStyle}>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    className={`${classes.menuSubItem} ${
                      pathname === "/user-access-control"
                        ? classes.subMenuItemActive
                        : null
                    }`}
                  >
                    <ListItemIcon>
                      <CircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="User access control" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>

            <ListItemButton
              className={`${classes.menuItem} ${
                checkConfigurationRoute() ? classes.menuItemActive : null
              }`}
              onClick={() => {
                manageOpen("Filter");
              }}
            >
              <ListItemIcon>
                <LockResetIcon />
              </ListItemIcon>
              <ListItemText primary="Filter" />
              {activeMenu === "Filter" ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse
              in={activeMenu === "Filter"}
              timeout="auto"
              unmountOnExit
              style={{
                borderLeft: "1px solid rgba(31,158,158,0.7)",
                marginLeft: "25px",
              }}
            >
              <List component="div" disablePadding>
                <Link to="/country" className={classes.linkStyle}>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    className={`${classes.menuSubItem} ${
                      pathname === "/country" ? classes.subMenuItemActive : null
                    }`}
                  >
                    <ListItemIcon>
                      <CircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Country" />
                  </ListItemButton>
                </Link>

                <Link to="/role" className={classes.linkStyle}>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    className={`${classes.menuSubItem} ${
                      pathname === "/role" ? classes.subMenuItemActive : null
                    }`}
                  >
                    <ListItemIcon>
                      <CircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Role" />
                  </ListItemButton>
                </Link>
                <Link to="/department" className={classes.linkStyle}>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    className={`${classes.menuSubItem} ${
                      pathname === "/department"
                        ? classes.subMenuItemActive
                        : null
                    }`}
                  >
                    <ListItemIcon>
                      <CircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Department" />
                  </ListItemButton>
                </Link>
                <Link to="/category" className={classes.linkStyle}>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    className={`${classes.menuSubItem} ${
                      pathname === "/category"
                        ? classes.subMenuItemActive
                        : null
                    }`}
                  >
                    <ListItemIcon>
                      <CircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Category" />
                  </ListItemButton>
                </Link>
                <Link to="/quick-list" className={classes.linkStyle}>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    className={`${classes.menuSubItem} ${
                      pathname === "/quick-list"
                        ? classes.subMenuItemActive
                        : null
                    }`}
                  >
                    <ListItemIcon>
                      <CircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Quick list" />
                  </ListItemButton>
                </Link>

                <Link to="/urgency" className={classes.linkStyle}>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    className={`${classes.menuSubItem} ${
                      pathname === "/urgency" ? classes.subMenuItemActive : null
                    }`}
                  >
                    <ListItemIcon>
                      <CircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Urgency" />
                  </ListItemButton>
                </Link>
                <Link to="/company" className={classes.linkStyle}>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    className={`${classes.menuSubItem} ${
                      pathname === "/company" ? classes.subMenuItemActive : null
                    }`}
                  >
                    <ListItemIcon>
                      <CircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Company" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />

          <Navigation
            openLoadingDialog={openLoadingDialog}
            setOpenLoadingDialog={setOpenLoadingDialog}
          />
        </Main>
      </Box>
    );
  }
}
