'use client';

import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    fetchUser();

    // Listen for authentication changes
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <AppBar position="static" sx={{ background: '#1e3a8a' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ cursor: 'pointer' }} onClick={() => router.push('/')}>
          My Blog
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {user ? (
            <>
              <Avatar sx={{ backgroundColor: '#fff', color: '#1e3a8a' }}>
                {user.email[0].toUpperCase()}
              </Avatar>
              <Typography variant="body1">{user.email}</Typography>
              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{ textTransform: 'none', backgroundColor: '#fff', color: '#1e3a8a' }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={() => router.push('/login')}
                sx={{ textTransform: 'none', backgroundColor: '#fff', color: '#1e3a8a' }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                onClick={() => router.push('/register')}
                sx={{ textTransform: 'none', backgroundColor: '#fff', color: '#1e3a8a' }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
