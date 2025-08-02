import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { ContactInfo } from '@/models/Portfolio';
import { requireAuth } from '@/lib/auth';

// GET - Fetch contact info (public)
export async function GET() {
  try {
    await connectDB();
    const contactInfo = await ContactInfo.findOne().sort({ createdAt: -1 });
    return NextResponse.json({ contactInfo });
  } catch (error) {
    console.error('Get contact info error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create/Update contact info (protected)
export async function POST(request: NextRequest) {
  try {
    requireAuth(request);
    await connectDB();
    
    const { email, phone, location, linkedin, github, twitter, website, availability } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    let contactInfo = await ContactInfo.findOne();
    
    if (contactInfo) {
      contactInfo.email = email;
      contactInfo.phone = phone || contactInfo.phone;
      contactInfo.location = location || contactInfo.location;
      contactInfo.linkedin = linkedin || contactInfo.linkedin;
      contactInfo.github = github || contactInfo.github;
      contactInfo.twitter = twitter || contactInfo.twitter;
      contactInfo.website = website || contactInfo.website;
      contactInfo.availability = availability || contactInfo.availability;
      await contactInfo.save();
    } else {
      contactInfo = new ContactInfo({
        email, phone, location, linkedin, github, twitter, website,
        availability: availability || 'Available',
      });
      await contactInfo.save();
    }

    return NextResponse.json({ message: 'Contact info updated successfully', contactInfo }, { status: 200 });

  } catch (error) {
    console.error('Update contact info error:', error);
    if (error.message === 'No token provided' || error.message === 'Invalid token') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
