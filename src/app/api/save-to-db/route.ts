// app/api/stories/route.ts

import { NextRequest, NextResponse } from "next/server";
import Story from "@/lib/models/Story"; // Import your Mongoose model
import dbConnect from "@/lib/config/mongoDbConnect";

export async function POST(request: NextRequest) {
  try {
    // 1. Connect to the database
    await dbConnect();

    // 2. Parse the JSON body from the request
    const body = await request.json();

    // 3. Create a new story document in the database
    const newStory = await Story.create(body);

    // 4. Return a success response
    return NextResponse.json(
      { message: "Story saved successfully", story: newStory },
      { status: 201 }
    );
  } catch (error) {
    // 5. Return an error response
    console.error("Failed to save story:", error);
    return NextResponse.json(
      { message: "Failed to save story", error: error },
      { status: 500 }
    );
  }
}