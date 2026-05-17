import { values } from "../../data/coreValuesData";

const CoreValues = () => {

  return (
    <section className="bg-transparent relative overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-white/5 mt-12 p-6 md:p-12 shadow-2xl">
      <div className="container mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-widest uppercase">
            BIZNING QADRIYATLARIMIZ
          </h2>
          <div className="h-1.5 w-24 bg-red-600 mx-auto mt-4 rounded-full"></div>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((item, index) => (
            <div 
              key={index}
              className="flex flex-col h-full p-6 md:p-8 rounded-[2rem] bg-white/[0.02] backdrop-blur-xl border border-white/5 hover:border-red-600/40 hover:bg-white/[0.04] transition-all duration-500 group"
            >
              
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-red-600/10 rounded-xl p-2 border border-red-600/20">
                  <img src={item.icon} alt="icon" className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
                </div>
                <h3 className="text-sm md:text-base font-bold text-white/90 group-hover:text-red-500 transition-colors uppercase leading-tight">
                  {item.title}
                </h3>
              </div>

              
              <div className="flex-grow flex items-center justify-center relative min-h-[160px]">
                {item.stack ? (
                  <div className="grid grid-cols-2 gap-4 w-full">
                    {item.stack.map((s, i) => (
                      <div key={i} className="bg-white/5 p-3 rounded-2xl border border-white/5 flex items-center justify-center hover:bg-red-600/10 transition-colors">
                        <img src={s} alt="stack" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="relative w-full h-full overflow-hidden rounded-2xl border border-white/5">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-40"></div>
                  </div>
                )}
              </div>

              
              <p className="mt-6 text-xs md:text-sm text-gray-500 group-hover:text-gray-300 transition-colors leading-relaxed font-medium italic">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-red-600/5 blur-[100px] rounded-full pointer-events-none"></div>
    </section>
  );
};

export default CoreValues;