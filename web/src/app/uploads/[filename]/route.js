import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request, context) {
  try {
    const params = await context.params;
    const filename = params?.filename;

    if (!filename) {
      return new NextResponse('Filename missing', { status: 400 });
    }

    // Sanitize filename to prevent path traversal
    const safeFilename = path.basename(filename);
    let filePath = path.join(process.cwd(), 'public', 'uploads', safeFilename);
    if (!fs.existsSync(filePath)) {
      const fallbackPath = path.join(process.cwd(), 'web', 'public', 'uploads', safeFilename);
      if (fs.existsSync(fallbackPath)) {
        filePath = fallbackPath;
      } else {
        return new NextResponse('File not found', { status: 404 });
      }
    }

    const fileBuffer = fs.readFileSync(filePath);
    const ext = path.extname(safeFilename).toLowerCase();

    const mimeTypes = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.webp': 'image/webp',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml'
    };

    const contentType = mimeTypes[ext] || 'application/octet-stream';

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });
  } catch (err) {
    console.error('Error serving upload:', err);
    return new NextResponse('Internal error', { status: 500 });
  }
}
