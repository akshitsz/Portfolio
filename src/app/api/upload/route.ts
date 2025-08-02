import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { requireAuth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    requireAuth(request);

    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const type: string = data.get('type') as string; // 'image' or 'resume'

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    if (!type || !['image', 'resume'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Must be "image" or "resume"' },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum 10MB allowed.' },
        { status: 400 }
      );
    }

    // Validate file types
    if (type === 'image') {
      const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedImageTypes.includes(file.type)) {
        return NextResponse.json(
          { error: 'Invalid image format. Only JPEG, PNG, and WebP are allowed.' },
          { status: 400 }
        );
      }
    } else if (type === 'resume') {
      const allowedResumeTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedResumeTypes.includes(file.type)) {
        return NextResponse.json(
          { error: 'Invalid resume format. Only PDF, DOC, and DOCX are allowed.' },
          { status: 400 }
        );
      }
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create upload directory structure
    const uploadDir = join(process.cwd(), 'public', 'uploads', type === 'image' ? 'images' : 'resumes');
    
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      // Directory might already exist, that's fine
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${type}_${timestamp}.${fileExtension}`;
    const filePath = join(uploadDir, fileName);

    // Write file to disk
    await writeFile(filePath, buffer);

    // Return the public URL
    const publicUrl = `/uploads/${type === 'image' ? 'images' : 'resumes'}/${fileName}`;

    return NextResponse.json({
      message: 'File uploaded successfully',
      url: publicUrl,
      fileName: fileName,
      fileSize: file.size,
      fileType: file.type
    });

  } catch (error) {
    console.error('Upload error:', error);
    
    if (error.message === 'No token provided' || error.message === 'Invalid token') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
