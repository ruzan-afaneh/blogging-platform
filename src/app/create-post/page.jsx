'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../utils/supabaseClient';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error('Error checking session:', sessionError.message);
      }

      if (!session) {
        // Redirect to login page with a message
        router.push('/login?message=Please login to create a post');
      } else {
        setIsAuthorized(true);
      }
    };

    checkAuth();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Get the logged-in user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw new Error(userError.message);
      }

      if (!user) {
        throw new Error('You must be logged in to create a post.');
      }

      // Insert the new post into the `posts` table
      const { error: insertError } = await supabase.from('posts').insert([
        {
          title,
          content,
          authorid: user.id,
          author_email: user.email,
        },
      ]);

      if (insertError) {
        throw new Error(insertError.message);
      }

      router.push('/');
    } catch (err) {
      console.error('Error creating post:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthorized) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Create a New Post
      </Typography>
      {error && (
        <Typography variant="body1" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          sx={{ mb: 3 }}
        />
        <TextField
          label="Content"
          variant="outlined"
          multiline
          rows={6}
          fullWidth
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          sx={{ mb: 3 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mb: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Create Post'}
        </Button>
        <Button
          type="button"
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={() => router.push('/')}
        >
          Cancel
        </Button>
      </form>
    </Box>
  );
}
