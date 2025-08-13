// Add this to your IpNftMintButton component

interface metaDataType {
  name: string;
  description: string;
  image: string;
  html_content: string;
  type: "Story" | "Chapter";
  parentTokenId?: string;
}
export const saveToDatabase = async (
  metaData: metaDataType,
  ipNftTokenId: string,
  walletAddress: string
) => {
  try {
    const response = await fetch("/api/save-to-db", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tokenId: ipNftTokenId,
        name: metaData.name,
        description: metaData.description,
        imageUrl: metaData.image,
        htmlContentUrl: metaData.html_content,
        type: metaData.type,
        parentTokenId: metaData.parentTokenId?.toString() || "0",
        author: walletAddress,
        // txHash: result.txHash || result
      }),
    });

    if (response.ok) {
      console.log("Story saved to database");
      return true;
    }

  } catch (error) {
    console.error("Failed to save to database:", error);
    return false;
  }
};
