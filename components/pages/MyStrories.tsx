'use client'
import React, { useState, useEffect } from 'react';
import {  HoverEffect } from "@/components/ui/card-hover-effect";
import { fetchStoriesByAuthor } from "@/lib/clientSideFetch/clientSideFetch";
import { useAuth } from "@campnetwork/origin/react";
import { LoadingPage } from '../layout/LoadingComp';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CustomCampConnectButton } from '../layout/CustomCampConnectButton';
export function MyStoryComp() {
  const { isAuthenticated,walletAddress } = useAuth();
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Only fetch data if walletAddress is available
    if (walletAddress && isAuthenticated) {
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
  }, [walletAddress,isAuthenticated]); // The effect will re-run whenever walletAddress changes

  if (isLoading) {
    return <LoadingPage/>
  }

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

  // Format the stories only after they have been fetched
  console.log("stories: ",stories);
  const formattedStories = stories.map((story:{name:string,description:string,storyId:string}) => ({
    title: story.name,
    description: story.description,
    link: `/story/${story.storyId}`,
  }));
console.log(formattedStories)
  return (
    <div className="px-4 mx-auto md:px-8 transition-all flex-1">
      {/* Conditionally render the HoverEffect component only if there are stories */}
      {formattedStories.length > 0 ? (
        <HoverEffect items={formattedStories} />
      ) : (
        <div className='flex justify-center items-center w-full h-full py-11'>
          <div className="p-4 text-center text-gray-500 min-h-full flex-1 my-auto">No stories found.</div>
        </div>
      )}
    </div>
  );
}