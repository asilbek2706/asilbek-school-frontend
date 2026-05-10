import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router"; 
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";

interface NavLinkProps {
  isActive: boolean;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Scroll hodisasini kuzatish (Navbar dizaynini o'zgartirish uchun)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getDesktopClass = ({ isActive }: NavLinkProps) => 
    isActive ? "nav-link-desktop active" : "nav-link-desktop";

  const getMobileClass = ({ isActive }: NavLinkProps) => 
    isActive ? "mobile-link active" : "mobile-link";

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animatsiya variantlari
  const menuVariants = {
    closed: { x: "100%", transition: { type: "spring", stiffness: 400, damping: 40 } },
    opened: { x: 0, transition: { type: "spring", stiffness: 400, damping: 40, staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    opened: { opacity: 1, x: 0 }
  };

  return (
    <motion.nav 
      initial={false}
      animate={{ 
        backgroundColor: scrolled ? "rgba(55, 20, 15, 0.9)" : "rgba(55, 20, 15, 0.7)",
        paddingTop: scrolled ? "12px" : "16px",
        paddingBottom: scrolled ? "12px" : "16px",
        borderBottomColor: scrolled ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.05)"
      }}
      className="navbar-container sticky top-0 z-50 border-b backdrop-blur-md"
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group z-[60]" onClick={closeMenu}>
          <motion.img
            whileHover={{ rotate: 10, scale: 1.1 }}
            src="/logo.png"
            alt="Logo"
            className="w-9 h-9 md:w-10 md:h-10 object-contain"
          />
          <span className="text-white font-bold text-xl tracking-tight group-hover:text-red-500 transition-colors">
            Asilbek-school
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          <div className="flex items-center gap-4 lg:gap-6 border-r border-gray-700/50 pr-4">
            {["Asosiy", "Biz haqimizda", "Kurslar", "FAQ", "Bog'lanish"].map((text, i) => {
              const paths = ["/", "/about", "/courses", "/faq", "/contact"];
              return (
                <NavLink key={i} to={paths[i]} end={paths[i] === "/"} className={getDesktopClass}>
                  {text}
                </NavLink>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group hidden lg:block">
              <input type="text" placeholder="Qidiruv..." className="search-input-desktop" />
              <i className="bi bi-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>

            <Link to="/login">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="login-btn-desktop flex items-center gap-2">
                <i className="bi bi-box-arrow-in-right text-lg"></i>
                Kirish
              </motion.button>
            </Link>

            <motion.a href="https://t.me/dasturchi_life" target="_blank" rel="noopener noreferrer" whileHover={{ y: -2 }}>
              <button className="tg-btn-desktop flex items-center gap-2">
                <i className="bi bi-telegram text-lg"></i>
                Telegram
              </button>
            </motion.a>
          </div>
        </div>

        {/* Hamburger Button */}
        <button onClick={toggleMenu} className="md:hidden text-white p-2 z-[60] relative">
          <motion.div animate={isOpen ? { rotate: 180 } : { rotate: 0 }}>
            {isOpen ? <i className="bi bi-three-dots text-2xl"></i> : <i className="bi bi-three-dots-vertical text-3xl"></i>}
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="opened"
            exit="closed"
            variants={menuVariants}
            className="mobile-menu-panel md:hidden"
          >
            <div className="flex flex-col p-6 gap-y-4 h-full pt-28">
              {[
                { name: "Asosiy", path: "/" },
                { name: "Biz haqimizda", path: "/about" },
                { name: "Kurslar", path: "/courses" },
                { name: "FAQ", path: "/faq" },
                { name: "Bog'lanish", path: "/contact" }
              ].map((link, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <NavLink to={link.path} end={link.path === "/"} onClick={closeMenu} className={getMobileClass}>
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div variants={itemVariants} className="h-[1px] bg-gray-800 my-4" />

              <motion.div variants={itemVariants} className="flex flex-col gap-4">
                <Link to="/login" onClick={closeMenu} className="w-full">
                  <button className="mobile-action-btn border-2 border-red-500">
                    <i className="bi bi-box-arrow-in-right text-xl"></i> Kirish
                  </button>
                </Link>
                <a href="https://t.me/dasturchi_life" className="w-full">
                  <button className="mobile-action-btn bg-blue-600 shadow-lg shadow-blue-600/20">
                    <i className="bi bi-telegram text-xl"></i> Telegram
                  </button>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;