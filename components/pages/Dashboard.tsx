"use client";

import { CarouselDemo } from "../layout/dashHearder";
import ShowStories from "../layout/ShowStories";
import TitleText from "../saraUI/TitleText";

import { useRootStories } from "@/hooks/useFetchStories";

const Dashboard = () => {
  const { isLoading, isError } = useRootStories();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading stories...</p>
      </div>
    );
  }
  if (isError) return <div>Error fetching stories.</div>;

  return (
    <div className="">
      <section>
        <CarouselDemo />
      </section>
      <section className="flex flex-col gap-4">
        <TitleText text={"Top Stories"}/>
        <ShowStories  />
      </section>
    </div>
  );
};
export default Dashboard;
