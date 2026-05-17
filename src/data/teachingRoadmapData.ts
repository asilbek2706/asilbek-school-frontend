import type { RoadmapStep } from "../interfaces/teachingRoadmap.interface";


export const steps: RoadmapStep[] = [
  { 
    id: 1, 
    title: "Core Fundamentals", 
    position: "top",
    description: "HTML5, CSS3 va Modern JavaScript (ES6+) asoslari.",
    skills: ["Semantic HTML", "Flexbox/Grid", "DOM Manipulation"]
  },
  { 
    id: 2, 
    title: "React Ecosystem", 
    position: "bottom", // Tartibni mantiqiy qilish uchun 2-id ni pastga qo'ydim
    description: "Komponentlar arxitekturasi va Next.js imkoniyatlari.",
    skills: ["Hooks", "SSR/SSG", "Routing"]
  },
  { 
    id: 3, 
    title: "State Management", 
    position: "top",
    description: "Global ma'lumotlar bilan ishlash strategiyalari.",
    skills: ["Zustand", "Redux Toolkit", "Context API"]
  },
  { 
    id: 4, 
    title: "Advanced Logic", 
    position: "bottom",
    description: "Frontend optimizatsiyasi va murakkab formalarni boshqarish.",
    skills: ["Zod", "React Hook Form", "Custom Hooks"]
  },
  { 
    id: 5, 
    title: "Performance & DX", 
    position: "top",
    description: "Loyiha tezligi va foydalanuvchi tajribasini eng yuqori darajaga olib chiqish.",
    skills: ["Lighthouse Score", "Code Splitting", "Caching"]
  },
];