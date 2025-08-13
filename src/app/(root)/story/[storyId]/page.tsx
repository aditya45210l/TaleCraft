interface StoryPageProps {
  params: Promise<{ storyId: string }>; // notice Promise type here
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function Page({ params, searchParams }: StoryPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const storyId = resolvedParams.storyId;
  const chapterId = resolvedSearchParams.chapter;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Chapter</h1>
      <p className="text-gray-600 mb-6">
        Story ID: {storyId}, Chapter ID: {chapterId}
      </p>
    </div>
  );
}
