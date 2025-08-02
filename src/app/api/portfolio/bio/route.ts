import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Bio } from '@/models/Portfolio';
import { requireAuth } from '@/lib/auth';

// GET - Fetch bio (public)
export async function GET() {
  try {
    await connectDB();
    
    const bio = await Bio.findOne().sort({ createdAt: -1 });
    
    return NextResponse.json({ bio });

  } catch (error) {
    console.error('Get bio error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create/Update bio (protected)
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    requireAuth(request);
    
    await connectDB();
    
    const { title, subtitle, description, profileImage, resumeLink } = await request.json();

    // Validate required fields
    if (!title || !subtitle || !description) {
      return NextResponse.json(
        { error: 'Title, subtitle, and description are required' },
        { status: 400 }
      );
    }

    // Check if bio exists, update or create
    let bio = await Bio.findOne();
    
    if (bio) {
      // Update existing bio
      bio.title = title;
      bio.subtitle = subtitle;
      bio.description = description;
      bio.profileImage = profileImage || bio.profileImage;
      bio.resumeLink = resumeLink || bio.resumeLink;
      await bio.save();
    } else {
      // Create new bio
      bio = new Bio({
        title,
        subtitle,
        description,
        profileImage,
        resumeLink,
      });
      await bio.save();
    }

    return NextResponse.json(
      { message: 'Bio updated successfully', bio },
      { status: 200 }
    );

  } catch (error) {
    console.error('Update bio error:', error);
    
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
