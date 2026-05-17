import { useState } from "react";
import { faqData } from "@/shared/mocks/faq/faq.mock";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-transparent">
      <div className="w-full mx-auto px-6">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Ko'p so'raladigan savollar
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = activeIndex === index;
            
            return (
              <div 
                key={item.id} 
                className={`group border border-white/5 rounded-2xl transition-all duration-300 ${
                  isOpen ? "bg-white/[0.05] border-white/10" : "bg-white/[0.02] hover:bg-white/[0.04]"
                }`}
              >
                <button
                  className="flex justify-between items-center w-full p-5 text-left outline-none cursor-pointer"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className={`font-bold text-lg transition-colors duration-300 ${
                    isOpen ? "text-red-500" : "text-gray-300 group-hover:text-white"
                  }`}>
                    {item.question}
                  </span>
                  
                  
                  <div className={`relative w-6 h-6 flex items-center justify-center transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}>
                    <div className="absolute w-4 h-0.5 bg-current transition-colors"></div>
                    <div className={`absolute w-0.5 h-4 bg-current transition-all duration-500 ${isOpen ? "opacity-0 rotate-90" : "opacity-100"}`}></div>
                  </div>
                </button>

                
                <div className={`grid transition-all duration-500 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100 p-5 pt-0" : "grid-rows-[0fr] opacity-0 p-0"
                }`}>
                  <div className="overflow-hidden">
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed border-t border-white/5 pt-4">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;