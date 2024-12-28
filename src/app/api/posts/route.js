import { NextResponse } from 'next/server';
import { supabase } from '../../../utils/supabaseClient'; // Update path as needed

// Handle POST (Create a New Post) and GET (Fetch All Posts)
export async function POST(req) {
  try {
    const body = await req.json();
    const { title, content, authorId } = body;

    const { data, error } = await supabase
      .from('posts')
      .insert([{ title, content, authorId }]);

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase.from('posts').select('*').order('createdAt', { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
