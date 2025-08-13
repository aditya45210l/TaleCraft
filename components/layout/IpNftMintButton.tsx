import { useAuth } from "@campnetwork/origin/react";
import type { Address } from "viem/accounts";
import { toast } from "sonner";
import { uploadToIPFS } from "@/lib/actions/UploadFile";
import { HtmlUpload } from "@/lib/actions/htmlUpload";
import { Button } from "@/components/ui/button";
import { useLoaderStore } from "@/lib/store/useLoaderStore";

export interface StoryData_Interfase {
  name: string;
  description: string;
  imageFile: File | null;
  storyData: string;
  type: "Story" | "Chapter";
  parentTokenId?: bigint | undefined; // `tokenId` of the parent story
}

const IpNftMintButton = ({
  rawStoryData,
}: {
  rawStoryData: StoryData_Interfase;
}) => {
  const { origin, isAuthenticated, connect, walletAddress } = useAuth();
    const { startLoading, advanceStep, stopLoading,loading } = useLoaderStore();
  // New function to mint a story or chapter

  const getStoryProtocolMetadata = async (storyData: StoryData_Interfase) => {
    try {;
      // 1. Start the loading process
      const contentIPFSUrl = await HtmlUpload(storyData.storyData);
      advanceStep();
      // Handle image upload with an optional check
      let imageIPFSUrl = "";

      imageIPFSUrl = await uploadToIPFS(storyData.imageFile!);
      advanceStep();

      const metadata = {
        name: storyData.name,
        description: storyData.description,
        image: imageIPFSUrl,
        html_content: contentIPFSUrl,
        attributes: [
          { trait_type: "Protocol", value: "COLABRATIVE_STORY_PROTOCOL" },
          { trait_type: "ContentType", value: storyData.type }, // Dynamically set type
          {
            trait_type: "ParentTokenId",
            value: storyData.parentTokenId?.toString() || "0",
          },
        ],
      };
      return metadata;
    } catch (error) {
      toast.error("Error generating metadata: " + error);
      stopLoading();
      return null;
    }
  };
  const mintStoryContent = async (storyData: StoryData_Interfase) => {
    try {
      startLoading();
      console.log("loading; ",loading);
      const metadata = await getStoryProtocolMetadata(storyData);
      if (!metadata) {
        return;
      }
      // 5. Define license terms
      const license = {
        price: BigInt(0),
        duration: 2629800,
        royaltyBps: 0,
        paymentToken: "0x0000000000000000000000000000000000000000" as Address,
      };

      console.log("isAuth: ", isAuthenticated);
      if (!isAuthenticated) {
        console.log(isAuthenticated);
        connect();
        console.log(isAuthenticated);
      }
      // Check for both the SDK object and the wallet address
      if (!origin || !walletAddress) {
        toast.error("Wallet not connected.", {
          description: "Please connect your wallet to publish content.",
        });
        return; // Stop the function from proceeding
      }

      console.log("Minting story content with metadata:", metadata);
      console.log("Parent Token ID:", storyData.parentTokenId);
      console.log("Image File:", storyData.imageFile);
      console.log("Story Data:", storyData.storyData);
      await connect();
      const result = await origin?.mintFile(
        storyData.imageFile!,
        metadata,
        license,
        storyData.parentTokenId
      );
      advanceStep();
      console.log("Minting result:", result);
      if (result) {
        toast.success("Content published successfully!");}
        advanceStep();
      stopLoading();
      // Return the result for further processing if needed
      return result;
    } catch (error) {
      stopLoading();
      console.log("Error on minting:", error);
    }
  };
  return (
    <div>
      <Button
        onClick={() => mintStoryContent(rawStoryData)}
        disabled={
          rawStoryData.name &&
          rawStoryData.description &&
          rawStoryData.imageFile &&
          rawStoryData.storyData &&
          rawStoryData.type
            ? false
            : true
        }
      >
        Publish
      </Button>
    </div>
  );
};
export default IpNftMintButton;
