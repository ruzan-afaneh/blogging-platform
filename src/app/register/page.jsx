'use client';
import { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { Box, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, username } = formData;

    // Basic input validation
    if (!email || !password || !username) {
      setError('All fields are required.');
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (error) throw error;

      setSuccess('Account created successfully! Redirecting to the home page...');
      setError(null);

      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      console.error('Error registering user:', err.message);
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
          Create an Account
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Username"
            type="text"
            margin="normal"
            required
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            placeholder="Enter your username"
          />
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            margin="normal"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter your email"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Enter your password"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              marginTop: 2,
              padding: 1.5,
              fontSize: '1rem',
              backgroundColor: '#007BFF',
              ':hover': { backgroundColor: '#0056b3' },
            }}
          >
            Register
          </Button>
        </Box>
        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          Already have an account?{' '}
          <a href="/login" style={{ color: '#007BFF' }}>
            Log in
          </a>
        </Typography>
      </Paper>
    </Box>
  );
}
