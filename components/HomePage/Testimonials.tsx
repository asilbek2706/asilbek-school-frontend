import { useEffect, useState, type FC } from 'react';
import { Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import type { Testimonial } from '../../interfaces/testimonials';
import { testimonials } from '../../data/testimonialsData';

const TestimonialCard: React.FC<{ item: Testimonial }> = ({ item }) => (
    <div className="group relative flex flex-col bg-white/[0.03] backdrop-blur-md p-8 rounded-3xl border border-white/5 transition-all duration-500 hover:bg-white/[0.06] hover:border-red-500/20 lg:hover:-translate-y-2 h-full">
        <p className="text-gray-300 leading-relaxed italic mb-8 relative z-10 text-sm md:text-base">
            "{item.quote}"
        </p>

        <div className="mt-auto flex items-center gap-4 border-t border-white/5 pt-6 relative z-10">
            <div className="relative">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-red-500/30 group-hover:border-red-500 transition-colors duration-500"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#1a0a08] rounded-full"></div>
            </div>
            <div>
                <h4 className="font-bold text-white group-hover:text-red-500 transition-colors duration-300">
                    {item.name}
                </h4>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">
                    {item.role}
                </p>
            </div>
        </div>

        <div className="absolute bottom-6 right-8 opacity-10 group-hover:opacity-30 group-hover:scale-110 rotate-180 transition-all duration-500 pointer-events-none">
            <Quote className="w-12 h-12 text-red-500" />
        </div>
    </div>
);

const TestimonialSection: FC = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <section className="rounded-[2.5rem] relative bg-gradient-to-br from-gray-900/60 via-gray-800/40 to-red-950/20 border border-white/5 py-24 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                        Talabalarimiz nima deydi?
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-red-600 to-transparent mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-lg font-light leading-relaxed">
                        Bizning bitiruvchilar allaqachon sohada o'z o'rinlarini topishgan.
                    </p>
                </div>

                <div className="hidden lg:grid lg:grid-cols-3 gap-8">
                    {testimonials.map((item) => (
                        <TestimonialCard key={item.id} item={item} />
                    ))}
                </div>

                <div className="lg:hidden">
                    {!isMounted ? (
                        <div className="space-y-4">
                            {testimonials.map((item) => (
                                <TestimonialCard key={item.id} item={item} />
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
                            640: { slidesPerView: 2 },
                        }}
                        className="testimonial-swiper !pb-14"
                    >
                        {testimonials.map((item) => (
                            <SwiperSlide key={item.id} className="h-auto">
                                <TestimonialCard item={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    )}
                </div>

                <div className="mt-12 md:mt-20 text-center">
                    <p className="text-gray-500 text-sm italic">
                        "Sizning muvaffaqiyatingiz — bizning eng katta yutug'imizdir."
                    </p>
                </div>
            </div>

            <style>{`
                .testimonial-swiper .swiper-pagination-bullet {
                    background: #dc2626 !important;
                    opacity: 0.3;
                }
                .testimonial-swiper .swiper-pagination-bullet-active {
                    opacity: 1;
                    width: 24px;
                    border-radius: 4px;
                    transition: all 0.3s;
                }
            `}</style>
        </section>
    );
};

export default TestimonialSection;