import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Project } from '@/models/Portfolio';
import { requireAuth } from '@/lib/auth';

// GET - Fetch all projects (public)
export async function GET() {
  try {
    await connectDB();
    
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    
    return NextResponse.json({ projects });

  } catch (error) {
    console.error('Get projects error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new project (protected)
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    requireAuth(request);
    
    await connectDB();
    
    const { 
      title, 
      description, 
      shortDescription,
      technologies, 
      githubUrl, 
      liveUrl, 
      image, 
      featured, 
      status, 
      order 
    } = await request.json();

    // Validate required fields
    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    // Check if project already exists
    const existingProject = await Project.findOne({ 
      title: { $regex: new RegExp(`^${title}$`, 'i') } 
    });
    if (existingProject) {
      return NextResponse.json(
        { error: 'Project with this title already exists' },
        { status: 400 }
      );
    }

    const project = new Project({
      title,
      description,
      shortDescription,
      technologies: technologies || [],
      githubUrl,
      liveUrl,
      image,
      featured: featured || false,
      status: status || 'Completed',
      order: order || 0,
    });

    await project.save();

    return NextResponse.json(
      { message: 'Project created successfully', project },
      { status: 201 }
    );

  } catch (error) {
    console.error('Create project error:', error);
    
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
