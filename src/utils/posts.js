import { supabase } from '../utils/supabaseClient';

export async function fetchPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      content,
      created_at,
      user_id,
      users (full_name, email)
    `);

  if (error) {
    console.error('Error fetching posts:', error.message);
    throw error;
  }

  return data;
}
