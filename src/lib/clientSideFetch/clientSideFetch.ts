// lib/api/stories.js

import { NEXT_PUBLIC_BASE_URL } from "../config/env";

// Get all stories
export const fetchAllStories = async (page = 0, limit = 20) => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/stories?type=Story&limit=${limit}&skip=${page * limit}`);
    const data = await response.json();
    return data.success ? data : { data: [], total: 0, hasMore: false };
  } catch (error) {
    console.error('Error fetching stories:', error);
    return { data: [], total: 0, hasMore: false };
  }
};

// Get specific story with chapters
// export const fetchStoryWithChapters = async (storyId:string) => {
//   try {
//     const response = await fetch(`/api/stories/${storyId}`);
//     const data = await response.json();
//     return data.success ? data.data : { story: null, chapters: [] };
//   } catch (error) {
//     console.error('Error fetching story with chapters:', error);
//     return { story: null, chapters: [] };
//   }
// };

// lib/api/stories.ts
export const fetchStoryWithChapters = async (storyId: string) => {
  try {
    // Corrected: Use a full URL with the base URL.
    const baseUrl = NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/stories/${storyId}`, {
      cache: 'no-store'
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching story with chapters:', error);
    return { success: false, data: null };
  }
};

// Get stories by author
export const fetchStoriesByAuthor = async (authorAddress:string, type = null) => {
  try {
    const url = type 
      ? `${NEXT_PUBLIC_BASE_URL}/api/stories/author/${authorAddress}?type=${type}`
      : `${NEXT_PUBLIC_BASE_URL}/api/stories/author/${authorAddress}`;
    
    const response = await fetch(url);
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching author stories:', error);
    return [];
  }
};

// Search stories
export const searchStories = async (searchTerm:string, limit = 20) => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/stories/search?q=${encodeURIComponent(searchTerm)}&limit=${limit}`);
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error searching stories:', error);
    return [];
  }
};

// Get chapter count for a story
export const getChapterCount = async (parentStoryId:string) => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/stories/chapters/count?parentStoryId=${parentStoryId}`);
    const data = await response.json();
    return data.success ? data.count : 0;
  } catch (error) {
    console.error('Error getting chapter count:', error);
    return 0;
  }
};