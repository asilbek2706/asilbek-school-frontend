import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import { paths } from "@/shared/mocks/home/learning-path.mock";

const PathCard = ({ path }: { path: any }) => (
  <Link
    to="/courses"
    className="group relative flex items-stretch bg-[#111111]/80 backdrop-blur-md border border-white/[0.05] rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300 h-full"
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
  </Link>
);

const LearningPaths = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative py-16 bg-transparent">
      <div className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-red-600/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            O'quv Yo'nalishlari
          </h2>
          <div className="w-20 h-1 bg-red-600 rounded-full mb-4 mx-auto md:mx-0"></div>
          <p className="text-gray-500 text-sm md:text-base max-w-xl leading-relaxed">
            Sohani professional darajagacha o'rganish uchun tizimli o'quv rejalari.
          </p>
        </div>

        <div className="hidden lg:grid lg:grid-cols-2 gap-6">
          {paths.map((path, index) => (
            <PathCard key={index} path={path} />
          ))}
        </div>

        <div className="lg:hidden">
          {!isMounted ? (
            <div className="space-y-4">
              {paths.map((path, index) => (
                <PathCard key={index} path={path} />
              ))}
            </div>
          ) : (
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            breakpoints={{
              768: {
                slidesPerView: 1.5, 
                spaceBetween: 25
              }
            }}
            className="learning-swiper !pb-14"
          >
            {paths.map((path, index) => (
              <SwiperSlide key={index} className="h-auto">
                <PathCard path={path} />
              </SwiperSlide>
            ))}
          </Swiper>
          )}
        </div>
      </div>

      
      <style>{`
        .learning-swiper .swiper-pagination-bullet {
          background: #dc2626 !important;
          opacity: 0.2;
        }
        .learning-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 20px;
          border-radius: 4px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </section>
  );
};

export default LearningPaths;