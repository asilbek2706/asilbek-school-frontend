import { motion } from "framer-motion";
import { goals } from "../../data/ourGoals.data";

const OurGoals = () => {
  return (
    <section className="bg-transparent relative overflow-hidden rounded-[2.5rem] border border-white/5 mt-12 p-6 md:p-12 shadow-2xl">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center space-y-4 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <span className="text-red-500 text-[10px] font-bold uppercase tracking-[0.2em]">Internal Strategy</span>
            <span className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">Roadmap</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight"
          >
            Bizning <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Maqsadimiz</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-3xl mx-auto text-sm md:text-base leading-relaxed font-medium"
          >
            Asilbek-school — bu Frontend muhandisligini dunyo standartlari darajasida o'rgatish va har bir talabaning professional o'sishiga ko'maklashishni maqsad qilgan platforma.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {goals.map((goal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="relative group h-full"
            >
              <div className="relative h-full p-8 rounded-[2.5rem] bg-gradient-to-b from-white/[0.08] to-transparent border border-white/10 backdrop-blur-2xl overflow-hidden flex flex-col items-center text-center transition-all duration-500 group-hover:border-white/20">
                <div className={`absolute inset-0 bg-gradient-to-br ${goal.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                <div className="relative z-10 mb-8 p-6 rounded-3xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                  {goal.icon}
                  <div className="absolute inset-0 blur-2xl bg-current opacity-20"></div>
                </div>

                <div className="relative z-10 space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight leading-tight min-h-[3.5rem] flex items-center justify-center">
                    {goal.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light">
                    {goal.description}
                  </p>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurGoals;