import type { Route } from "./+types/home";
import { HomePage } from "@/pages/home";
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
      <HomePage />
    </ProtectedRoute>
  );
}
