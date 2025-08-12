
import { CarouselDemo } from "../layout/dashHearder";
import ShowStories from "../layout/ShowStories";
import TitleText from "../saraUI/TitleText";

const Dashboard = () => {
  return (
    <div className="">
      <section>
        <CarouselDemo/>
      </section>
      <section className="flex flex-col gap-4">
        <TitleText text={"Top Stories"}/>
        <ShowStories />
      </section>
    </div>
  );
};
export default Dashboard;
