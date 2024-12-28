import { NextResponse } from 'next/server';
import { supabase } from '../../../../utils/supabaseClient'; // Update path as needed

// GET: Fetch a Single Post by ID
export async function GET(req, { params }) {
  try {
    const { id } = params;
    const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();

    if (error) return NextResponse.json({ error: error.message }, { status: 404 });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

// PUT: Update a Post by ID
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { title, content } = body;

    const { data, error } = await supabase.from('posts').update({ title, content }).eq('id', id);

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

// DELETE: Delete a Post by ID
export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const { data, error } = await supabase.from('posts').delete().eq('id', id);

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
