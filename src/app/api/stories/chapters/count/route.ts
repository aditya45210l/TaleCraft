
import dbConnect from '@/lib/config/mongoDbConnect';
import Story from '@/lib/models/Story';
import { NextResponse } from 'next/server';

export async function GET(request:NextResponse) {
  await dbConnect();
  
  const { searchParams } = new URL(request.url);
  const parentStoryId = searchParams.get('parentStoryId');

  try {
    const count = await Story.countDocuments({ 
      parentStoryId,
      type: 'Chapter',
      protocol: 'COLABRATIVE_STORY_PROTOCOL' 
    });

    return NextResponse.json({ success: true, count });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error },
      { status: 500 }
    );
  }
}