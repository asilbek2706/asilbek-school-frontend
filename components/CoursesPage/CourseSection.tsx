import { Link } from "react-router";
import { courses } from "../../data/courses.data";

const CourseSection = () => {
  return (
    <section className="relative py-20 px-6 mx-auto max-w-7xl">
      {/* Kartalar Konteyneri */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-20">
        {courses.map((course) => (
          <Link
            to={`/courses/${course.id}`}
            key={course.id}
            className="group relative h-[480px] transition-all duration-500 hover:-translate-y-4"
          >
            {/* Asosiy Glass Karta */}
            <div className="relative h-full w-full rounded-[2rem] border-[3px] border-white/30 bg-white/10 backdrop-blur-md p-8 flex flex-col items-center text-center shadow-2xl overflow-hidden">
              
              {/* Ichki nur effekti (Refraction) */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/5 pointer-events-none" />

              {/* Icon qismi */}
              <div className="relative mb-8 mt-6">
                <div className="absolute inset-0 blur-3xl bg-blue-500/20 rounded-full" />
                <img 
                  src={course.icon} 
                  alt={course.title} 
                  className="w-32 h-32 object-contain relative z-20 transition-transform duration-500 group-hover:scale-110" 
                />
              </div>

              {/* Matnlar */}
              <h3 className="text-xl font-black text-orange-500 tracking-wider mb-6 uppercase leading-tight">
                {course.title}
              </h3>
              
              <p className="text-gray-200 text-sm leading-relaxed font-medium opacity-90">
                {course.description}
              </p>

              {/* Karta ostidagi ichki yorug'lik */}
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
            </div>

            {/* Karta ostidagi soya (Platformaga tushib turgan) */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-black/40 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
        ))}
      </div>

      {/* Rasmda ko'ringan "Glass Shelf" Platformasi (image_ff1718.jpg dagi kabi) */}
      <div className="relative -mt-16 z-10">
        {/* Platformaning ustki qismi */}
        <div className="mx-auto w-full max-w-7xl h-36 bg-white/20 backdrop-blur-2xl rounded-[2rem] border-t border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.2)] perspective-1000 rotateX-60" 
             style={{ transform: 'perspective(1000px) rotateX(60deg)' }}>
        </div>

      </div>
    </section>
  );
};

export default CourseSection;