// lib/actions/SaveToDataBase.ts

// Define the expected structure for metadata
interface Metadata {
  name: string;
  description: string;
  image: string;
  html_content: string;
  type?: 'Story' | 'Chapter';
  attributes?: { trait_type: string; value: string | number; }[];
}

// Define the expected structure for the minting result
interface MintResult {
  tokenId?: bigint;
  txHash?: string;
  // Fallback for when result is just a string
  toString(): string;
}

// Define the structure for the data being saved to the database
interface StoryData {
  tokenId: string;
  name: string;
  description: string;
  imageUrl: string;
  htmlContentUrl: string;
  type: 'Story' | 'Chapter';
  storyId: string | null;
  parentStoryId: string | null;
  author: string;
  protocol: 'COLABRATIVE_STORY_PROTOCOL';
  chapterNumber: number;
  txHash: string;
}

export const saveToDatabase = async (metadata: Metadata, result: MintResult, walletAddress: string): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const getAttributeValue = (traitType: string): string | null => {
      const attr = metadata.attributes?.find(a => a.trait_type === traitType);
      return attr ? String(attr.value) : null;
    };

    // Get chapter count if this is a chapter
    let chapterNumber: number = 0;
    const contentType = metadata.type || getAttributeValue('ContentType');
    if (contentType === 'Chapter') {
      const parentStoryId = getAttributeValue('ParentStoryId');
      if (parentStoryId) {
        chapterNumber = await getChapterCount(parentStoryId);
      }
    }

    const storyData: StoryData = {
      tokenId: result.tokenId?.toString() || result.toString(),
      name: metadata.name,
      description: metadata.description,
      imageUrl: metadata.image,
      htmlContentUrl: metadata.html_content,
      type: (contentType as 'Story' | 'Chapter'),
      storyId: getAttributeValue('StoryId'),
      parentStoryId: getAttributeValue('ParentStoryId'),
      author: walletAddress,
      protocol: 'COLABRATIVE_STORY_PROTOCOL',
      chapterNumber,
      txHash: result.txHash || result.toString(),
    };

    const response = await fetch('/api/stories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(storyData)
    });

    if (response.ok) {
      console.log('Story saved to database successfully');
      return await response.json();
    } else {
      const errorData = await response.json();
      console.error('Failed to save story to database:', errorData);
      throw new Error(errorData.error);
    }
  } catch (error) {
    console.error('Error saving to database:', error);
    // Use a type guard for the error object
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    throw new Error(errorMessage);
  }
};

// Helper function to get chapter count
const getChapterCount = async (parentStoryId: string): Promise<number> => {
  try {
    const response = await fetch(`/api/stories/chapters/count?parentStoryId=${parentStoryId}`);
    const data = await response.json();
    // Assuming data.count is a number
    return data.success ? data.count + 1 : 1;
  } catch (error) {
    return 1;
  }
};