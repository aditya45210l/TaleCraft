"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { fetchContentFromIpfs } from "@/lib/actions/FetchHtml";
import { LoadingPage } from "./LoadingComp";
import { StoryDataType } from "../pages/ShowStories";

interface ChapterType {
  name: string;
  tokenId: string;
  storyId: string;
  chapterNumber: number;
  htmlContentUrl: string;
  description: string;
}

interface FullStoryType {
  tokenId: string;
  name: string;
  storyId:string;
  description: string;
  htmlContentUrl: string;
}

export function TabsDemo({
  storyId,
  data,
}: {
  storyId: string;
  data: StoryDataType;
}) {
  const [activeTabContent, setActiveTabContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [contentCache, setContentCache] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState("");

  const fullContent = useMemo(() => {
    if (!data || !data.story) return [];
    const storyAsChapter: FullStoryType = {
      tokenId: data.story.tokenId,
      name: data.story.name,
      description: data.story.description,
      htmlContentUrl: data.story.htmlContentUrl,
      storyId:data.story.storyId,

    };
    return [storyAsChapter, ...(data.chapters || [])];
  }, [data]);

  const hasContent = fullContent.length > 0;

  // This single useEffect now handles both initial load and tab changes.
  useEffect(() => {
    const fetchContent = async () => {
      if (!hasContent) return;

      const currentActiveTab = activeTab || fullContent[0].tokenId;
      setActiveTab(currentActiveTab);

      // Check cache first
      if (contentCache[currentActiveTab]) {
        setActiveTabContent(contentCache[currentActiveTab]);
        setIsLoading(false);
      } else {
        // Fetch if not in cache
        setIsLoading(true);
        const selectedItem = fullContent.find(
          (item) => item.tokenId === currentActiveTab
        );
        if (selectedItem) {
          const html = await fetchContentFromIpfs(selectedItem.htmlContentUrl);
          setActiveTabContent(html);
          console.log(html);
          setContentCache((prev) => ({
            ...prev,
            [selectedItem.tokenId]: html,
          }));
        }
        setIsLoading(false);
      }
    };
    fetchContent();
  }, [activeTab, hasContent, fullContent]); // This hook runs when activeTab or the initial data changes.

  const handleTabChange = (value: string) => {
    // This is the only place we change the `activeTab` state.
    // The useEffect above will handle the fetching in response to this change.
    setActiveTab(value);
  };

  if (!data || !data.story) {
    return <div>Story not found.</div>;
  }

  const currentTabItem = fullContent.find((item ) => item.tokenId === activeTab);

  return (
    <div className="flex min-w-full max-w-sm flex-col gap-6">
      <Tabs
        defaultValue={fullContent[0].tokenId}
        onValueChange={handleTabChange}
      >
        <div className="flex justify-between">
          <TabsList>
            <TooltipProvider>
              {fullContent.map((item, index) => (
                <Tooltip key={item.tokenId}>
                  <TooltipTrigger asChild>
                    <TabsTrigger value={item.tokenId}>{`Chapter ${
                      index + 1
                    }`}</TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </TabsList>
          <div className="items-end  ml-12">
            <Link href={`/story/${storyId}/create-chapter`}>
              <Button>Add Chapter</Button>
            </Link>
          </div>
        </div>
        <TabsContent value={activeTab}>
          <Card className="min-w-full">
            <CardHeader>
              <CardTitle>{currentTabItem?.name}</CardTitle>
              <CardDescription>{currentTabItem?.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              {isLoading ? (

                  <LoadingPage/>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: activeTabContent }} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
