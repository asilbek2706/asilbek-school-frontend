import { Link } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="bg-[#111111]/80 relative mt-20 border-t border-white/10 pt-16 pb-8 px-4 md:px-0"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>

      <div className="container mx-auto"> 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-red-900/20">
                <span className="text-white font-black text-xl">A</span>
              </div>
              <span className="text-white font-bold text-2xl tracking-tighter">
                Asilbek-school
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Frontend dunyosiga professional kirib borish va zamonaviy texnologiyalarni 
              chuqur o'rganish uchun eng qulay va tizimli platforma.
            </p>
            <div className="flex gap-4">
              <a href="https://t.me/as1lbek_2706" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-[#0088cc] hover:text-white transition-all duration-300 border border-white/5">
                <i className="bi bi-telegram"></i>
              </a>
              <a href="https://github.com/asilbek2706" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-white hover:text-black transition-all duration-300 border border-white/5">
                <i className="bi bi-github"></i>
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start gap-6">
            <h4 className="text-white font-semibold text-lg tracking-wide">Yo'nalishlar</h4>
            <ul className="text-gray-400 space-y-3 text-sm font-light flex flex-col items-center md:items-start">
              <li><Link to="/courses" className="hover:text-red-400 hover:translate-x-1 transition-all duration-300 inline-block">Professional Developer</Link></li>
              <li><Link to="/courses" className="hover:text-red-400 hover:translate-x-1 transition-all duration-300 inline-block">HTML & CSS</Link></li>
              <li><Link to="/courses" className="hover:text-red-400 hover:translate-x-1 transition-all duration-300 inline-block">React & Next.js Expert</Link></li>
              <li><Link to="/courses" className="hover:text-red-400 hover:translate-x-1 transition-all duration-300 inline-block">JavaScript Core</Link></li>
              <li><Link to="/courses" className="hover:text-red-400 hover:translate-x-1 transition-all duration-300 inline-block">TypeScript Deep Dive</Link></li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start gap-6">
            <h4 className="text-white font-semibold text-lg tracking-wide">Aloqa</h4>
            <div className="space-y-4 w-full flex flex-col items-center md:items-start">
              <a href="tel:+998507536636" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-red-500/20 transition-all border border-white/5">
                  <i className="bi bi-telephone text-sm"></i>
                </div>
                <span className="text-sm font-light">+998 50 753 66 36</span>
              </a>
              <a href="mailto:asilbekkaromatov2@gmail.com" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-red-500/20 transition-all border border-white/5">
                  <i className="bi bi-envelope text-sm"></i>
                </div>
                <span className="text-sm font-light truncate max-w-[200px] md:max-w-none">asilbekkaromatov2@gmail.com</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start gap-6">
            <h4 className="text-white font-semibold text-lg tracking-wide">Platforma</h4>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-red-600 opacity-50"></div>
              <p className="text-gray-400 text-xs italic leading-relaxed mb-4">
                "O'zingdan kuchlirog'ini yaratish uchun har kun harakatdan to'xtama. Kelajak seni kutyapti."
              </p>
              <span className="text-red-500 text-[10px] font-bold uppercase tracking-[0.2em]">Asilbek School Team</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-gray-500 text-[11px] tracking-wider uppercase">
            © {currentYear} Asilbek-school. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-gray-400 text-[10px] uppercase tracking-widest">Developer: Asilbek Karomatov</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;