import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Skill } from '@/models/Portfolio';
import { requireAuth } from '@/lib/auth';

// PUT - Update skill (protected)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication
    requireAuth(request);

    await connectDB();

    const { name, category, level, icon, order } = await request.json();
    const { id } = await params;

    // Validate required fields
    if (!name || !category) {
      return NextResponse.json(
        { error: 'Name and category are required' },
        { status: 400 }
      );
    }

    // Check if skill exists
    const skill = await Skill.findById(id);
    if (!skill) {
      return NextResponse.json(
        { error: 'Skill not found' },
        { status: 404 }
      );
    }

    // Check if another skill with same name exists (excluding current)
    const existingSkill = await Skill.findOne({ 
      name: { $regex: new RegExp(`^${name}$`, 'i') },
      _id: { $ne: id }
    });
    if (existingSkill) {
      return NextResponse.json(
        { error: 'Skill with this name already exists' },
        { status: 400 }
      );
    }

    // Update skill
    skill.name = name;
    skill.category = category;
    skill.level = level || skill.level;
    skill.icon = icon || skill.icon;
    skill.order = order !== undefined ? order : skill.order;

    await skill.save();

    return NextResponse.json(
      { message: 'Skill updated successfully', skill },
      { status: 200 }
    );

  } catch (error) {
    console.error('Update skill error:', error);

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

// DELETE - Delete skill (protected)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication
    requireAuth(request);

    await connectDB();

    const { id } = await params;

    // Check if skill exists
    const skill = await Skill.findById(id);
    if (!skill) {
      return NextResponse.json(
        { error: 'Skill not found' },
        { status: 404 }
      );
    }

    await Skill.findByIdAndDelete(id);

    return NextResponse.json(
      { message: 'Skill deleted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Delete skill error:', error);

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
