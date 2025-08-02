import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Experience } from '@/models/Portfolio';
import { requireAuth } from '@/lib/auth';

// PUT - Update experience (protected)
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    requireAuth(request);
    await connectDB();

    const { company, position, location, startDate, endDate, current, description, technologies, achievements, companyLogo, order } = await request.json();
    const { id } = await params;

    if (!company || !position || !startDate || !description) {
      return NextResponse.json({ error: 'Company, position, start date, and description are required' }, { status: 400 });
    }

    const experience = await Experience.findById(id);
    if (!experience) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }

    experience.company = company;
    experience.position = position;
    experience.location = location || experience.location;
    experience.startDate = startDate;
    experience.endDate = endDate || experience.endDate;
    experience.current = current !== undefined ? current : experience.current;
    experience.description = description;
    experience.technologies = technologies || experience.technologies;
    experience.achievements = achievements || experience.achievements;
    experience.companyLogo = companyLogo || experience.companyLogo;
    experience.order = order !== undefined ? order : experience.order;

    await experience.save();
    return NextResponse.json({ message: 'Experience updated successfully', experience }, { status: 200 });

  } catch (error) {
    console.error('Update experience error:', error);
    if (error.message === 'No token provided' || error.message === 'Invalid token') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete experience (protected)
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    requireAuth(request);
    await connectDB();

    const { id } = await params;
    const experience = await Experience.findById(id);
    if (!experience) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }

    await Experience.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Experience deleted successfully' }, { status: 200 });

  } catch (error) {
    console.error('Delete experience error:', error);
    if (error.message === 'No token provided' || error.message === 'Invalid token') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
