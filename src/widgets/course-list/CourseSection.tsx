import { courses } from "@/shared/mocks/course/course.mock";
import type { Course } from "@/entities/course/model/types";
import CourseGrid from "./CourseGrid";

const chunkArray = <T,>(array: T[], size: number): T[][] => {
  const chunked: T[][] = [];

  for (let i = 0; i < array.length; i += size) {
    chunked.push(array.slice(i, i + size));
  }

  return chunked;
};

const CourseSection = () => {
  const mobileRows = chunkArray(courses as Course[], 1);
  const tabletRows = chunkArray(courses as Course[], 2);
  const desktopRows = chunkArray(courses as Course[], 3);

  return (
    <section
      className="
        relative

        py-14 sm:py-20
        px-4 sm:px-6

        mx-auto
        max-w-7xl

        flex flex-col

        gap-16 sm:gap-28
      "
    >
      
      <div className="flex md:hidden flex-col gap-14">
        {mobileRows.map((row, index) => (
          <CourseGrid key={index} courses={row} columns={1} />
        ))}
      </div>

      
      <div className="hidden md:flex xl:hidden flex-col gap-28">
        {tabletRows.map((row, index) => (
          <CourseGrid key={index} courses={row} columns={2} />
        ))}
      </div>

      
      <div className="hidden xl:flex flex-col gap-32">
        {desktopRows.map((row, index) => (
          <CourseGrid key={index} courses={row} columns={3} />
        ))}
      </div>
    </section>
  );
};

export default CourseSection;