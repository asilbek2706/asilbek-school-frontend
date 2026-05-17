export interface RoadmapStep {
  id: number;
  title: string;
  position: "top" | "bottom";
  description?: string;
  skills?: string[]; 
}