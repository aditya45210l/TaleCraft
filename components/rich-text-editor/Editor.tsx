"use client";
import { useEditorDataStore } from "@/lib/store/useEditonData";
import Container from "../layout/Container";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import IpNftMintButton, {
  StoryData_Interfase,
} from "../layout/IpNftMintButton";
import UploadComp from "../layout/UploadComp";
import { Input } from "@/components/ui/input";
import RichTextEditor from ".";
import { loadingStates, useLoaderStore } from "@/lib/store/useLoaderStore";
import { MultiStepLoader as Loader } from "../../src/components/ui/multi-step-loader";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@campnetwork/origin/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CustomCampConnectButton } from "../layout/CustomCampConnectButton";
import { LoadingPage } from "../layout/LoadingComp";

type EditorParams = {
  storyId?: string | string[];
};

export default function Editor({ mode }: { mode: "story" | "chapter" }) {
  const [parentTokenId, setParentTokenId] = useState("");
  const params = useParams<EditorParams>();
  const { storyId } = params;

  // 1. Use a state variable to manage the ready state of the component
  const [isReady, setIsReady] = useState(false);
  const { origin, isAuthenticated, walletAddress } = useAuth();

  useEffect(() => {
    // 2. The `useEffect` hook runs only on the client.
    // This is the correct place to handle the authentication state.
    if (origin && isAuthenticated && walletAddress) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }

    if (storyId) {
      const id = Array.isArray(storyId) ? storyId[0] : storyId;
      setParentTokenId(id);
    }
  }, [storyId, params, origin, isAuthenticated, walletAddress]);

  const {
    setTitle,
    setDescription,
    setStoryData,
    name: title,
    description,
    imageFile,
    storyData,
  } = useEditorDataStore();
  const [step, setStep] = useState(1);
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleNextStep = () => {
    // Optional: Add validation here before moving to the next step
    if (title && description && imageFile) {
      setStep(2);
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handlePreviousStep = () => {
    setStep(1);
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const rawStoryData: StoryData_Interfase = {
    name: title,
    description: description,
    imageFile: imageFile,
    storyData: storyData,
    type: mode === "story" ? "Story" : "Chapter",
    parentTokenId: parentTokenId,
  };

  const { loading, activeStep } = useLoaderStore();

  // 3. Conditionally render the loading state first
  if (!isReady) {
    return <LoadingPage />;
  }

  // 4. Now, check for authentication
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              To create a new story or chapter, you must first connect your
              wallet.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p className="mb-4 text-sm text-gray-500">
              Please click the button below to log in.
            </p>
            <CustomCampConnectButton />
          </CardContent>
        </Card>
      </div>
    );
  }

  // 5. Render the main component if authenticated
  return (
    <Container>
      <div className="flex flex-col gap-4">
        {/* Navigation Buttons */}
        <div className="flex flex-row justify-between">
          <span>
            {step === 2 ? (
              <Button onClick={handlePreviousStep} variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            ) : (
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </Link>
            )}
          </span>
          <span>
            {step === 2 ? (
              <div className="flex justify-end">
                <IpNftMintButton rawStoryData={rawStoryData} />
              </div>
            ) : (
              <div className="flex justify-end">
                <Button
                  onClick={handleNextStep}
                  disabled={!title || !description || !imageFile}
                >
                  Next
                </Button>
              </div>
            )}
          </span>
        </div>

        {/* Step 1: Metadata Inputs */}
        {step === 1 && (
          <>
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
                placeholder="Title*"
                required
              />
              <Input
                id="description"
                onChange={handleDescriptionChange}
                placeholder="Description*"
                required
              />
            </form>
          </>
        )}

        {/* Step 2: Rich Text Editor */}
        {step === 2 && (
          <>
            <h1 className="text-2xl font-bold m-0!">
              Write your {mode === "story" ? "Story" : "Chapter"}
            </h1>
            <RichTextEditor onChange={setStoryData} content={storyData} />
          </>
        )}
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
