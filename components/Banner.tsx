import {Link} from "react-router";

const Banner = () => {
    return (
        <div
            className="relative w-full min-h-[500px] flex flex-col md:flex-row items-center justify-between rounded-[2.5rem] bg-gradient-to-br from-gray-900/60 via-gray-800/40 to-red-950/20 border border-white/5 overflow-hidden p-8 md:p-16 mt-6 fill-accent">

            <div className="flex-[1.2] text-center md:text-left space-y-8 z-10 order-2 md:order-1">
                <div className="space-y-4">
                    <div
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.2em]">
              Professional Ta'lim
            </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
      Frontend
    </span>&nbsp;sohasini <br/> tajribali ustoz bilan o'rganing
                    </h1>
                </div>

                <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed">
                    Arxitektura, samaradorlik va foydalanuvchi tajribasiga (UX) asoslangan zamonaviy veb-ilovalarni
                    yaratish bo'yicha professional tajriba.
                </p>

                <div
                    className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-medium text-gray-500 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                        <span className="text-red-500 font-bold">#</span> React & Next.js
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-red-500 font-bold">#</span> TypeScript
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-red-500 font-bold">#</span> Clean Code
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                    <Link to="/courses"
                          className="w-full sm:w-auto px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-red-600/20 active:scale-95 text-center">
                        Kurslarni ko'rish
                    </Link>
                    <Link to="/about"
                          className="w-full sm:w-auto px-10 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all text-center backdrop-blur-md">
                        Batafsil ma'lumot
                    </Link>
                </div>
            </div>

            <div className="flex-1 flex justify-center md:justify-end order-1 md:order-2 mb-12 md:mb-0 relative">
                <div className="absolute inset-0 bg-red-600/20 blur-[100px] rounded-full scale-75"></div>

                <div className="relative group">
                    <img
                        src="/men.jpg"
                        alt="Asilbek Karomatov"
                        className="w-72 h-72 md:w-96 md:h-96 object-cover rounded-[3.5rem] border-2 border-white/10 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-[1.02]"
                    />

                    <div
                        className="absolute -bottom-6 -left-6 bg-gray-900/90 border border-white/10 p-5 rounded-[2rem] shadow-2xl backdrop-blur-xl hidden lg:block">
                        <div className="flex items-center gap-4">
                            <div
                                className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30">
                                <i className="bi bi-cpu text-white text-xl"></i>
                            </div>
                            <div>
                                <p className="text-white font-black text-lg leading-none">Clean Code</p>
                                <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-1">Sifat
                                    kafolati</p>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        </div>
    );
};

export default Banner;