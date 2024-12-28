'use client';
import { useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/navigation";
import PostCard from "@/components/PostCard";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("id, title, content, created_at, username")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching posts:", error.message);
        } else {
          setPosts(data || []);
        }
      } catch (error) {
        console.error("Unexpected error fetching posts:", error.message);
      } finally {
        setLoading(false);
      }
    };
    

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(120deg, #1e3a8a, #2563eb)",
          color: "#fff",
          textAlign: "center",
          borderRadius: 2,
          mb: 4,
          p: 4,
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Welcome to Our Blog
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ maxWidth: 600, margin: "0 auto" }}
        >
          Discover inspiring stories, tips, and more from our talented authors.
          Stay updated with the latest trends and ideas!
        </Typography>
      </Box>

      {/* Post Grid */}
      <Box>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ mb: 3 }}
        >
          Latest Posts
        </Typography>
        <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <PostCard
                post={post}
                onClick={() => router.push(`/posts/${post.id}`)}
              />
            </Grid>
          ))}
        </Grid>

        {/* Add Post Button */}
        <Tooltip title="Add a new blog post" arrow>
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => router.push("/create-post")}
            sx={{
              position: "fixed",
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
