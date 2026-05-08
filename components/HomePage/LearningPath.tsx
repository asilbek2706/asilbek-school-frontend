import { Link } from "react-router";

const paths = [
  {
    title: "Professional Developer",
    desc: "Senior darajasiga chiqish uchun zarur bo'lgan professional ko'nikmalar yo'li.",
    time: "71 hours, 1 minute",
    icon: "/images/dev1.png",
    color: "from-purple-600/20",
  },
  {
    title: "React & Next.js",
    desc: "Zamonaviy SPA va SSR ilovalar yaratish, optimizatsiya va state-management.",
    time: "40 hours, 7 minutes",
    icon: "/icons/react.svg",
    color: "from-cyan-500/20",
  },
  {
    title: "JavaScript Core",
    desc: "Tilning tub asoslari, asinxron dasturlash va Event Loop mexanizmlari.",
    time: "26 hours, 51 minutes",
    icon: "/icons/js.svg",
    color: "from-yellow-500/20",
  },
  {
    title: "TypeScript Expert",
    desc: "Static typing orqali xavfsiz va miqyoslanuvchi kod yozish san'ati.",
    time: "33 hours, 38 minutes",
    icon: "/icons/ts.svg",
    color: "from-blue-500/20",
  },
];

const LearningPaths = () => {
  return (
    <section className="relative py-16 bg-transparent">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            O'quv Yo'nalishlari
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-xl leading-relaxed">
            Sohani professional darajagacha o'rganish uchun tizimli o'quv rejalari.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {paths.map((path, index) => (
            <Link
              key={index}
              to="/courses"
              className="group relative flex items-stretch bg-[#111111]/80 backdrop-blur-md border border-white/[0.05] rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300"
            >
              <div className={`relative flex-shrink-0 w-32 md:w-44 flex items-center justify-center overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-r ${path.color} to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500`}></div>
                <img
                  src={path.icon}
                  alt={path.title}
                  className="relative z-10 w-16 h-16 md:w-20 md:h-20 object-contain opacity-90 group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="flex-1 p-5 md:p-6 flex flex-col justify-center">
                <div className="flex items-center gap-1 mb-1.5">
                  <h3 className="text-white font-semibold text-base md:text-lg tracking-wide group-hover:text-red-500 transition-colors">
                    {path.title}
                  </h3>
                  <i className="bi bi-chevron-right text-gray-500 text-xs mt-0.5 group-hover:translate-x-1 transition-transform"></i>
                </div>
                
                <p className="text-gray-400 text-xs md:text-sm leading-snug mb-4 font-light opacity-70 line-clamp-2">
                  {path.desc}
                </p>

                <div className="w-full h-[1px] bg-white/[0.05] mb-3.5"></div>

                <div className="flex items-center gap-2">
                  <span className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-wider">
                    Umumiy Vaqt:
                  </span>
                  <span className="text-gray-500 text-[10px] md:text-xs italic">
                    {path.time}
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 bg-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningPaths;