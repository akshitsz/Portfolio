import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Project } from '@/models/Portfolio';
import { requireAuth } from '@/lib/auth';

// PUT - Update project (protected)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;

    // Validate required fields
    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    // Check if project exists
    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Check if another project with same title exists (excluding current)
    const existingProject = await Project.findOne({ 
      title: { $regex: new RegExp(`^${title}$`, 'i') },
      _id: { $ne: id }
    });
    if (existingProject) {
      return NextResponse.json(
        { error: 'Project with this title already exists' },
        { status: 400 }
      );
    }

    // Update project
    project.title = title;
    project.description = description;
    project.shortDescription = shortDescription || project.shortDescription;
    project.technologies = technologies || project.technologies;
    project.githubUrl = githubUrl || project.githubUrl;
    project.liveUrl = liveUrl || project.liveUrl;
    project.image = image || project.image;
    project.featured = featured !== undefined ? featured : project.featured;
    project.status = status || project.status;
    project.order = order !== undefined ? order : project.order;

    await project.save();

    return NextResponse.json(
      { message: 'Project updated successfully', project },
      { status: 200 }
    );

  } catch (error) {
    console.error('Update project error:', error);
    
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

// DELETE - Delete project (protected)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication
    requireAuth(request);

    await connectDB();

    const { id } = await params;

    // Check if project exists
    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    await Project.findByIdAndDelete(id);

    return NextResponse.json(
      { message: 'Project deleted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Delete project error:', error);
    
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
