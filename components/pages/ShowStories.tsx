
import Image from "next/image";
import { TabsDemo } from "../layout/ChapterTabs";
import { fetchStoryById } from "@/lib/FetchActions/FetchAllStroy";

interface Chapter {
  id: number;
  title: string;
  content: string;
  wordCount?: number;
}

interface Story {
  id: string;
  title: string;
  description: string;
  author: string;
  bannerImage: string;
  chapters: Chapter[];
  totalChapters?: number;
}

export interface StoryDataType {
  name: string;
  tokenId: string;
  description:string;
    author: string;
  bannerImage: string;
  chapters: { name: string; tokenId: string }[];
}

const DisplayStoryComp =async ({tokenId}:{tokenId:string}) => {
  const data :StoryDataType = await fetchStoryById(tokenId);
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


  return (
    <div className="flex flex-col py-4 px-6 gap-4">
      <div className="relative w-full h-40 md:h-62 rounded-2xl ">
        {/* SVG Background */}
        <img
          src={getRandomSvg()}
          alt="Banner background"
          className="w-full h-full object-cover rounded-2xl"
        />

        {/* Overlay text */}
        <div className="absolute inset-0 bg-black/40 flex items-center  justify-center rounded-2xl">
          <h1 className="text-white text-4xl! md:text-5xl font-bold">
            {"Title"}
          </h1>
        </div>
      </div>
      <div className="flex flex-col gap-4 px-4">
        <div>
          <p className="text-3xl! font-bold m-0! line-clamp-1">{data.name}</p>
          <p className=" line-clamp-3 text-muted-foreground !m-0 max-w-10/12">
            {
             data.description
            }
          </p>
        </div>
        <section>
          <TabsDemo tokenId={tokenId} data={data}/>
        </section>
        <section>
          <div className="bg-card rounded-lg border p-8">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span>Chapter {"1"}</span>
                <span>•</span>
                <span>{Math.ceil(5000 / 1000)} min read</span>
              </div>
              <h3 className="text-2xl font-bold font-serif">
                {"chapter.title"}
              </h3>
            </div>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              {/* {chapter.content.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed text-foreground">
                      {paragraph}
                    </p>
                  ))} */}
            </div>
          </div>
        </section>
        <section></section>
      </div>
    </div>
  );
};
export default DisplayStoryComp;
