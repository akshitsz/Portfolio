import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return NextResponse.json(
        { message: 'Admin user already exists. Use login page to access dashboard.' },
        { status: 400 }
      );
    }

    // Get credentials from request body
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Create admin user
    const adminUser = new User({
      email: email.toLowerCase(),
      password: password,
      name: name || 'Admin User',
      role: 'admin',
    });

    await adminUser.save();

    return NextResponse.json(
      {
        message: 'Admin user created successfully! You can now login.',
        email: email
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
