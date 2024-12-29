'use client';

import React from "react";

import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { Box, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [redirectMessage, setRedirectMessage] = useState('');
  const [redirectTo, setRedirectTo] = useState('/'); // Default redirection path
  const router = useRouter();

  useEffect(() => {
    // Extract the "message" and "redirectTo" parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    const redirectToParam = urlParams.get('redirectTo');

    if (message) setRedirectMessage(message);
    if (redirectToParam) setRedirectTo(redirectToParam); // Save the redirectTo value
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      router.push(redirectTo);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: '100%',
          maxWidth: 400,
          borderRadius: 3,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
          Welcome Back
        </Typography>
        {redirectMessage && (
          <Alert severity="info" sx={{ marginBottom: 2 }}>
            {redirectMessage}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            margin="normal"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              marginTop: 2,
              padding: 1.5,
              fontSize: '1rem',
              backgroundColor: '#28a745',
              ':hover': { backgroundColor: '#218838' },
            }}
          >
            Login
          </Button>
        </Box>
        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          Don't have an account? <a href="/register" style={{ color: '#28a745' }}>Register</a>
        </Typography>
      </Paper>
    </Box>
  );
}
