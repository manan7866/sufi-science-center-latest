import { NextResponse } from 'next/server';

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'demo';
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString('base64');
    const fileUri = `data:${file.type};base64,${base64}`;

    // Upload to Cloudinary
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
    const uploadFormData = new FormData();
    uploadFormData.append('file', fileUri);
    uploadFormData.append('upload_preset', 'ssc_profiles');

    const res = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: uploadFormData,
    });

    if (!res.ok) {
      const error = await res.json();
      console.error('Cloudinary upload error:', error);
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }

    const data = await res.json();

    return NextResponse.json({
      url: data.secure_url,
      publicId: data.public_id,
    });
  } catch (error) {
    console.error('[upload-avatar]', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
