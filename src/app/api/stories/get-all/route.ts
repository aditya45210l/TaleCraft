
import dbConnect from '@/lib/config/mongoDbConnect';
import Story from '@/lib/models/Story';
import { NextResponse } from 'next/server';

export async function GET() {
  console.log("Fetching all stories...");
  await dbConnect();
  try {
    const filter = { protocol: 'COLABRATIVE_STORY_PROTOCOL',type: 'Story' };

    const stories = await Story.find(filter)
      .sort({ createdAt: -1 })
      .limit(50);
      
    return NextResponse.json({ success: true, data: stories }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}

// export async function POST(req) {
//   await dbConnect();

//   try {
//     const body = await req.json();
//     const story = await Story.create(body);
//     return NextResponse.json({ success: true, data: story }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 400 });
//   }
// }