import type { Route } from "./+types/home";
import Banner from "../../components/HomePage/Banner";
import LearningPaths from "../../components/HomePage/LearningPath";
import Faq from "../../components/HomePage/Faq";
import TestimonialSection from "../../components/HomePage/Testimonials";
import TechnologyStack from "../../components/HomePage/TechnologyStack";
import { ProtectedRoute } from "@/app/router/route-guards";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Frontend Darslari" },
    { name: "description", content: "Kursimizga xush kelibsiz!" },
  ];
}

export default function Home() {
  return (
    <ProtectedRoute>
      <div>
        <div className="py-10 bg-transparent relative">
          <div className="container mx-auto px-6">
            <h1 className="text-center font-bold text-4xl">
              Frontend olamiga professional qadam qo'ying
            </h1>
            <p className="text-center mt-4 text-lg text-gray-600">
              Qayerdan boshlashni bilmayapsizmi? &nbsp;
              <span className="font-bold text-red-500">
                Hech qanday tashvishlanmang!
              </span>
              <br />
              Bizning&nbsp; Frontend Darslari&nbsp; kursimiz sizni bosqichma-bosqich
              o'rgatadi va sizni zamonaviy web dasturchi sifatida tayyorlaydi.
            </p>
            <TechnologyStack />
          </div>
        </div>
        <Banner />
        <LearningPaths />
        <Faq />
        <TestimonialSection />
      </div>
    </ProtectedRoute>
  );
}
