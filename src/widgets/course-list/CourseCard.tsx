import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Course } from "@/entities/course/model/types";

const getCourseSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <div
      className="
        group
        relative

        h-[390px]
        sm:h-[470px]
        md:h-[520px]
      "
    >
      <motion.div
        whileHover={{ y: -10 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="
          relative
          h-full
          w-full
          overflow-hidden

          rounded-[2.5rem]

          border border-white/10
          bg-white/[0.06]

          backdrop-blur-3xl

          shadow-[0_15px_50px_rgba(0,0,0,0.45)]

          px-5 py-5
          sm:px-7 sm:py-8

          flex flex-col
          items-center
          text-center
        "
      >
        
        <div
          className="
            absolute inset-0
            pointer-events-none

            opacity-0
            group-hover:opacity-100

            transition duration-700
          "
        >
          <div
            className="
              absolute
              -top-16
              -left-16

              w-44 h-44
              sm:w-72 sm:h-72

              bg-orange-500/20
              blur-3xl
              rounded-full
            "
          />

          <div
            className="
              absolute
              bottom-0
              right-0

              w-44 h-44
              sm:w-72 sm:h-72

              bg-pink-500/20
              blur-3xl
              rounded-full
            "
          />
        </div>

        
        <div
          className="
            absolute inset-0
            pointer-events-none

            bg-gradient-to-br
            from-white/10
            via-transparent
            to-transparent
          "
        />

        
        <div className="relative z-20 flex flex-col items-center w-full h-full">
          
          <motion.div
            whileHover={{ scale: 1.05, rotate: 3 }}
            className="
              relative

              mt-1 sm:mt-3
              mb-5 sm:mb-8

              flex items-center justify-center
            "
          >
            
            <div
              className="
                absolute

                w-24 h-24
                sm:w-40 sm:h-40

                bg-orange-500/20
                blur-3xl
                rounded-full
              "
            />

            
            <div
              className="
                relative z-10

                w-20 h-20
                sm:w-32 sm:h-32

                rounded-full

                border border-white/20
                bg-white/10

                backdrop-blur-xl

                flex items-center justify-center

                shadow-inner
              "
            >
              <img
                src={course.icon}
                alt={course.title}
                className="
                  w-12 h-12
                  sm:w-20 sm:h-20

                  object-contain
                "
              />
            </div>
          </motion.div>

          
          <h3
            className="
              text-[15px]
              sm:text-2xl

              font-black
              uppercase

              tracking-[0.14em]
              sm:tracking-[0.25em]

              bg-gradient-to-r
              from-orange-400
              to-pink-500

              bg-clip-text
              text-transparent

              mb-4
            "
          >
            {course.title}
          </h3>

          
          <div
            className="
              relative

              bg-white/[0.05]
              border border-white/10

              rounded-[1.6rem]
              sm:rounded-[2rem]

              px-3 py-3
              sm:px-5 sm:py-6

              backdrop-blur-xl

              w-full
            "
          >
            <p
              className="
                text-gray-200

                text-[12px]
                sm:text-sm

                leading-relaxed
                font-medium
              "
            >
              {course.description}
            </p>
          </div>

          
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="mt-auto pt-6 sm:pt-10 w-full"
          >
            <Link
              to={`/courses/${getCourseSlug(course.title)}`}
              className="
                relative z-30

                block
                w-full

                cursor-pointer

                py-2.5
                sm:py-4

                rounded-full

                bg-gradient-to-r
                from-orange-500
                to-pink-500

                text-white
                text-sm sm:text-base
                font-bold
                tracking-wider

                shadow-lg
                shadow-orange-500/20

                hover:opacity-90
                transition-all
                duration-300

                text-center
              "
            >
              Kursni ko‘rish
            </Link>
          </motion.div>
        </div>

        
        <div
          className="
            absolute bottom-0 inset-x-0
            pointer-events-none

            h-24

            bg-gradient-to-t
            from-white/10
            to-transparent
          "
        />
      </motion.div>

      
      <div
        className="
          absolute
          -bottom-5
          left-1/2
          -translate-x-1/2

          w-[75%]
          h-8

          bg-black/40

          blur-2xl
          rounded-full

          opacity-0
          group-hover:opacity-100

          transition-all duration-500
        "
      />
    </div>
  );
};

export default CourseCard;