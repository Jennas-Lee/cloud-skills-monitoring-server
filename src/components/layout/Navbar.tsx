import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';

import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { authenticatedProps, settingsProps } from '../middlewares/props';

const pages = ['Cams', 'Dashboard'];

const UserAvatar = (props: authenticatedProps) => {
  if (props.authenticated) {
    return (
      <Avatar>
        <PersonIcon/>
      </Avatar>
    )

  } else {
    return (
      <Avatar>?</Avatar>
    )
  }
}

const SettingMenu = (props: settingsProps) => {
  let settings: string[][] = [];

  if (props.authenticated) {
    settings.push(['Account', '/auth/account']);
    settings.push(['Sign Out', '/auth/signout']);
  } else {
    settings.push(['Sign In', '/auth/signin']);
    settings.push(['Sign Up', '/auth/signup']);
  }

  return (
    <>
      {settings.map((setting) => (
        <MenuItem key={setting[0]} onClick={props.handleCloseUserMenu}>
          <Typography textAlign="center">
            <Link
              to={setting[1]}
              component={RouterLink}
              aria-current="page"
              color="inherit"
              underline="none"
            >
              {setting[0]}
            </Link>
          </Typography>
        </MenuItem>
      ))}
    </>
  )
}

const Navbar = (props: authenticatedProps) => {
  // let settings: string[][] = [
  //   ['Sign In', '/signin'],
  //   ['Sign Up', '/signup'],
  // ];

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    console.log(props.authenticated)

  });

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Link
              to="/"
              component={RouterLink}
              aria-current="page"
              color="inherit"
              underline="none"
            >
              클라우드컴퓨팅 기능경기대회 모니터링
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <Link
              to="/"
              component={RouterLink}
              aria-current="page"
              color="inherit"
              underline="none"
            >
              클라우드컴퓨팅 기능경기대회 모니터링
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <UserAvatar authenticated={props.authenticated}/>
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <SettingMenu handleCloseUserMenu={handleCloseUserMenu} authenticated={props.authenticated}/>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
