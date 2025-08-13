// components/Editor.tsx
"use client";
import { useStoryStore } from "@/lib/store/useStoryData";
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
// ... (other imports)

export default function Editor({ mode }: { mode: "story" | "chapter" }) {
  // Get setter functions from the store
  const {
    setTitle,
    setDescription,
    setStoryData,
    name:title,
    description,
    imageFile,
    storyData,
    parentTokenId,
  } = useStoryStore();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const rawStoryData = {
    name: title,
    description: description,
    imageFile: imageFile,
    storyData: storyData,
    type: mode === "story" ? "Story" : ("Chapter" as "Story" | "Chapter"),
    parentTokenId: mode === "chapter" ? parentTokenId : BigInt(0), // Only set parentTokenId for chapters
  };
  const {loading, activeStep } = useLoaderStore();
  return (
    <Container>
      <div className="flex flex-col gap-6">
        <div className="flex flex-row justify-between">
          <Link href={`/`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          {/* The button is now independent and doesn't need props */}
          <IpNftMintButton rawStoryData={rawStoryData} />
        </div>
        <h1 className="text-3xl font-bold">
          Create New {mode === "story" ? "Story" : "Chapter"}
        </h1>
        <div>
          {/* UploadComp updates the store directly */}
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
          {/* RichTextEditor also updates the store directly */}
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
