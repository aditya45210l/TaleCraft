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
import { StoryDataType } from "../pages/ShowStories";




export async function TabsDemo({ tokenId, data }: { tokenId: string,data:StoryDataType}) {


  if (!data) {
    return <div>Story not found.</div>;
  }

  const hasChapters = data.chapters && data.chapters.length > 0;

  if (hasChapters) {
    return (
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Tabs defaultValue={data.chapters[0].tokenId}>
          <TabsList>
            <TooltipProvider>
              {data.chapters.map((chapter, index) => (
                <Tooltip key={chapter.tokenId}>
                  <TooltipTrigger asChild>
                    <TabsTrigger value={chapter.tokenId}>{`chapter${index + 1}`}</TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{chapter.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </TabsList>
          {data.chapters.map((chapter) => (
            <TabsContent value={chapter.tokenId} key={chapter.tokenId}>
              <Card>
                <CardHeader>
                  <CardTitle>{chapter.name}</CardTitle>
                  <CardDescription>
                    Content for chapter {chapter.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  {/* Your chapter content here */}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    );
  } else {
    // Show the "Add Chapter" button when there are no chapters
    return (

<div className="flex justify-end">
            <Link href={`/story/${tokenId}/create-chapter`} >
            <Button>Add Chapter</Button>
          </Link>
</div>

    );
  }
}