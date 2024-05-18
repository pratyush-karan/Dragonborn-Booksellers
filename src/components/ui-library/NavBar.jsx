"use client";

import React, { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";

const pages = ["Home", "Books", "My Library", "Profile"];
const settings = ["Your Orders", "Wish List", "Logout"];

export default function NavBar({ children }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(null);

    if (e.target.textContent) {
      let route = "";
      switch (e.target.textContent) {
        case "Home":
          route = "/";
          break;
        case "Books":
          route = "/books";
          break;
        case "My Library":
          route = "/mylibrary";
          break;
        case "Profile":
          route = "/profile";
          break;
        case "Cart":
          route = "/cart";
          break;
      }
      router.push(route);
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    signOut();
  };

  const handleSignIn = () => {
    signIn();
  };

  const handleMenuItem = (setting) => {
    handleCloseUserMenu();
    switch (setting) {
      case "Your Orders":
        router.push("/orders");
        break;
      case "Wish List":
        router.push("/wishlist");
        break;
      case "Logout":
        handleLogout();
        break;
    }
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: 5,
      top: 0,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  const bookList = useSelector((state) => state.cartReducer);

  return (
    <>
      <AppBar
        position="static"
        sx={{
          bgcolor: `primary.dark`,
        }}
      >
        <Container sx={{ maxWidth: "90% !important" }}>
          <Toolbar disableGutters>
            <Box
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
              }}
            >
              <Image
                src="/icon.png"
                alt="dragon"
                width={50}
                height={50}
                onClick={() => router.push("/")}
              />
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="white"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
              }}
            >
              <Image
                src="/icon.png"
                alt="dragon"
                width={50}
                height={50}
                onClick={() => router.push("/")}
              />
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    display: "block",
                    color: (theme) => theme.palette.white.main,
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box
              sx={{
                flexGrow: 0,
                display: "flex",
                flexWrap: "nowrap",
                gap: "1rem",
              }}
            >
              <Button
                aria-label="cart"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
                onClick={() => router.push("/cart")}
              >
                <StyledBadge
                  badgeContent={bookList.totalItems}
                  color="secondary"
                >
                  <ShoppingCartIcon color="white" />
                </StyledBadge>
                <Typography
                  variant="body2"
                  sx={{ color: (theme) => theme.palette.white.main }}
                >
                  Cart
                </Typography>
              </Button>
              {session ? (
                <>
                  <Tooltip title="Open options">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src={session.user.image} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting, index) => (
                      <MenuItem
                        key={setting}
                        onClick={() => handleMenuItem(setting)}
                        sx={
                          index === settings.length - 1
                            ? { borderTop: 1, borderColor: "tertiary.light" }
                            : {}
                        }
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <>
                  <Button color="white" onClick={handleSignIn}>
                    Login
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {children}
    </>
  );
}
