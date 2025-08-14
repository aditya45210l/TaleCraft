"use client";
import { motion } from "framer-motion";

import {
  Stories,
  StoriesContent,
  Story,
  StoryAuthor,
  StoryAuthorImage,
  StoryAuthorName,
  StoryOverlay,
  StoryVideo,
} from "@/components/ui/kibo-ui/stories";
import { StoryDataType } from "@/app/(root)/story/[storyId]/page";
import { useRootStories } from "@/hooks/useFetchStories";
import Link from "next/link";

const imagesArray = [
  {
    id: 1,
    author: "Alex Johnson",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    fallback: "AJ",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4#t=20",
  },
  {
    id: 2,
    author: "Sarah Chen",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    fallback: "SC",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4#t=20",
  },
  {
    id: 3,
    author: "Mike Rodriguez",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    fallback: "MR",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 4,
    author: "Emma Wilson",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    fallback: "EW",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: 5,
    author: "David Kim",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    fallback: "DK",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
];

// Use .map() to create a new array with only the video and fallback properties
const ShowStories = () => {
  const { data } = useRootStories();
  console.log(data);
  const stories = data;

  function getRandomSvg() {
    const randomIndex = Math.floor(Math.random() * imagesArray.length);
    return imagesArray[randomIndex].video;
  }

  return (
    <Stories>
      <StoriesContent>
        {stories?.map((story, i) => (
          <Link prefetch={false} href={`/story/${story.storyId}`} key={story.createdAt} >
            <motion.span
              key={story.createdAt}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.05, ease: "easeOut" }}
            >
              <div key={story.createdAt} className="mr-12">
                <Story className="aspect-[3/4] w-[200px]">
                  <StoryVideo src={getRandomSvg()} />
                  <StoryOverlay />
                  <StoryAuthor>
                    <StoryAuthorImage
                      fallback={imagesArray[0].fallback}
                      name={story.author}
                      src={
                        imagesArray[
                          Math.floor(Math.random() * imagesArray.length)
                        ].avatar
                      }
                    />
                    <StoryAuthorName>{story.author.slice(0,6) + '...'+ story.author.slice(-6)}</StoryAuthorName>
                  </StoryAuthor>
                </Story>
              </div>
            </motion.span>
          </Link>
        ))}
      </StoriesContent>
    </Stories>
  );
};

export default ShowStories;
