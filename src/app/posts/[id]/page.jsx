'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '../../../utils/supabaseClient';
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Stack,
  TextField,
  Alert,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function PostPage() {
  const { id } = useParams(); // Get the post ID from the URL
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showActions, setShowActions] = useState(false); // To toggle action buttons
  const [editedPost, setEditedPost] = useState({ title: '', content: '' });

  // Fetch post details and user session
  useEffect(() => {
    const fetchPostAndUser = async () => {
      try {
        // Fetch the logged-in user
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) throw new Error(userError.message);
        setCurrentUser(userData?.user);

        // Fetch the post
        const { data: postData, error: postError } = await supabase
          .from('posts')
          .select(`
            id,
            title,
            content,
            created_at,
            authorid,
            author_email
          `)
          .eq('id', id)
          .single();

        if (postError) {
          throw new Error(postError.message);
        }
        setPost(postData);
        setEditedPost({ title: postData.title, content: postData.content });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndUser();
  }, [id]);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        const { error } = await supabase.from('posts').delete().eq('id', id);
        if (error) throw new Error(error.message);
        router.push('/'); // Redirect to the homepage after deletion
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    setShowActions(false); // Hide action buttons when editing
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('posts')
        .update({
          title: editedPost.title,
          content: editedPost.content,
        })
        .eq('id', id);

      if (error) throw new Error(error.message);

      setPost((prev) => ({ ...prev, ...editedPost }));
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleActions = () => {
    setShowActions((prev) => !prev);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 4 }}>
        <Alert severity="error">{error}</Alert>
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

  const isAuthor = currentUser?.id === post.authorid;

  return (
    <Box sx={{ padding: 4 }}>
      {isEditing ? (
        <>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            value={editedPost.title}
            onChange={(e) => setEditedPost((prev) => ({ ...prev, title: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Content"
            variant="outlined"
            multiline
            rows={6}
            value={editedPost.content}
            onChange={(e) => setEditedPost((prev) => ({ ...prev, content: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleEditToggle}>
              Cancel
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              {post.title}
            </Typography>
            {isAuthor && (
              <IconButton
                onClick={toggleActions}
                sx={{ marginLeft: 2 }}
              >
                <EditIcon color="primary" />
              </IconButton>
            )}
          </Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            By {post.author_email || 'Unknown'} on {new Date(post.created_at).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {post.content}
          </Typography>
        </>
      )}

      {isAuthor && !isEditing && showActions && (
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleEditToggle}>
            Edit
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Stack>
      )}
    </Box>
  );
}
