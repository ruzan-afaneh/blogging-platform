'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Box, TextField, Button, Typography } from '@mui/material';

export default function EditPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: post.title, content: post.content }),
      });

      if (!response.ok) throw new Error('Failed to update post');
      alert('Post updated successfully!');
      router.push(`/posts/${id}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return <Typography align="center" sx={{ mt: 5 }}>Loading...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Edit Blog Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          margin="normal"
          value={post?.title || ''}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          required
        />
        <TextField
          fullWidth
          label="Content"
          variant="outlined"
          margin="normal"
          multiline
          rows={6}
          value={post?.content || ''}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Save Changes
        </Button>
      </form>
    </Box>
  );
}
