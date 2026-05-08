import Intro from "../../components/HomePage/Intro";
import type { Route } from "./+types/home";
import Banner from "../../components/HomePage/Banner";
import LearningPaths from "../../components/HomePage/LearningPath";

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
