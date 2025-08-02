import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Skill } from '@/models/Portfolio';
import { requireAuth } from '@/lib/auth';

// GET - Fetch all skills (public)
export async function GET() {
  try {
    await connectDB();
    
    const skills = await Skill.find().sort({ order: 1, createdAt: 1 });
    
    return NextResponse.json({ skills });

  } catch (error) {
    console.error('Get skills error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new skill (protected)
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    requireAuth(request);
    
    await connectDB();
    
    const { name, category, level, icon, order } = await request.json();

    // Validate required fields
    if (!name || !category) {
      return NextResponse.json(
        { error: 'Name and category are required' },
        { status: 400 }
      );
    }

    // Check if skill already exists
    const existingSkill = await Skill.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existingSkill) {
      return NextResponse.json(
        { error: 'Skill already exists' },
        { status: 400 }
      );
    }

    const skill = new Skill({
      name,
      category,
      level: level || 'Intermediate',
      icon,
      order: order || 0,
    });

    await skill.save();

    return NextResponse.json(
      { message: 'Skill created successfully', skill },
      { status: 201 }
    );

  } catch (error) {
    console.error('Create skill error:', error);

    // Type guard to check if error is an Error instance with a message
    if (error instanceof Error && (error.message === 'No token provided' || error.message === 'Invalid token')) {
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
