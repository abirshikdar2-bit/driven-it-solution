import { NextResponse } from 'next/server';
import path from 'path';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const originalName = body.fileName || 'full-website-screenshot.png';
    const ext = path.extname(originalName).toLowerCase() || '.png';
    const cleanBase = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 30);
    const fileName = `driven-full-${Date.now()}-${cleanBase}${ext}`;
    const contentType = body.contentType || 'image/png';

    if (!isSupabaseConfigured || !supabase) {
      return NextResponse.json({ success: false, error: 'Supabase storage is not configured' }, { status: 500 });
    }

    // Generate signed upload URL directly from Supabase Storage
    const { data: signData, error: signError } = await supabase.storage
      .from('driven_assets')
      .createSignedUploadUrl(fileName);

    if (signError || !signData) {
      return NextResponse.json({ success: false, error: signError?.message || 'Failed to create signed URL' }, { status: 500 });
    }

    // Get the permanent public CDN URL that the file will have once uploaded
    const { data: publicUrlData } = supabase.storage
      .from('driven_assets')
      .getPublicUrl(fileName);

    return NextResponse.json({
      success: true,
      signedUrl: signData.signedUrl,
      path: signData.path,
      token: signData.token,
      publicUrl: publicUrlData?.publicUrl,
      fileName
    });
  } catch (err) {
    console.error('Signed upload error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
