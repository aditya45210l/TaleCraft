import { fetchStoryWithChapters } from "@/lib/clientSideFetch/clientSideFetch";
import { notFound } from "next/navigation";
import DisplayStoryComp from "../../../../../components/pages/ShowStories";


export interface ChapterType {
  name: string;
  description: string;
  author: string;
  tokenId: string;
  storyId: string;
  chapterNumber: number;
  htmlContentUrl: string;
}

export interface StoryDataType {
  story: {
    storyId: string;
    tokenId: string;
    name: string;
    htmlContentUrl: string;
    description: string;
    imageUrl: string;
    author: string;
  };
  chapters: ChapterType[];
  totalChapters: number;
}

interface StoryPageProps {
  params: {
    storyId: string;
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  // Corrected: The `params` object is not a Promise, so no `await` is needed.
  const { storyId } = await params;

  // The fetch function now needs the full URL to work correctly on the server.
  const storyData = await fetchStoryWithChapters(storyId);
  console.log("from main page: ", storyData);

  if (!storyData || !storyData.data || !storyData.data.story) {
    notFound();
  }

  return <DisplayStoryComp storyData={storyData.data} storyId={storyId} />;
}
