import { steps } from "@/shared/mocks/about/teaching-roadmap.mock";

const TeachingRoadmap = () => {
  return (
    <section className="bg-transparent relative overflow-hidden rounded-[2.5rem] border border-white/5 mt-12 p-6 md:p-12 shadow-2xl">
      <div className="container mx-auto">
        
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-[0.2em] uppercase">
            Ta'lim Metodikasi
          </h2>
          <div className="h-1.5 w-24 bg-red-600 mx-auto mt-4 rounded-full"></div>
        </div>

        
        <div className="relative max-w-7xl mx-auto">
          
          
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 hidden md:block">
            
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border-t-2 border-r-2 border-white/20 rotate-45"></div>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative z-10">
            {steps.map((step) => (
              <div 
                key={step.id} 
                className={`relative flex flex-col items-center ${
                  step.position === "top" 
                    ? "md:pb-40 md:justify-end" 
                    : "md:pt-40 md:mt-auto md:justify-start"
                }`}
              >
                
                <div className="group relative w-full p-6 md:p-8 rounded-[2rem] bg-white/[0.02] backdrop-blur-xl border border-white/5 hover:border-red-600/40 transition-all duration-500 shadow-xl">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl md:text-5xl font-black text-red-600 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                      {step.id}.
                    </span>
                    <h3 className="text-sm md:text-base font-bold text-gray-200 leading-tight tracking-wide group-hover:text-white transition-colors uppercase">
                      {step.title}
                    </h3>
                  </div>
                  
                  
                  <div className={`absolute left-1/2 -translate-x-1/2 w-[2px] h-16 border-l-2 border-dashed border-red-600/20 hidden md:block ${
                    step.position === "top" ? "top-full" : "bottom-full"
                  }`}></div>

                  
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-red-600/40 rounded-full md:hidden"></div>
                </div>

                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#050505] border-2 border-white/5 hidden md:flex items-center justify-center group-hover:border-red-600 transition-all duration-500 z-20">
                  <span className="text-xs font-black text-gray-600 group-hover:text-red-500">{step.id}</span>
                  
                  <div className="absolute inset-0 rounded-full bg-red-600 opacity-0 group-hover:opacity-20 group-hover:blur-md transition-all duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        
        <div className="mt-16 text-center md:hidden border-t border-white/5 pt-8">
          <p className="text-gray-600 text-[10px] uppercase tracking-[0.3em] font-bold">
            Bosqichma-bosqich rivojlanish yo'li
          </p>
        </div>
      </div>

      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.03),transparent_70%)] pointer-events-none"></div>
    </section>
  );
};

export default TeachingRoadmap;