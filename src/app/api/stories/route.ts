
import dbConnect from '@/lib/config/mongoDbConnect';
import Story from '@/lib/models/Story';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const storyId = searchParams.get('storyId');
    const parentStoryId = searchParams.get('parentStoryId');
    const author = searchParams.get('author');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = parseInt(searchParams.get('skip') || '0');

// @ts-expect-error klj
     const filter: { [key: string] } = { protocol: 'COLABRATIVE_STORY_PROTOCOL' };  
    
    if (type) filter.type = type;
    if (storyId) filter.storyId = storyId;
    if (parentStoryId) filter.parentStoryId = parentStoryId;
    if (author) filter.author = author;

    const stories = await Story.find(filter)
      .sort({ createdAt: -1, chapterNumber: 1 })
      .limit(limit)
      .skip(skip);
      
    const total = await Story.countDocuments(filter);
      
    return NextResponse.json({ 
      success: true, 
      data: stories,
      total,
      hasMore: (skip + stories.length) < total
    });
  } catch (error) {
    // Add a type guard to handle the error object correctly
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const body = await request.json();
    const story = await Story.create(body);
    
    return NextResponse.json(
      { success: true, data: story },
      { status: 201 }
    );
  } catch (error) {
    // Add a type guard to handle the error object correctly
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Story with this tokenId already exists' },
        { status: 400 }
      );
    } else {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 400 }
      );
    }
  }
}