import Intro from "../../components/Intro";
import type { Route } from "./+types/home";
import Banner from "../../components/Banner";
import LearningPaths from "../../components/LearningPath";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Frontend Darslari" },
    { name: "description", content: "Kursimizga xush kelibsiz!" },
  ];
}

export default function Home() {
  return (
    <div>
      <Intro />
      <Banner />
      <LearningPaths />
    </div>
  );
}
