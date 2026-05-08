import { Link } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="bg-[#111111]/80  relative mt-20 border-t border-white/10  pt-16 pb-8"
    >
      <div className="container ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* 1. Logo va Ta'rif */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-red-900/20">
                <span className="text-white font-black text-xl">A</span>
              </div>
              <span className="text-white font-bold text-2xl tracking-tighter">
                Asilbek-school
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed opacity-80">
              Frontend dunyosiga professional kirib borish va zamonaviy texnologiyalarni 
              chuqur o'rganish uchun eng qulay va tizimli platforma.
            </p>
            <div className="flex gap-4">
              <a href="https://t.me/as1lbek_2706" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-[#0088cc] hover:text-white transition-all">
                <i className="bi bi-telegram"></i>
              </a>
              <a href="https://github.com/asilbek2706" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-white hover:text-black transition-all">
                <i className="bi bi-github"></i>
              </a>
            </div>
          </div>

          {/* 2. Yo'nalishlar */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-semibold text-lg tracking-wide">Yo'nalishlar</h4>
            <ul className="text-gray-400 space-y-3 text-sm font-light">
              <li><Link to="/courses" className="hover:text-red-400 hover:translate-x-1 transition-all inline-block">Professional Developer</Link></li>
              <li><Link to="/courses" className="hover:text-red-400 hover:translate-x-1 transition-all inline-block">HTML & CSS</Link></li>
              <li><Link to="/courses" className="hover:text-red-400 hover:translate-x-1 transition-all inline-block">React & Next.js Expert</Link></li>
              <li><Link to="/courses" className="hover:text-red-400 hover:translate-x-1 transition-all inline-block">JavaScript Core</Link></li>
              <li><Link to="/courses" className="hover:text-red-400 hover:translate-x-1 transition-all inline-block">TypeScript Deep Dive</Link></li>
            </ul>
          </div>

          {/* 3. Aloqa */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-semibold text-lg tracking-wide">Aloqa</h4>
            <div className="space-y-4">
              <a href="tel:+998507536636" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-red-500/20">
                  <i className="bi bi-telephone text-sm"></i>
                </div>
                <span className="text-sm">+998 50 753 66 36</span>
              </a>
              <a href="mailto:asilbekkaromatov2@gmail.com" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-red-500/20">
                  <i className="bi bi-envelope text-sm"></i>
                </div>
                <span className="text-sm truncate">asilbekkaromatov2@gmail.com</span>
              </a>
            </div>
          </div>

          {/* 4. Slogan */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-semibold text-lg tracking-wide">Platforma</h4>
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-sm">
              <p className="text-gray-300 text-xs italic leading-relaxed mb-4 opacity-70">
                "O'zingdan kuchlirog'ini yaratish uchun har kun harakatdan to'xtama. Kelajak seni kutyapti."
              </p>
              <span className="text-red-400 text-[10px] font-bold uppercase tracking-[0.2em]">Asilbek School Team</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-[11px] tracking-wider uppercase">
            © {currentYear} Asilbek-school. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex gap-6">
            <span className="text-gray-500 text-[10px] uppercase tracking-widest cursor-default">Developer: @as1lbek_2706</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;