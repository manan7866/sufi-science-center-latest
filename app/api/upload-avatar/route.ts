import { NextResponse } from 'next/server';
import crypto from 'crypto';

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET || 'ssc_profiles';

function generateSignature(params: Record<string, string | number>, secret: string): string {
  // Sort params alphabetically and join as key=value&key=value
  const sorted = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join('&');
  // SHA1 hash of the string + secret
  return crypto.createHash('sha1').update(sorted + secret).digest('hex');
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image must be under 5 MB.' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Only JPG, PNG, and WebP images are allowed.' }, { status: 400 });
    }

    // If Cloudinary is not configured, return base64 data URL for development
    if (!CLOUDINARY_CLOUD_NAME || CLOUDINARY_CLOUD_NAME === 'demo') {
      console.warn('⚠️ Cloudinary not configured. Using base64 fallback.');
      const base64 = Buffer.from(await file.arrayBuffer()).toString('base64');
      const dataUrl = `data:${file.type};base64,${base64}`;
      return NextResponse.json({ url: dataUrl });
    }

    // Convert file to base64 for Cloudinary upload
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString('base64');
    const fileUri = `data:${file.type};base64,${base64}`;

    // Generate timestamp and signature for signed upload
    const timestamp = Math.round(Date.now() / 1000);
    const signatureParams: Record<string, string | number> = {
      timestamp,
      upload_preset: CLOUDINARY_UPLOAD_PRESET,
      folder: 'ssc-avatars',
    };

    const signature = generateSignature(signatureParams, CLOUDINARY_API_SECRET!);

    // Upload to Cloudinary with signed parameters
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
    const uploadFormData = new FormData();
    uploadFormData.append('file', fileUri);
    uploadFormData.append('api_key', CLOUDINARY_API_KEY!);
    uploadFormData.append('timestamp', String(timestamp));
    uploadFormData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    uploadFormData.append('signature', signature);
    uploadFormData.append('folder', 'ssc-avatars');

    const res = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: uploadFormData,
    });

    if (!res.ok) {
      const error = await res.json();
      console.error('Cloudinary upload error:', error);
      return NextResponse.json({ error: error.error?.message || 'Upload failed' }, { status: 500 });
    }

    const data = await res.json();

    return NextResponse.json({
      url: data.secure_url,
      publicId: data.public_id,
    });
  } catch (error) {
    console.error('[upload-avatar]', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
