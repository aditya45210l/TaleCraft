"use client";

import { Carousel } from "@/components/ui/AncCarousel";
import { useRootStories } from "@/hooks/useFetchStories";


export function CarouselDemo({stories}:{stories?:[]}) {
    const { data} = useRootStories();
    console.log("data from crousol:",data)
  const imagesArray = [
    "https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=3534&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1679420437432-80cfbf88986c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"


  ]
  function getRandomSvg() {
    const randomIndex = Math.floor(Math.random() * imagesArray.length);
    return imagesArray[randomIndex];
  }

  // const slideData = data?.map((story:{name:string,tokenId:string}) => ({
  //   title: story.name,
  //   button: "Read Story",
  //   tokenId:story.tokenId,
  //   src: getRandomSvg(),
  // })) || [];
  const slideData = data?.map((story: { name: string, storyId: string }) => ({
  title: story.name,
  button: "Read Story",
  storyId: story.storyId, // Use storyId for navigation
  src: getRandomSvg(), // Use the actual image from your story data
})) || [];

  return (
    <div className="relative overflow-hidden w-full h-full pt-10 pb-20">
      <Carousel slides={slideData} />
    </div>
  );
}
