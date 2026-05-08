import { Link } from "react-router";
import { paths } from "../data/learningPath";

const LearningPaths = () => {
  return (
    <section className="relative py-24 bg-transparent">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header - Minimal va tushunarli */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            O'quv Yo'nalishlari
          </h2>
          <p className="text-gray-500 text-base max-w-xl leading-relaxed">
            Sohani professional darajagacha o'rganish uchun tizimli o'quv rejalari.
          </p>
        </div>

        {/* Grid - 2 ustunli toza struktura */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {paths.map((path, index) => (
            <div
              key={index}
              className="group relative rounded-[2rem] bg-white/2 border border-white/[0.05] hover:border-red-500/30 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-red-500/5"
            >
              <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-10 backdrop-blur-md">
                
                {/* Ikonka - Nur effektisiz, faqat toza rang o'zgarishi */}
                <div className="relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-2xl bg-white/[0.03] border border-white/[0.05] group-hover:bg-red-500/[0.05] transition-all duration-500">
                  <i className={`bi ${path.icon} text-3xl md:text-4xl text-gray-500 group-hover:text-red-500 transition-colors duration-500`}></i>
                </div>

                {/* Kontent */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-white/90 mb-2 group-hover:text-white transition-colors">
                    {path.title}
                  </h3>
                  <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6 group-hover:text-gray-400 transition-colors">
                    {path.desc}
                  </p>

                  {/* Pastki meta ma'lumotlar */}
                  <div className="flex items-center justify-end pt-5 border-t border-white/[0.03]">
                    
                    <Link 
                      to="/courses" 
                      className="text-[11px] font-bold text-gray-500 hover:text-red-500 uppercase tracking-widest flex items-center gap-2 transition-all group-hover:translate-x-1"
                    >
                      Boshlash <i className="bi bi-arrow-right text-sm"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningPaths;