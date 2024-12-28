'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../../utils/supabaseClient';
import { Box, Typography, CircularProgress } from '@mui/material';

export default function PostPage() {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data: post, error: postError } = await supabase
          .from('posts')
          .select(`
            id,
            title,
            content,
            created_at,
            authorid,
            users (
              email,
              full_name
            )
          `)
          .eq('id', id)
          .single();

        if (postError) {
          console.error('Error fetching post:', postError.message);
          setPost(null);
        } else {
          setPost(post);
        }
      } catch (error) {
        console.error('Unexpected error fetching post:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

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
    <Box sx={{ padding: 4 }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        By {post.users?.full_name || post.users?.email} on{' '}
        {new Date(post.created_at).toLocaleDateString()}
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        {post.content}
      </Typography>
    </Box>
  );
}
