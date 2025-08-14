import { HoverEffect } from "@/components/ui/card-hover-effect";
import { useRootStories } from "@/hooks/useFetchStories";

export function CardHoverEffectDemo() {
  // Destructure the data object from the useRootStories hook
  const { data } = useRootStories();

  // If data is available, map over it to create a new array with a specific structure
  // that the HoverEffect component can use.
  // We're using the optional chaining operator (?.) to prevent errors if data is undefined or null.
  const formattedStories = data?.map((story) => ({
    title: story.name,
    description: story.description,
    link: `/story/${story.storyId}`, // Or whichever URL you want to use for the link
  }));

  return (
    <div className="px-4 mx-auto md:px-8">
      {/* Pass the new formattedStories array to the HoverEffect component */}
      {/* We use a conditional check to ensure formattedStories exists before rendering */}
      {formattedStories && <HoverEffect items={formattedStories} />}
    </div>
  );
}

// You can remove the 'projects' array since you are now dynamically fetching the data.