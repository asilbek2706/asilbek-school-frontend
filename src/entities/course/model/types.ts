export interface Lesson {
  id: number;
  title: string;
  duration: string;
  description?: string | string[];
  codeSnippet?: string; 
}

export interface Course {
  id: number;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
}