// components/Editor.tsx
"use client";
import { useEditorDataStore } from "@/lib/store/useEditonData";
import Container from "../layout/Container";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import IpNftMintButton from "../layout/IpNftMintButton";
import UploadComp from "../layout/UploadComp";
import { Input } from "@/components/ui/input";
import RichTextEditor from ".";
import { loadingStates, useLoaderStore } from "@/lib/store/useLoaderStore";
import { MultiStepLoader as Loader } from "../../src/components/ui/multi-step-loader";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@campnetwork/origin/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomCampConnectButton } from "../layout/CustomCampConnectButton";

// Define a type for the params object for better type safety
type EditorParams = {
  storyId?: string | string[]; // useParams can return a string or an array of strings
};

export default function Editor({ mode }: { mode: "story" | "chapter" }) {
  // Initialize the state with a default value.
  const [parentTokenId, setParentTokenId] = useState('');

  // Use the type-safe useParams hook
  const params = useParams<EditorParams>();
  const { storyId } = params;

  useEffect(() => {
    console.log("params inside useEffect:", params);
    if (storyId) {
      // Check if storyId is an array and get the first element, otherwise use the string.
      const id = Array.isArray(storyId) ? storyId[0] : storyId;
      setParentTokenId(id);
      console.log("tokenid: ipbutton: ", id);
    }
  }, [storyId, params]); // Add storyId and params to the dependency array

  const {
    setTitle,
    setDescription,
    setStoryData,
    name: title,
    description,
    imageFile,
    storyData,
  } = useEditorDataStore();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  // Use the state variable parentTokenId in rawStoryData
  const rawStoryData = {
    name: title,
    description: description,
    imageFile: imageFile,
    storyData: storyData,
    type: mode === "story" ? "Story" : ("Chapter" as "Story" | "Chapter"),
    parentTokenId: String(parentTokenId), // This will be an empty string initially, then the correct ID
  };
  const { origin, isAuthenticated, walletAddress } = useAuth();
  const { loading, activeStep } = useLoaderStore();

  if(!origin && !isAuthenticated && !walletAddress){
    return <div className="flex items-center justify-center min-h-[50vh]">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              To create a new story or chapter, you must first connect your wallet.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p className="mb-4 text-sm text-gray-500">
              Please click the button below to log in.
            </p>
            <CustomCampConnectButton/>
          </CardContent>
        </Card>
      </div>
  }

  return (
    <Container>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <Link href={`/`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <IpNftMintButton rawStoryData={rawStoryData} />
        </div>
        <h1 className="text-2xl font-bold m-0!">
          Create New {mode === "story" ? "Story" : "Chapter"}
        </h1>
        <div>
          <UploadComp />
        </div>
        <form className="max-w-4xl flex flex-col gap-4">
          <Input
            id="title"
            onChange={handleTitleChange}
            placeholder="Title"
            required
          />
          <Input
            id="description"
            onChange={handleDescriptionChange}
            placeholder="Description"
            required
          />
          <RichTextEditor onChange={setStoryData} content={storyData} />
        </form>
      </div>
      {useLoaderStore.getState().loading && (
        <Loader
          loadingStates={loadingStates}
          loading={loading}
          value={activeStep}
        />
      )}
    </Container>
  );
}