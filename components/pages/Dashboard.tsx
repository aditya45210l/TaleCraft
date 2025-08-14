"use client";

import { BentoGridDemo } from "../layout/BentoHero";
import { CardHoverEffectDemo } from "../layout/CardGridComp";
import { CarouselDemo } from "../layout/dashHearder";
import { LoadingPage } from "../layout/LoadingComp";
import ShowStories from "../layout/ShowStories";
import TitleText from "../saraUI/TitleText";

import { useRootStories } from "@/hooks/useFetchStories";

const Dashboard = () => {
  const { isLoading, isError } = useRootStories();

  if (isLoading) {
    return <LoadingPage />;
  }
  if (isError) return <div>Error fetching stories.</div>;

  return (
    <div className="py-8 flex flex-col gap-6 transition-all">
      <h1 className="px-9">Recent Stories</h1>
      <section>
        <BentoGridDemo />
      </section>
      <section className="mt-4 mx-12">
        <CarouselDemo />
      </section>
      <section className="flex flex-col gap-4 px-4">
        <TitleText text={"Top Stories"} />
        <ShowStories />
      </section>
      <section>
        <CardHoverEffectDemo />
      </section>
    </div>
  );
};
export default Dashboard;
