'use client';
import { Box, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#F3F4F6',
        padding: 2,
        borderTop: '1px solid #E5E7EB',
        mt: 'auto',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        © {new Date().getFullYear()} Blogging Platform. All rights reserved.
      </Typography>
      <Box>
        <IconButton href="https://facebook.com" target="_blank" aria-label="Facebook">
          <FacebookIcon />
        </IconButton>
        <IconButton href="https://twitter.com" target="_blank" aria-label="Twitter">
          <TwitterIcon />
        </IconButton>
        <IconButton href="https://instagram.com" target="_blank" aria-label="Instagram">
          <InstagramIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
