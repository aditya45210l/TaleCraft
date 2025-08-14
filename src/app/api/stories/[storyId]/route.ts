// import { fetchStoryWithAllChapters } from "@/lib/apiActions/fetchStoryAll";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { tokenId: string } }
// ) {
//   try {
//     const { tokenId } = await params;
//     const story = await fetchStoryWithAllChapters(tokenId);

//     return NextResponse.json(story);
//   } catch (error) {
//     console.error("Error fetching story:", error);
//     return new Response("Failed to fetch story", { status: 500 });
//   }
// }


import dbConnect from '@/lib/config/mongoDbConnect';
import Story from '@/lib/models/Story';
import { NextRequest, NextResponse } from 'next/server';

// Define the expected shape of the URL parameters
interface Params {
  storyId: string;
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
  await dbConnect();
  
  const { storyId } = await params;

  // Type guard to ensure storyId exists
  if (!storyId) {
    return NextResponse.json(
      { success: false, error: 'storyId parameter is missing' },
      { status: 400 }
    );
  }

  try {
    // Get the main story
    const story = await Story.findOne({ 
      storyId, 
      type: 'Story',
      protocol: 'COLABRATIVE_STORY_PROTOCOL' 
    });

    if (!story) {
      return NextResponse.json(
        { success: false, error: 'Story not found' },
        { status: 404 }
      );
    }

    // Get all chapters for this story
    const chapters = await Story.find({ 
      parentStoryId: storyId,
      type: 'Chapter',
      protocol: 'COLABRATIVE_STORY_PROTOCOL' 
    }).sort({ chapterNumber: 1, createdAt: 1 });

    return NextResponse.json({ 
      success: true, 
      data: {
        story,
        chapters,
        totalChapters: chapters.length
      }
    });
  } catch (error) {
    // Type guard to handle error object correctly
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}