import { StoryData_Interfase } from "../../../components/layout/IpNftMintButton";

// Add this to your IpNftMintButton component
const saveToDatabase = async (storyData:StoryData_Interfase, result:string) => {
  try {
    const response = await fetch('/api/stories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tokenId: result.tokenId?.toString() || result.toString(),
        name: storyData.name,
        description: storyData.description,
        imageUrl: metadata.image,
        htmlContentUrl: metadata.html_content,
        type: storyData.type,
        parentTokenId: storyData.parentTokenId?.toString() || '0',
        author: walletAddress,
        txHash: result.txHash || result
      })
    });
    
    if (response.ok) {
      console.log('Story saved to database');
    }
  } catch (error) {
    console.error('Failed to save to database:', error);
  }
};

// Modify your mintStoryContent function
const mintStoryContent = async (storyData: StoryData_Interfase) => {
  try {
    startLoading();
    const metadata = await getStoryProtocolMetadata(storyData);
    if (!metadata) return;

    // ... existing minting code ...

    const result = await origin?.mintFile(
      storyData.imageFile!,
      metadata,
      license,
      storyData.parentTokenId
    );
    
    if (result) {
      // Save to database immediately after minting
      await saveToDatabase(storyData, result);
      toast.success("Content published successfully!");
    }
    
    advanceStep();
    stopLoading();
    return result;
  } catch (error) {
    stopLoading();
    console.log("Error on minting:", error);
  }
};