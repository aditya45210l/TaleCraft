import Story from "@/lib/models/Story";
import dbConnect from "../config/mongoDbConnect";

export async function fetchStoryWithAllChapters(tokenId: string) {
  await dbConnect();

  // 1. Fetch the main story
  const mainStory = await Story.findOne({tokenid: tokenId }).lean();
  console.log("Main Story from fetchAll:", mainStory);
  if (!mainStory) {
    return null;
  }

  // 2. Fetch all chapters associated with the main story in a single query
  // This fetches ALL chapters, regardless of their nesting level
  const chapters = await Story.find({
    $or: [{ protocol: "COLABRATIVE_STORY_PROTOCOL" }],
    parentTokenId: tokenId,
    // Filter to get only chapters and not root stories
    type: "Chapter",
  })
    .sort({ createdAt: 1 })
    .lean();

  // 3. Assemble the tree structure in memory
  const storiesMap = new Map();
  storiesMap.set(tokenId, { ...mainStory, chapters: [] });

  chapters.forEach((chapter) => {
    storiesMap.set(chapter.tokenId, { ...chapter, chapters: [] });
  });

  chapters.forEach((chapter) => {
    const parentStory = storiesMap.get(chapter.parentTokenId);
    if (parentStory) {
      parentStory.chapters.push(storiesMap.get(chapter.tokenId));
    }
  });

  return storiesMap.get(tokenId);
}
