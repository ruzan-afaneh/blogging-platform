'use client';
import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Chip,
  IconButton,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data.slice(0, 10)); // Limit to 10 posts
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Typography align="center" sx={{ mt: 5 }}>Loading...</Typography>;
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
          Discover inspiring stories, tips, and more from our talented authors. Stay updated with
          the latest trends and ideas!
        </Typography>
      </Box>

      {/* Post Grid */}
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Latest Posts
        </Typography>
        <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  borderRadius: 3,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  ':hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {post.body.slice(0, 100)}...
                  </Typography>
                  <Chip
                    avatar={<Avatar>{post.userId}</Avatar>}
                    label={`Author ${post.userId}`}
                    variant="outlined"
                    sx={{ mb: 1 }}
                  />
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                  <Box>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => alert(`Viewing post: ${post.title}`)}
                    >
                      Read More
                    </Button>
                  </Box>
                  <Box>
                    <IconButton aria-label="like">
                      <FavoriteBorderIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
