import {
    useLoaderData,
    type LoaderFunctionArgs,
} from "react-router";
import { motion } from "framer-motion";
import { courses } from "../../../../data/courses.data";
import type { Lesson } from "../../../../interfaces/courses.interface";

const getCourseSlug = (title: string) =>
    title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

export async function loader({
    params,
}: LoaderFunctionArgs) {
    const course = courses.find(
        (c) => getCourseSlug(c.title) === params.courseTitle?.toLowerCase()
    );

    const requestedLessonSlug =
        params.lessonTitle?.toLowerCase();

    const lesson = course?.lessons.find((l) => {
        const lessonSlug = l.title
            .toLowerCase()
            .replace(/\s+/g, "-");

        return lessonSlug === requestedLessonSlug;
    });

    if (!lesson) {
        throw new Response("Dars topilmadi", {
            status: 404,
        });
    }

    return {
        lesson,
        courseTitle: course?.title,
    };
}

const LessonDetail = () => {
    const { lesson, courseTitle } =
        useLoaderData() as {
            lesson: Lesson;
            courseTitle?: string;
        };

    const codeSnippet =
        lesson.codeSnippet?.trim() ||
        "// Kod mavjud emas";
    const descriptionLines = Array.isArray(lesson.description)
        ? lesson.description
        : [lesson.description || "Ushbu dars uchun tavsif kiritilmagan."];

    return (
        <section
            className="
        relative

        min-h-screen

        overflow-hidden

        px-4
        sm:px-6
        lg:px-8

        py-10
        sm:py-16

        text-white
      "
        >

            <div className="absolute inset-0 overflow-hidden">

            </div>

            <div className="relative z-10 max-w-7xl mx-auto">

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
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

            shadow-[0_20px_80px_rgba(0,0,0,0.45)]

            mb-10
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

                    <div className="relative z-10">

                        <div className="flex flex-wrap gap-3 mb-6">
                            <div
                                className="
                  inline-flex
                  items-center

                  gap-2

                  px-4 py-2

                  rounded-full

                  bg-orange-500/10
                  border border-orange-500/20

                  text-orange-400

                  text-sm
                  font-semibold
                "
                            >
                                <span className="w-2 h-2 bg-orange-400 rounded-full" />

                                {courseTitle}
                            </div>

                        </div>


                        <h1
                            className="
                text-3xl
                sm:text-5xl
                lg:text-6xl

                font-black

                leading-tight

                uppercase

                bg-gradient-to-r
                from-white
                via-orange-200
                to-pink-300

                bg-clip-text
                text-transparent
              "
                        >
                            {lesson.id}. {lesson.title}
                        </h1>


                        <p
                            className="
                mt-6

                text-gray-300

                text-base
                sm:text-lg

                leading-relaxed

                max-w-4xl
              "
                        >
                            {descriptionLines[0]}
                        </p>
                    </div>
                </motion.div>


                <div
                    className="
            grid

            grid-cols-1
            xl:grid-cols-[420px_1fr]

            gap-8
          "
                >

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -20,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            delay: 0.2,
                        }}
                        className="
              space-y-6
            "
                    >

                        <div
                            className="
                rounded-[2rem]

                border border-white/10

                bg-white/[0.04]

                backdrop-blur-2xl

                p-6
                sm:p-8
              "
                        >
                            <div
                                className="
                  flex items-center gap-3

                  mb-6
                "
                            >
                                <div
                                    className="
                    w-12 h-12

                    rounded-2xl

                    bg-orange-500/10

                    flex items-center justify-center

                    text-orange-400
                    text-xl
                  "
                                >
                                    📘
                                </div>

                                <div>
                                    <h2
                                        className="
                      text-2xl
                      font-black
                    "
                                    >
                                        Nazariya
                                    </h2>

                                    <p className="text-gray-400 text-sm">
                                        Mavzu tushuntirishi
                                    </p>
                                </div>
                            </div>


                            <div
                                className="
                  text-gray-300

                  leading-8

                  space-y-5
                "
                            >
                                {descriptionLines.map((line, index) => (
                                    <p key={index}>{line}</p>
                                ))}
                            </div>
                        </div>


                        <div
                            className="
                rounded-[2rem]

                border border-white/10

                bg-white/[0.04]

                backdrop-blur-2xl

                p-6
              "
                        >
                            <h3
                                className="
                  text-xl
                  font-bold

                  mb-5
                "
                            >
                                Dars haqida
                            </h3>

                            <div className="space-y-4">
                                <div
                                    className="
                    flex items-center justify-between

                    border-b border-white/5

                    pb-3
                  "
                                >
                                    <span className="text-gray-400">
                                        Lesson ID
                                    </span>

                                    <span className="font-semibold">
                                        #{lesson.id}
                                    </span>
                                </div>

                                <div
                                    className="
                    flex items-center justify-between
                  "
                                >
                                    <span className="text-gray-400">
                                        Daraja
                                    </span>

                                    <span
                                        className="
                      px-3 py-1

                      rounded-full

                      bg-green-500/10

                      text-green-400

                      text-sm
                      font-semibold
                    "
                                    >
                                        Beginner
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>


                    <motion.div
                        initial={{
                            opacity: 0,
                            x: 20,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            delay: 0.25,
                        }}
                        className="
              overflow-hidden

              rounded-[2rem]

              border border-white/10

              bg-[#0d0d0d]

              shadow-[0_20px_80px_rgba(0,0,0,0.45)]
            "
                    >

                        <div
                            className="
                flex
                flex-col
                sm:flex-row

                sm:items-center
                justify-between

                gap-4

                px-5 py-4

                border-b border-white/10

                bg-white/[0.03]
              "
                        >

                            <div className="flex items-center gap-4">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />

                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />

                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>

                                <div
                                    className="
                    text-sm
                    text-gray-400
                  "
                                >
                                    snippet-example.txt
                                </div>
                            </div>

                            <div className="text-xs text-gray-400">
                                Faqat tushuntirish uchun kod (read-only)
                            </div>
                        </div>


                        <div
                            className="
                relative

                min-h-[500px]

                overflow-x-auto

                p-5
                sm:p-8

                bg-[#e8e8e8]
              "
                        >

                            <div
                                className="
                  absolute
                  top-0
                  left-0

                  h-[1px]
                  w-full

                  bg-gradient-to-r
                  from-transparent
                  via-orange-500/30
                  to-transparent
                "
                            />


                            <pre
                                className="
                  text-sm
                  sm:text-[15px]

                  leading-8

                  text-[#1b1b1b]

                  font-mono

                  whitespace-pre-wrap
                "
                            >
                                <code>{codeSnippet}</code>
                            </pre>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default LessonDetail;
