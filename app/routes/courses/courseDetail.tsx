import {
  Link,
  useLoaderData,
  type LoaderFunctionArgs,
} from "react-router";

import { motion } from "framer-motion";

import type { Course } from "../../../interfaces/courses.interface";

import { courses } from "../../../data/courses.data";

export async function loader({
  params,
}: LoaderFunctionArgs) {
  const courseId = params.id;

  const course = courses.find(
    (c) => c.id === Number(courseId)
  );

  if (!course) {
    throw new Response("Kurs topilmadi", {
      status: 404,
    });
  }

  return course;
}

const CourseDetail = () => {
  const course = useLoaderData() as Course;

  const getLessonSlug = (title: string) =>
    title.toLowerCase().replace(/\s+/g, "-");

  return (
    <section
      className="
        relative

        min-h-screen

        overflow-hidden

        px-4
        sm:px-6
        lg:px-8

        py-14
        sm:py-20

        text-white
      "
    >

      <div className="absolute inset-0 overflow-hidden">


        <div
          className="
            absolute
            bottom-0
            right-[-10%]

            w-[500px]
            h-[500px]

            bg-pink-500/10

            blur-[140px]
            rounded-full
          "
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            relative

            overflow-hidden

            rounded-[2.5rem]

            border border-white/10

            bg-white/[0.05]

            backdrop-blur-3xl

            p-6
            sm:p-10
            lg:p-14

            shadow-[0_20px_80px_rgba(0,0,0,0.45)]

            mb-12
          "
        >

          <div
            className="
              absolute inset-0

              bg-gradient-to-br
              from-white/10
              via-transparent
              to-transparent
            "
          />

          <div
            className="
              flex
              flex-col
              lg:flex-row

              items-center

              gap-10
            "
          >

            <div className="relative">

              <div
                className="
                  absolute
                  inset-0

                  bg-orange-500/20

                  blur-3xl
                  rounded-full
                "
              />


              <div
                className="
                  relative

                  w-36
                  h-36

                  rounded-[2rem]

                  border border-white/10

                  bg-white/[0.06]

                  backdrop-blur-2xl

                  flex
                  items-center
                  justify-center
                "
              >
                <img
                  src={course.icon}
                  alt={course.title}
                  className="
                    w-20
                    h-20

                    object-contain
                  "
                />
              </div>
            </div>


            <div className="flex-1 text-center lg:text-left">

              <div
                className="
                  inline-flex
                  items-center

                  gap-2

                  px-4 py-2

                  rounded-full

                  border border-orange-500/20

                  bg-orange-500/10

                  text-orange-400

                  text-sm
                  font-semibold

                  mb-6
                "
              >
                <span className="w-2 h-2 bg-orange-400 rounded-full" />

                Premium Course
              </div>


              <h1
                className="
                  text-4xl
                  sm:text-5xl
                  lg:text-6xl

                  font-black

                  uppercase

                  leading-tight

                  tracking-tight

                  bg-gradient-to-r
                  from-white
                  via-orange-200
                  to-pink-300

                  bg-clip-text
                  text-transparent
                "
              >
                {course.title}
              </h1>


              <p
                className="
                  mt-6

                  text-gray-300

                  text-base
                  sm:text-lg

                  leading-relaxed

                  max-w-3xl
                "
              >
                {course.description}
              </p>


              <div
                className="
                  flex
                  flex-wrap

                  justify-center
                  lg:justify-start

                  gap-4

                  mt-8
                "
              >
                <div
                  className="
                    px-5 py-4

                    rounded-2xl

                    border border-white/10

                    bg-white/[0.04]

                    backdrop-blur-xl
                  "
                >
                  <div className="text-2xl font-black">
                    {course.lessons.length}
                  </div>

                  <div className="text-gray-400 text-sm mt-1">
                    Darslar
                  </div>
                </div>

                <div
                  className="
                    px-5 py-4

                    rounded-2xl

                    border border-white/10

                    bg-white/[0.04]

                    backdrop-blur-xl
                  "
                >
                  <div className="text-2xl font-black">
                    ∞
                  </div>

                  <div className="text-gray-400 text-sm mt-1">
                    Lifetime Access
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>


        <div
          className="
            flex
            items-center
            justify-between

            mb-8
          "
        >
          <div>
            <h2
              className="
                text-3xl
                sm:text-4xl

                font-black
              "
            >
              Darslar
            </h2>

            <p className="text-gray-400 mt-2">
              Kurs ichidagi barcha mavzular
            </p>
          </div>

          <div
            className="
              hidden sm:flex

              items-center

              gap-2

              px-5 py-3

              rounded-2xl

              border border-white/10

              bg-white/[0.04]

              backdrop-blur-xl
            "
          >
            <span className="text-orange-400">⚡</span>

            <span className="font-semibold">
              {course.lessons.length} lessons
            </span>
          </div>
        </div>


        <div className="grid gap-5">
          {course.lessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.05,
              }}
            >
              <Link
                to={`/courses/${course.id}/lessons/${getLessonSlug(
                  lesson.title
                )}`}
                className="
                  group
                  relative

                  overflow-hidden

                  rounded-[2rem]

                  border border-white/10

                  bg-white/[0.04]

                  backdrop-blur-2xl

                  p-5
                  sm:p-7

                  flex
                  items-center
                  justify-between

                  hover:border-orange-500/30

                  hover:-translate-y-1

                  transition-all
                  duration-300
                "
              >

                <div
                  className="
                    absolute inset-0

                    opacity-0
                    group-hover:opacity-100

                    transition duration-500
                  "
                >
                  <div
                    className="
                      absolute
                      top-0
                      left-0

                      w-52
                      h-52

                      bg-orange-500/10

                      blur-3xl
                      rounded-full
                    "
                  />
                </div>


                <div
                  className="
                    relative z-10

                    flex
                    items-center

                    gap-5
                  "
                >

                  <div
                    className="
                      w-14
                      h-14

                      rounded-2xl

                      border border-white/10

                      bg-white/[0.05]

                      flex
                      items-center
                      justify-center

                      text-lg
                      font-black

                      group-hover:bg-orange-500
                      group-hover:text-white

                      transition-all
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>


                  <div>
                    <h3
                      className="
                        text-lg
                        sm:text-xl

                        font-bold

                        group-hover:text-orange-300

                        transition-colors
                      "
                    >
                      {lesson.title}
                    </h3>

                    <p
                      className="
                        text-gray-400

                        mt-2

                        text-sm
                      "
                    >
                      {lesson.description}
                    </p>


                    <div
                      className="
                        flex
                        items-center

                        gap-3

                        mt-4
                      "
                    >
                      <div
                        className="
                          px-3 py-1

                          rounded-full

                          bg-white/[0.05]

                          text-xs
                          text-gray-300
                        "
                      >
                        ⏱ {lesson.duration}
                      </div>

                      <div
                        className="
                          px-3 py-1

                          rounded-full

                          bg-orange-500/10

                          text-xs
                          text-orange-400
                        "
                      >
                        Beginner
                      </div>
                    </div>
                  </div>
                </div>


                <div
                  className="
                    relative z-10

                    hidden sm:flex

                    w-14 h-14

                    rounded-2xl

                    border border-white/10

                    bg-white/[0.05]

                    items-center
                    justify-center

                    text-xl

                    group-hover:bg-orange-500
                    group-hover:border-orange-500

                    transition-all duration-300
                  "
                >
                  →
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseDetail;