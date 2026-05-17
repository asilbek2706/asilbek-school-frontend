import CourseSection from "@/widgets/course-list/CourseSection";
import { SearchInput } from "@/widgets/course-list/Input";

export const CoursesPage = () => {
  return (
    <div>
      <SearchInput />
      <CourseSection />
    </div>
  );
};
