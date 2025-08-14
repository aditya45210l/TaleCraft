import React from "react";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import Image from "next/image";
import { useRootStories } from "@/hooks/useFetchStories";
import Link from "next/link";

// 1. Create an array of icon components
const icons = [
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
];

// 2. Create a function to get a random icon
function getRandomIcon() {
  const randomIndex = Math.floor(Math.random() * icons.length);
  return icons[randomIndex];
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

export function BentoGridDemo() {
  const { data } = useRootStories();

  const Skeleton = ({ storyId, name }: { storyId: string; name: string }) => (
    <Link
      href={`/story/${storyId}`}
      className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl object-cover cursor-pointer relative"
    >
      {" "}
      <Image
        width={24}
        height={2}
        src={getRandomSvg()}
        alt="Banner background"
        className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl object-cover cursor-pointer overflow-hidden"
      ></Image>
      <div className="absolute inset-0 text-center bg-black/10 flex items-center justify-center rounded-2xl">
        <h1 className="text-white text-4xl! md:text-5xl font-bold truncate">
          {name}
        </h1>
      </div>
    </Link>
  );

  return (
    <BentoGrid className="px-8 mx-auto">
      {data?.map((item, i) => {
        // Get a random icon component for each item
        const RandomIcon = getRandomIcon();

        return (
          <BentoGridItem
            key={i}
            title={item.name}
            description={item.description}
            header={<Skeleton storyId={item.storyId} name={item.name} />}
            // 3. Render the random icon component
            icon={<RandomIcon />}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        );
      })}
    </BentoGrid>
  );
}