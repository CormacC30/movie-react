import React, { useState, MouseEvent, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useMedia } from "../../contexts/mediaContext";
import { MediaContext } from "../../contexts/mediaContext";
import { useAuth0 } from "@auth0/auth0-react";

interface SiteHeaderProps {
  tabIndex: number;
}

const styles = {
  title: {
    flexGrow: 1,
  },
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader: React.FC<SiteHeaderProps> = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { tabIndex } = useContext(MediaContext);

  // const menuOptions = [
  //   { label: "Home", path: "/" },
  //   { label: "Favorites", path: "/favourites" },
  //   { label: "Top Rated", path: "/toprated" },
  //   { label: "Fantasy Movie", path: "/fantasy-movie" },
  // ];

  // Public routes (available to all users)
  const publicMenuOptions = [{ label: "Home", path: "/" }];

  // Protected routes (only available when authenticated)
  const protectedMenuOptions = [
    { label: "Fantasy Movie", path: "/fantasy-movie" },
    { label: "Favorites", path: "/favourites" },
    { label: "Top Rated", path: "/toprated" },
  ];

  const lastOption =
    tabIndex === 0 //conditional rendering the last menu optoin
      ? { label: "Upcoming Movies", path: "/movies/upcoming" }
      : { label: "On The Air", path: "/tv/on-the-air" };

  console.log("tab index ", tabIndex);
  console.log("lastOption ", lastOption);

  const handleMenuSelect = (pageURL: string) => {
    navigate(pageURL);
  };

  const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" elevation={0} color="primary">
        <Toolbar>
          <Typography variant="h4" sx={styles.title}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={styles.title}>
            All you ever wanted to know about Movies!
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                size="large"
              >
                <MenuIcon />
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
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {publicMenuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
                {isAuthenticated &&
                  protectedMenuOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                {isAuthenticated && (
                  <MenuItem
                    key={lastOption.label}
                    onClick={() => handleMenuSelect(lastOption.path)}
                  >
                    {lastOption.label}
                  </MenuItem>
                )}

                {isAuthenticated ? (
                  <MenuItem
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    Logout
                  </MenuItem>
                ) : (
                  <>
                    <MenuItem onClick={() => loginWithRedirect()}>
                      Login
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/signup")}>
                      Sign Up
                    </MenuItem>
                  </>
                )}
              </Menu>
            </>
          ) : (
            <>
              {publicMenuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path)}
                >
                  {opt.label}
                </Button>
              ))}
              {isAuthenticated &&
                protectedMenuOptions.map((opt) => (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </Button>
                ))}
              {isAuthenticated && (
                <Button
                  key={lastOption.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(lastOption.path)}
                >
                  {lastOption.label}
                </Button>
              )}

              {isAuthenticated ? (
                <Button
                  variant="contained"
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    onClick={() => loginWithRedirect()}
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
