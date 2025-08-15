"use client";
import { BentoGridDemo } from "../layout/BentoHero";
import { CardHoverEffectDemo } from "../layout/CardGridComp";
import { CarouselDemo } from "../layout/dashCrousel";
import DashHeader from "../layout/DashHeader";
import { LoadingPage } from "../layout/LoadingComp";
import ShowStories from "../layout/ShowStories";
import TitleText from "../saraUI/TitleText";
import { useRootStories } from "@/hooks/useFetchStories";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { isLoading, isError } = useRootStories();

  if (isLoading) {
    return <LoadingPage />;
  }
  if (isError) return <div>Error fetching stories.</div>;


        //   <motion.span
        //   key={i}
        //   initial={{ x: -50, opacity: 0 }}
        //   animate={{ x: 0, opacity: 1 }}
        //   transition={{ delay: i * 0.03, ease: "easeOut" }}
        //   className="inline-block"
        // ></motion.span>
  return (
    <div className="py-8 flex flex-col gap-6 transition-all">
      <motion.section
      initial={{ x: -50, opacity: 0 }}
      animate={{x:0,opacity:1}}
      transition={{delay:1*0.3,ease:'easeInOut'}}
      >
        <DashHeader/>
      </motion.section>
      <TitleText  text="Recent Stories"/>
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
