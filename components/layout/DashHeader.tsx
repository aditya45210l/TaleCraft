import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const DashHeader = () => {
  return (
    <div className="relative rounded-3xl overflow-hidden  p-8 md:p-16 flex items-center md:min-h-[400px] mx-4">
      <div className="absolute inset-0">
        <Image
          height={250}
          width={250}
          fetchPriority="high"
          alt="A collage of fantastical images representing different story genres."
          className="w-full h-full object-cover"
          src="/svgs/banner6.svg"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>
      <div className="relative z-10 text-center mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Discover, Create &amp; Collect Stories
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          The decentralized platform for collaborative storytelling, secured on
          the blockchain.
        </p>
        <div className="flex flex-col md:flex-row gap-2 w-fit mx-auto">
          <Link href={"/"}>
            <Button
              size={"lg"}
              variant={"default"}
              className=" rounded-full font-semibold md:text-lg"
            >
              Explore Now
            </Button>
          </Link>
          <Link href={"/create-story"}>
            <Button
              variant={"outline"}
              size={"lg"}
              className=" rounded-full font-semibold md:text-lg"
            >
              Create Story
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default DashHeader;
