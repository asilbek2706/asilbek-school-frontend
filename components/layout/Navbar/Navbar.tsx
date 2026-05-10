import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router"; 
import "./Navbar.css";

interface NavLinkProps{
  isActive: boolean;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const getDesktopClass = ({ isActive }: NavLinkProps) => 
    isActive ? "nav-link-desktop active" : "nav-link-desktop";

  const getMobileClass = ({ isActive }: NavLinkProps) => 
    isActive ? "mobile-link active" : "mobile-link";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="navbar-container sticky top-0 z-50 border-b border-gray-700/50 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 group z-[60]"
          onClick={closeMenu}
        >
          <img
            src="/logo.png"
            alt="Logo"
            className="w-9 h-9 md:w-10 md:h-10 object-contain"
          />
          <span className="text-white font-bold text-xl tracking-tight group-hover:text-red-500 transition-colors">
            Asilbek-school
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          <div className="flex items-center gap-4 lg:gap-6 border-r border-gray-700 pr-4">
            <NavLink to="/" end className={getDesktopClass}>
              Asosiy
            </NavLink>
            <NavLink to="/about" className={getDesktopClass}>
              Biz haqimizda
            </NavLink>
            <NavLink to="/courses" className={getDesktopClass}>
              Kurslar
            </NavLink>
            <NavLink to="/faq" className={getDesktopClass}>
              FAQ
            </NavLink>
            <NavLink to="/contact" className={getDesktopClass}>
              Bog'lanish
            </NavLink>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group hidden lg:block">
              <input
                type="text"
                placeholder="Qidiruv..."
                className="search-input-desktop"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </div>

            <Link to="/login">
              <button className="login-btn-desktop flex items-center gap-2">
                <i className="bi bi-box-arrow-in-right text-lg"></i>
                Kirish
              </button>
            </Link>

            <a
              href="https://t.me/dasturchi_life"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="tg-btn-desktop flex items-center gap-2">
                <i className="bi bi-telegram text-lg"></i>
                Telegram
              </button>
            </a>
          </div>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white p-2 z-[60] hover:bg-white/10 rounded-lg transition-colors"
        >
          {isOpen ? (
            <i className="bi bi-x-lg text-2xl"></i>
          ) : (
            <i className="bi bi-list text-3xl"></i>
          )}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div className={`mobile-menu ${isOpen ? "open" : ""} md:hidden`}>
        <div className="flex flex-col p-6 gap-y-4 h-full pt-28">
          <NavLink to="/" end onClick={closeMenu} className={getMobileClass}>
            Asosiy
          </NavLink>
          <NavLink to="/about" onClick={closeMenu} className={getMobileClass}>
            Biz haqimizda
          </NavLink>
          <NavLink to="/courses" onClick={closeMenu} className={getMobileClass}>
            Kurslar
          </NavLink>
          <NavLink to="/faq" onClick={closeMenu} className={getMobileClass}>
            FAQ
          </NavLink>
          <NavLink to="/contact" onClick={closeMenu} className={getMobileClass}>
            Bog'lanish
          </NavLink>

          <div className="h-[1px] bg-gray-800 my-4 shadow-[0_0_10px_rgba(255,255,255,0.1)]"></div>

          <div className="flex flex-col gap-4">
            <Link to="/login" onClick={closeMenu}>
              <button className="w-full py-4 border-2 border-red-500 text-white font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all">
                <i className="bi bi-box-arrow-in-right text-xl"></i>
                Kirish
              </button>
            </Link>
            <a
              href="https://t.me/dasturchi_life"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="w-full py-4 bg-blue-600 text-white flex items-center justify-center gap-3 font-black uppercase tracking-widest rounded-2xl active:scale-95 transition-all shadow-lg shadow-blue-600/20">
                <i className="bi bi-telegram text-xl"></i>
                Telegram
              </button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;