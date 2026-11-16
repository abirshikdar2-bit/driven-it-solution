import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const originalName = file.name || 'image.jpg';
    const ext = path.extname(originalName).toLowerCase() || '.jpg';
    const cleanBase = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 30);
    const fileName = `driven-${Date.now()}-${cleanBase}${ext}`;

    const mimeTypes = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.webp': 'image/webp',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.avif': 'image/avif'
    };
    const contentType = file.type || mimeTypes[ext] || 'application/octet-stream';

    // 1. Primary: Upload directly to Supabase Storage 'driven_assets' bucket
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('driven_assets')
          .upload(fileName, buffer, {
            contentType,
            upsert: true
          });

        if (!uploadError && uploadData) {
          const { data: urlData } = supabase.storage
            .from('driven_assets')
            .getPublicUrl(fileName);

          if (urlData?.publicUrl) {
            return NextResponse.json({
              success: true,
              url: urlData.publicUrl,
              fileName,
              storage: 'supabase'
            });
          }
        } else {
          console.warn('Supabase storage upload error:', uploadError);
        }
      } catch (storageErr) {
        console.warn('Supabase storage upload exception:', storageErr);
      }
    }

    // 2. Fallback: Base64 data URL for Vercel serverless (when filesystem is read-only)
    if (buffer.length <= 4 * 1024 * 1024) {
      const base64Url = `data:${contentType};base64,${buffer.toString('base64')}`;
      return NextResponse.json({
        success: true,
        url: base64Url,
        fileName,
        storage: 'base64'
      });
    }

    // 3. Fallback: Local filesystem (for local dev environment)
    try {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      const filePath = path.join(uploadsDir, fileName);
      fs.writeFileSync(filePath, buffer);
      return NextResponse.json({
        success: true,
        url: `/uploads/${fileName}`,
        fileName,
        storage: 'local'
      });
    } catch (fsErr) {
      return NextResponse.json({ success: false, error: 'Failed to write file' }, { status: 500 });
    }
  } catch (err) {
    console.error('File upload error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
