
import { NEXT_PUBLIC_BASE_URL } from "../config/env";

interface Story {
  tokenId: string;
  name: string;
  description: string;
  imageUrl: string;
  htmlContentUrl: string;
  type: "Story" | "Chapter";
  storyId: string;
  parentStoryId: string;
  author: string;
  protocol: string;
  chapterNumber: number;
  createdAt: string;
}

export const fetchAllStories = async (): Promise<Story[]> => {
  try {
    console.log("Fetching stories from API...");
    // Use the single API route with a query parameter to filter for 'Story' types
    const response = await fetch(
      `${NEXT_PUBLIC_BASE_URL}api/stories?type=Story`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("API call failed with status:", response.status);
      return [];
    }

    const data = await response.json();
    console.log("Response Data:", data);

    // Return the data array if successful, otherwise return an empty array
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Error fetching stories:", error);
    return [];
  }
};

// lib/FetchActions/FetchAllStroy.ts

export const fetchStoryById = async (storyId: string) => {
  try {
    // The storyId parameter should now be used in the URL
    const response = await fetch(
      `${NEXT_PUBLIC_BASE_URL}api/stories?storyId=${storyId}`
    );

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();
    // Assuming the response returns an array of stories, you'll need the first one
    return data.success && data.data.length > 0 ? data.data[0] : null;
  } catch (error) {
    console.error("Error fetching story:", error);
    return null;
  }
};
