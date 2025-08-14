'use client'
import React, { useState, useEffect } from 'react';
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { fetchStoriesByAuthor } from "@/lib/clientSideFetch/clientSideFetch";
import { useAuth } from "@campnetwork/origin/react";
import { LoadingPage } from '../layout/LoadingComp';

export function MyStoryComp() {
  const { walletAddress } = useAuth();
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only fetch data if walletAddress is available
    if (walletAddress) {
      const getStories = async () => {
        try {
          setIsLoading(true);
          const response = await fetchStoriesByAuthor(walletAddress);
          console.log("response: ",response);
          if (response) {
            console.log(response);
            setStories(response);
          }
        } catch (error) {
          console.error("Failed to fetch stories:", error);
          // You might want to set an error state here
        } finally {
          setIsLoading(false);
        }
      };
      getStories();
    }
  }, [walletAddress]); // The effect will re-run whenever walletAddress changes

  if (isLoading) {
    return <LoadingPage/>
  }

  // Format the stories only after they have been fetched
  console.log("stories: ",stories);
  const formattedStories = stories.map((story:{name:string,description:string,storyId:string}) => ({
    title: story.name,
    description: story.description,
    link: `/story/${story.storyId}`,
  }));
console.log(formattedStories)
  return (
    <div className="px-4 mx-auto md:px-8 transition-all">
      {/* Conditionally render the HoverEffect component only if there are stories */}
      {formattedStories.length > 0 ? (
        <HoverEffect items={formattedStories} />
      ) : (
        <div className="p-4 text-center text-gray-500">No stories found.</div>
      )}
    </div>
  );
}