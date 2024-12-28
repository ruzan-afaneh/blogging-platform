'use client';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter(); // Next.js router for client-side navigation

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const navigateTo = (path) => {
    handleMenuClose();
    router.push(path); // Navigate using Next.js router
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1F2937' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => navigateTo('/')}
        >
          Blogging Platform
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit" onClick={() => navigateTo('/')}>Home</Button>
          <Button color="inherit" onClick={() => navigateTo('/about')}>About</Button>
          <Button color="inherit" onClick={() => navigateTo('/contact')}>Contact</Button>
        </Box>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ display: { xs: 'flex', md: 'none' } }}
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuItem onClick={() => navigateTo('/')}>Home</MenuItem>
          <MenuItem onClick={() => navigateTo('/about')}>About</MenuItem>
          <MenuItem onClick={() => navigateTo('/contact')}>Contact</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
