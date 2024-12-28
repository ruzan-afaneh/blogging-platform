import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Chip,
  Avatar,
  Button,
  Box,
} from "@mui/material";

export const PostCard = ({ post, onClick }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
        borderRadius: 4,
        transition: "transform 0.3s, box-shadow 0.3s",
        ":hover": {
          transform: "scale(1.03)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, padding: 3 }}>
        {/* Title */}
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          sx={{
            color: "#333",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
          }}
        >
          {post.title}
        </Typography>

        {/* Excerpt */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            overflow: "hidden",
          }}
        >
          {post.content.slice(0, 150)}...
        </Typography>

        {/* Author Info */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Avatar sx={{ bgcolor: "#1e3a8a", mr: 1 }}>
            {post.author_email?.[0]?.toUpperCase() || "?"}
          </Avatar>
          <Typography variant="body2" color="text.secondary">
            {post.author_email || "Unknown"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions
        sx={{
          padding: 2,
          justifyContent: "space-between",
        }}
      >
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={onClick}
          sx={{
            textTransform: "capitalize",
            fontWeight: "bold",
            paddingX: 2,
            paddingY: 1,
          }}
        >
          Read More
        </Button>
        <Chip
          label={new Date(post.created_at).toLocaleDateString()}
          variant="outlined"
          sx={{ fontSize: "0.75rem" }}
        />
      </CardActions>
    </Card>
  );
};

export default PostCard