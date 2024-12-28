'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '../../../../utils/supabaseClient';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';

export default function EditPost() {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Fetch the post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('id, title, content')
          .eq('id', id)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        setPost(data);
        setTitle(data.title);
        setContent(data.content);
      } catch (err) {
        console.error('Error fetching post:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('posts')
        .update({ title, content })
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      // Redirect to the post page after saving
      router.push(`/posts/${id}`);
    } catch (err) {
      console.error('Error updating post:', err.message);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!post) {
    return (
      <Typography align="center" sx={{ mt: 5 }}>
        Post not found
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Edit Post
      </Typography>
      {error && (
        <Typography variant="body1" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSave}>
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
          disabled={saving}
          sx={{ mb: 2 }}
        >
          {saving ? <CircularProgress size={24} /> : 'Save Changes'}
        </Button>
        <Button
          type="button"
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={() => router.push(`/posts/${id}`)}
        >
          Cancel
        </Button>
      </form>
    </Box>
  );
}
