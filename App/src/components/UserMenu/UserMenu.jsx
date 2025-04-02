import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  Divider,
} from "@mui/material";
import {
  Logout as LogoutIcon,
  AccountCircle as ProfileIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import "./UserMenu.css";

const UserMenu = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const userName = localStorage.getItem("userName") || "User";
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    handleMenuClose();
    navigate("/");
  };

  // const handleProfile = () => {
  //   handleMenuClose();
  //   navigate("/profile");
  // };

  // const handleSettings = () => {
  //   handleMenuClose();
  //   navigate("/settings");
  // };

  return (
    <div className="user-menu">
      <IconButton className="user-menu-button" onClick={handleMenuOpen}>
        <Avatar className="user-avatar">
          {userName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Menu
        className="user-dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}>
        <div style={{ padding: "8px 16px" }}>
          <Typography variant="body1" style={{ fontWeight: 500 }}>
            {userName}
          </Typography>
        </div>
        <Divider style={{ margin: "4px 0" }} />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body1">Logout</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
