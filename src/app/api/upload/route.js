import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const originalName = file.name || 'image.jpg';
    const ext = path.extname(originalName) || '.jpg';
    const cleanBase = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `teacher-${Date.now()}-${cleanBase}${ext}`;
    const filePath = path.join(uploadsDir, fileName);

    fs.writeFileSync(filePath, buffer);

    const fileUrl = `/uploads/${fileName}`;

    return NextResponse.json({
      success: true,
      url: fileUrl,
      fileName
    });
  } catch (err) {
    console.error('File upload error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
