"use client";
import { useAuth } from "@campnetwork/origin/react";
import type { Address } from "viem/accounts";
import { jwtDecode } from "jwt-decode";
import { uploadToIPFS } from "@/lib/actions/UploadFile";
import { HtmlUpload } from "@/lib/actions/htmlUpload";
import { Button } from "@/components/ui/button";
import { useLoaderStore } from "@/lib/store/useLoaderStore";
import { saveToDatabase } from "@/lib/actions/SaveToDataBase";

export interface StoryData_Interfase {
  name: string;
  description: string;
  imageFile: File | null;
  storyData: string;
  type: "Story" | "Chapter";
  parentTokenId: string | undefined;
}

export default function IpNftMintButton({
  rawStoryData,
}: {
  rawStoryData: StoryData_Interfase;
}) {
  const { origin, isAuthenticated, connect, walletAddress } = useAuth();
  const { startLoading, advanceStep, stopLoading } = useLoaderStore();
  const checkAndReauthenticate = async () => {
    // 1. Get the current JWT token
    const jwtToken = await origin?.getJwt();

    if (!jwtToken) {
      // No JWT exists, user is not authenticated.
      console.log("No JWT token found, attempting to connect.");
      await connect(); // After connect, the hook states should be updated.
      return;
    }

    try {
      const decodedToken = jwtDecode(jwtToken);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp! < currentTime) {
        // JWT is expired, user needs to re-authenticate.
        console.log("JWT has expired, re-authenticating...");
        await connect();
      } else {
        // JWT is valid, continue.
        console.log("JWT is still valid.");
      }
    } catch (error) {
      console.error("Error decoding JWT, forcing re-authentication:", error);
      await connect();
    }
  };

  const getStoryProtocolMetadata = async (storyData: StoryData_Interfase) => {
    try {
      advanceStep();
      const contentIPFSUrl = await HtmlUpload(storyData.storyData);
      advanceStep();
      const imageIPFSUrl = await uploadToIPFS(storyData.imageFile!);
      advanceStep(); // Corrected logic:

      let storyId;
      let parentStoryId;
      if (storyData.type === "Story") {
        // For a new story, generate a unique ID
        storyId = `story_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`;
        parentStoryId = storyId; // Parent is self
      } else {
        // For a chapter, the storyId is the parent's ID
        // parentTokenId is used as the storyId
        storyId = storyData.parentTokenId;
        parentStoryId = storyData.parentTokenId;
      }

      const metadata = {
        name: storyData.name,
        description: storyData.description,
        image: imageIPFSUrl,
        html_content: contentIPFSUrl,
        type: storyData.type,
        attributes: [
          { trait_type: "Protocol", value: "COLABRATIVE_STORY_PROTOCOL" },
          { trait_type: "ContentType", value: storyData.type },
          { trait_type: "StoryId", value: storyId },
          { trait_type: "ParentStoryId", value: parentStoryId },
        ],
      };
      return metadata;
    } catch (error) {
      console.error("Error uploading content or image:", error);
      stopLoading();
      return null;
    }
  };

  const mintStoryContent = async (storyData: StoryData_Interfase) => {
    try {
      startLoading(); // **Critical fix:** Ensure authentication first.

      await checkAndReauthenticate(); // After re-authentication, check if the state is truly authenticated.
      const data = await connect();
      advanceStep()
      console.log(data);
      if (!isAuthenticated || !origin || !walletAddress) {
        console.error(
          "Authentication failed or user cancelled signing. Cannot proceed."
        );
        stopLoading();
        return;
      }

      const metadata = await getStoryProtocolMetadata(storyData);
      if (!metadata) {
        console.log("Metadata is null, stopping minting process.");
        stopLoading();
        return;
      }

      const license = {
        price: BigInt(0),
        duration: 2629800,
        royaltyBps: 0,
        paymentToken: "0x0000000000000000000000000000000000000000" as Address,
      };

      console.log("Minting story content with metadata:", metadata);

      console.log(storyData.parentTokenId);
      const result = await origin?.mintFile(
        storyData.imageFile!,
        metadata,
        license,
        BigInt(0)
      );
      advanceStep(); // Use origin?.mintFile to ensure it only runs if origin is available

      advanceStep();

      if (!result) {
        console.error("Minting failed or returned no result.");
        stopLoading();
        return;
      }
// @ts-expect-error this
      await saveToDatabase(metadata , result, walletAddress as string); // This will suppress the error.

      advanceStep();
      console.log("Minting completed successfully:", result);
      stopLoading();
    } catch (error) {
      console.error("Error on minting:", error);
      stopLoading();
    }
  };

  return (
    <div>
           {" "}
      <Button
        onClick={() => mintStoryContent(rawStoryData)}
        disabled={
          walletAddress && origin &&
          rawStoryData.name &&
          rawStoryData.description &&
          rawStoryData.imageFile &&
          rawStoryData.storyData &&
          rawStoryData.type
            ? false
            : true
        }
      >
                Publish      {" "}
      </Button>
         {" "}
    </div>
  );
}
