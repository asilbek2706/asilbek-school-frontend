import AboutHeroBanner from "../../components/AboutPage/Banner";
import CoreValues from "../../components/AboutPage/CoreValues";
import OurGoals from "../../components/AboutPage/OurGoals";
import TeachingRoadmap from "../../components/AboutPage/TeachingRoadmap";

const AboutPage = () => {

  return (
    <div>
        <AboutHeroBanner />
        <OurGoals />
        <CoreValues />
        <TeachingRoadmap />
    </div>
  );
};

export default AboutPage;