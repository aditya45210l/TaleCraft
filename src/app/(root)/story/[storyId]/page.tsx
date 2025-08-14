
import DisplayStoryComp from "../../../../../components/pages/ShowStories";


interface StoryPageProps {
  params: Promise<{ storyId: string }>; // notice Promise type here
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function Page({params}: StoryPageProps) {
  const resolvedParams = await params;

  const storyId = resolvedParams.storyId;

  return (
    <div>
        <DisplayStoryComp tokenId={storyId}/>
    </div>
  );
}
