import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Experience } from '@/models/Portfolio';
import { requireAuth } from '@/lib/auth';

// GET - Fetch all experience (public)
export async function GET() {
  try {
    await connectDB();
    const experience = await Experience.find().sort({ order: 1, startDate: -1 });
    return NextResponse.json({ experience });
  } catch (error) {
    console.error('Get experience error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new experience (protected)
export async function POST(request: NextRequest) {
  try {
    requireAuth(request);
    await connectDB();
    
    const { company, position, location, startDate, endDate, current, description, technologies, achievements, companyLogo, order } = await request.json();

    if (!company || !position || !startDate || !description) {
      return NextResponse.json({ error: 'Company, position, start date, and description are required' }, { status: 400 });
    }

    const experience = new Experience({
      company, position, location, startDate, endDate, current: current || false,
      description, technologies: technologies || [], achievements: achievements || [],
      companyLogo, order: order || 0,
    });

    await experience.save();
    return NextResponse.json({ message: 'Experience created successfully', experience }, { status: 201 });

  } catch (error) {
    console.error('Create experience error:', error);
    if (error.message === 'No token provided' || error.message === 'Invalid token') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
