
import { useAuth } from "@campnetwork/origin/react";
import type { Address } from "viem/accounts";
import { toast } from "sonner";
import { uploadToIPFS } from "@/lib/actions/UploadFile";
import { HtmlUpload } from "@/lib/actions/htmlUpload";
import { Button } from "@/components/ui/button";

export interface StoryData_Interfase {
  title: string;
  description: string;
  imageFile: File | null;
  storyData: string;
  type: "Story" | "Chapter";
  parentTokenId?: bigint | undefined; // `tokenId` of the parent story
}
// export interface Metadata_Interfase {
//   title: string;
//   description: string;
//   image: string;
//   html_content: string;
//   attributes: { trait_type: string; value: string }[];
// }

export const getStroyMetadata = async (storyData: StoryData_Interfase) => {
  const contentIPFSUrl = await HtmlUpload(storyData.storyData);
  let imageIPFSUrl = "";
  if (!storyData.imageFile) {
    throw new Error("image in not available.");
  }

  imageIPFSUrl = await uploadToIPFS(storyData.imageFile);

  // 3. Create the NFT metadata
  const metadata = {
    title: storyData.title,
    description: storyData.description,
    image: imageIPFSUrl,
    html_content: contentIPFSUrl, // Link to the html content
    attributes: [
      { trait_type: "Protocol", value: "COLABRATIVE_STORY_PROTOCOL" }, // Our unique identifier
      { trait_type: "ContentType", value: "Story" },
    ],
  };

  return metadata;
};
export const getChapterMetaData = async (storyData: StoryData_Interfase) => {
  const contentIPFSUrl = await HtmlUpload(storyData.storyData);
  let imageIPFSUrl = "";
  if (storyData.imageFile) {
    imageIPFSUrl = await uploadToIPFS(storyData.imageFile);
  }

  // 3. Create the NFT metadata
  const metadata = {
    title: storyData.title,
    description: storyData.description,
    image: imageIPFSUrl,
    html_content: contentIPFSUrl, // Link to the html content
    attributes: [
      { trait_type: "Protocol", value: "COLABRATIVE_STORY_PROTOCOL" }, // Our unique identifier
      { trait_type: "ContentType", value: "Story" },
    ],
  };

  return metadata;
};
const IpNftMintButton = ({
  data,
}: {
  data: {
    storyData?:StoryData_Interfase,
    type?: string;
    storyId?: string;
    chapterId?: string;
    mode: "story" | "chapter";
  };
}) => {
  const { origin } = useAuth();
  // New function to mint a story or chapter
  const mintStoryContent = async (storyData: StoryData_Interfase) => {
    try {

      // 5. Define license terms
      const license = {
        price: BigInt(0),
        duration: 2629800,
        royaltyBps: 0,
        paymentToken: "0x0000000000000000000000000000000000000000" as Address,
      };

      // 6. Mint the file and set the parentId
      const result = await origin?.mintFile(
        storyData.imageFile!,
        storyData.type === "Chapter"
          ? await getChapterMetaData(storyData)
          : await getStroyMetadata(storyData),
        license,
        storyData.parentTokenId
      );

      return result;
    } catch (error) {
      console.log("Error on minting:", error);
    }
  };
  return (
    <div>
      <Button onClick={() =>mintStoryContent(data.storyData)}>Publish</Button>
    </div>
  );
};
export default IpNftMintButton;
