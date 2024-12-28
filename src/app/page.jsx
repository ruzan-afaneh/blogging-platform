'use client';
import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Avatar,
  Button,
  Tooltip,
  Fab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { supabase } from '../utils/supabaseClient'; // Adjust path as needed
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      try {
        // Fetch posts using the RPC function
        const { data, error } = await supabase.rpc('fetch_posts_with_authors');

        if (error) {
          console.error('Error fetching posts with authors:', error.message);
        } else {
          console.log('Fetched posts with authors:', data);
          setPosts(data); // Update the state with fetched posts
        }
      } catch (error) {
        console.error('Unexpected error fetching posts:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsAndUsers();
  }, []);

  if (loading) {
    return (
      <Typography align="center" sx={{ mt: 5 }}>
        Loading...
      </Typography>
    );
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(120deg, #1e3a8a, #2563eb)',
          color: '#fff',
          padding: 6,
          textAlign: 'center',
          borderRadius: 2,
          mb: 4,
        }}
      >
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Welcome to Our Blog
        </Typography>
        <Typography variant="subtitle1" sx={{ maxWidth: 600, margin: '0 auto' }}>
          Discover inspiring stories, tips, and more from our talented authors.
          Stay updated with the latest trends and ideas!
        </Typography>
      </Box>

      {/* Post Grid */}
      <Box sx={{ padding: 3, position: 'relative' }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Latest Posts
        </Typography>
        <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.post_id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  borderRadius: 3,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: 'pointer',
                  ':hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
                  },
                }}
                onClick={() => router.push(`/posts/${post.post_id}`)} // Navigate to dynamic post page
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {post.content.slice(0, 100)}...
                  </Typography>
                  <Chip
                    avatar={
                      <Avatar>{post.author_email?.[0]?.toUpperCase() || '?'}</Avatar>
                    }
                    label={`Author: ${post.author_email || 'Unknown'}`}
                    variant="outlined"
                  />
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => router.push(`/posts/${post.post_id}`)}
                  >
                    Read More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Add Post Button */}
        <Tooltip title="Add a new blog post" arrow>
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => router.push('/create-post')}
            sx={{
              position: 'fixed',
              bottom: 20,
              right: 20,
            }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>
    </Box>
  );
}
