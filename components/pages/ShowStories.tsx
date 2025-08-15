"use client";
import Image from "next/image";
import { TabsDemo } from "../layout/ChapterTabs";

// src/app/(root)/story/[storyId]/page.tsx

export interface ChapterType {
  name: string;
  tokenId: string;
  storyId: string;
  chapterNumber: number;
  htmlContentUrl: string;
}

// Corrected StoryDataType interface
export interface StoryDataType {
  story: {
    storyId: string;
    tokenId: string; // <-- Add this property
    name: string;
    description: string;
    imageUrl: string;
    htmlContentUrl: string; // <-- Add this property
    author: string;
  };
  chapters: ChapterType[];
  totalChapters: number;
}

const svgPaths = [
  "/svgs/banner1.svg",
  "/svgs/banner2.svg",
  "/svgs/banner3.svg",
  "/svgs/banner4.svg",
  "/svgs/banner5.svg",
  "/svgs/banner6.svg",
  "/svgs/banner7.svg",
  "/svgs/banner8.svg",
  "/svgs/banner9.svg",
  "/svgs/banner10.svg",
  "/svgs/banner11.svg",
  "/svgs/banner12.svg",
  "/svgs/banner13.svg",
];

function getRandomSvg() {
  const randomIndex = Math.floor(Math.random() * svgPaths.length);
  return svgPaths[randomIndex];
}

const DisplayStoryComp = ({
  storyData,
  storyId,
}: {
  storyData: StoryDataType;
  storyId: string;
}) => {
  if (!storyData || !storyData.story) {
    return <div>Story not found.</div>;
  }

  return (
    <div className="flex flex-col py-4 px-3 md:px-6 gap-4">
      <div className="relative w-full h-40 md:h-62 rounded-2xl ">
        <Image
          height={24}
          width={24}
          src={getRandomSvg()}
          alt="Banner background"
          className="w-full h-full object-cover rounded-2xl"
        />
        <div className="absolute inset-0 text-center bg-black/40 flex items-center justify-center rounded-2xl">
          <h1 className="text-white text-3xl!  md:text-5xl font-bold">
            {storyData.story.name}
          </h1>
        </div>
      </div>
      <div className="flex flex-col gap-4 px-4">
        <div>
          <p className=" text-2xl! md:text-3xl! font-bold m-0! line-clamp-1">
            {storyData.story.name}
          </p>
          <p className=" line-clamp-3 text-muted-foreground !m-0 max-w-10/12">
            {storyData.story.description}
          </p>
        </div>
        <section>
          {/* Pass storyId and the chapters data to the TabsDemo component */}

          <TabsDemo storyId={storyId} data={storyData} />
        </section>
      </div>
    </div>
  );
};

export default DisplayStoryComp;
