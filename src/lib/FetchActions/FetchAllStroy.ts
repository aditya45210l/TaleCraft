// export const fetchAllStories = async () => {
//   try {
//     console.log("Fetching stories from API...");
//     const response = await fetch('http://localhost:3000/api/stories/get-all',{
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//     });

//     const data = await response.json();
//     console.log("Response Data:", data);
//     return data.success ? data.data : [];
//   } catch (error) {
//     console.error('Error fetching stories:', error);
//     return [];
//   }
// };
// export const fetchStoryById = async (tokenId:string) => {
//   try {
//     const response = await fetch(`http://localhost:3000/api/stories/${tokenId}`);
//     const data = await response.json();
//     return data ? data : {};
//   } catch (error) {
//     console.error('Error fetching story:', error);
//     return null;
//   }
// };

// lib/FetchActions/FetchAllStories.ts

// Define the type for a Story object to ensure type safety
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
      "http://localhost:3000/api/stories?type=Story",
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
      `http://localhost:3000/api/stories?storyId=${storyId}`
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
