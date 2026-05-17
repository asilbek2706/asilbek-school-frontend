import AboutHeroBanner from "@/widgets/about/Banner";
import CoreValues from "@/widgets/about/CoreValues";
import OurGoals from "@/widgets/about/OurGoals";
import TeachingRoadmap from "@/widgets/about/TeachingRoadmap";

export const AboutPage = () => {
  return (
    <div>
      <AboutHeroBanner />
      <OurGoals />
      <CoreValues />
      <TeachingRoadmap />
    </div>
  );
};
