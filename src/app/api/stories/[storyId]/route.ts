import { fetchStoryWithAllChapters } from "@/lib/apiActions/fetchStoryAll";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { tokenId: string } }
) {
  try {
    const { tokenId } = await params;
    const story = await fetchStoryWithAllChapters(tokenId);

    return NextResponse.json(story);
  } catch (error) {
    console.error("Error fetching story:", error);
    return new Response("Failed to fetch story", { status: 500 });
  }
}
