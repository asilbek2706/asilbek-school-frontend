import type { Course } from "../../interfaces/courses.interface";
import CourseCard from "./CourseCard";
import Platform from "./Platform";

interface Props {
  courses: Course[];
  columns: number;
}

const CourseGrid = ({ courses, columns }: Props) => {
  return (
    <div className="relative h-full w-full">
      <div
        className={`
          grid relative z-20
          gap-8 xl:gap-12
          ${
            columns === 1
              ? "grid-cols-1"
              : columns === 2
              ? "grid-cols-2"
              : "grid-cols-3"
          }
        `}
      >
        {courses.map((course) => (
          <div key={course.id}>
            <CourseCard course={course} />

            
            {columns === 1 && <Platform mobile />}
          </div>
        ))}
      </div>

      
      {columns !== 1 && <Platform />}
    </div>
  );
};

export default CourseGrid;