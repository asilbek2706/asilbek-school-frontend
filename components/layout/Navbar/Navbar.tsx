import * as React from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { clearClientAuthSession } from "@/features/auth/utils/auth-session";
import { useLogoutMutation } from "@/features/auth/hooks/useAuth";

interface NavLinkProps {
  isActive: boolean;
}

const FALLBACK_AVATAR =
  "https://api.dicebear.com/9.x/initials/svg?seed=Asilbek%20School";

const buildFallbackAvatar = (fullName?: string | null, email?: string | null) => {
  const seed = fullName || email || "Asilbek School";

  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
    seed
  )}`;
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const logoutMutation = useLogoutMutation();
  const user = useAuthStore((state) => state.user);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getDesktopClass = ({ isActive }: NavLinkProps) =>
    isActive ? "nav-link-desktop active" : "nav-link-desktop";

  const getMobileClass = ({ isActive }: NavLinkProps) =>
    isActive ? "mobile-link active" : "mobile-link";

  const handleLogout = async () => {
    setProfileOpen(false);
    closeMenu();

    try {
      await logoutMutation.mutateAsync();
    } finally {
      clearClientAuthSession();
      navigate("/auth/login", { replace: true });
    }
  };

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },

    opened: {
      x: 0,

      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  } as const;

  const itemVariants = {
    closed: {
      opacity: 0,
      x: 20,
    },

    opened: {
      opacity: 1,
      x: 0,
    },
  } as const;

  const avatarUrl = user?.avatarUrl || buildFallbackAvatar(user?.fullName, user?.email);
  const displayName = user?.fullName || "Mehmon";
  const displayEmail = user?.email || "Email saqlanmagan";
  const displayPhone = "Telefon kiritilmagan";
  const accountLabel = user?.authMethod === "github" ? "GitHub account" : "Email account";
  const isAuthenticated = Boolean(user);

  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: scrolled
          ? "rgba(55, 20, 15, 0.9)"
          : "rgba(55, 20, 15, 0.7)",

        paddingTop: scrolled ? "12px" : "16px",
        paddingBottom: scrolled ? "12px" : "16px",

        borderBottomColor: scrolled
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(255, 255, 255, 0.05)",
      }}
      className="
        navbar-container
        sticky
        top-0
        z-50
        border-b
        backdrop-blur-md
      "
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 group z-[60]"
          onClick={closeMenu}
        >
          <motion.img
            whileHover={{
              rotate: 10,
              scale: 1.1,
            }}
            src="/logo.png"
            alt="Logo"
            className="
              w-9
              h-9
              md:w-10
              md:h-10
              object-contain
            "
          />

          <span
            className="
              text-white
              font-bold
              text-xl
              tracking-tight

              group-hover:text-red-500

              transition-colors
            "
          >
            Asilbek-school
          </span>
        </Link>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {/* LINKS */}
          <div
            className="
              flex
              items-center
              gap-4
              lg:gap-6

              border-r
              border-gray-700/50

              pr-4
            "
          >
            {[
              "Asosiy",
              "Biz haqimizda",
              "Kurslar",
              "Bog'lanish",
            ].map((text, i) => {
              const paths = [
                "/",
                "/about",
                "/courses",
                "/contact",
              ];

              return (
                <NavLink
                  key={i}
                  to={paths[i]}
                  end={paths[i] === "/"}
                  className={getDesktopClass}
                >
                  {text}
                </NavLink>
              );
            })}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            {/* SEARCH */}
            <div className="relative group hidden lg:block">
              <input
                type="text"
                placeholder="Qidiruv..."
                className="search-input-desktop"
              />

              <i
                className="
                  bi bi-search

                  absolute
                  right-3
                  top-1/2

                  -translate-y-1/2

                  text-gray-400
                "
              />
            </div>

            {/* PROFILE */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="
                  relative

                  flex
                  items-center
                  gap-3

                  rounded-full

                  border border-white/10
                  bg-white/[0.04]

                  pl-2
                  pr-4
                  py-2

                  backdrop-blur-xl

                  transition-all duration-300

                  hover:border-orange-500/30
                  hover:bg-white/[0.06]
                "
              >
                {/* AVATAR */}
                <div className="relative">
                  <img
                    src={avatarUrl || FALLBACK_AVATAR}
                    alt="Profile"
                    className="
                      w-11
                      h-11

                      rounded-full
                      object-cover

                      border-2
                      border-orange-500/40
                    "
                  />

                  <span
                    className="
                      absolute
                      bottom-0
                      right-0

                      w-3
                      h-3

                      rounded-full
                      bg-green-500

                      border-2
                      border-[#37140f]
                    "
                  />
                </div>

                {/* USER INFO */}
                <div className="hidden lg:flex flex-col text-left">
                  <span
                    className="
                      text-white
                      text-sm
                      font-semibold
                      leading-none
                    "
                  >
                    {displayName}
                  </span>

                  <span
                    className="
                      text-white/40
                      text-xs
                      mt-1
                    "
                  >
                    {accountLabel}
                  </span>
                </div>

                <i
                  className="
                    bi bi-chevron-down

                    text-white/50
                    text-xs
                  "
                />
              </button>

              {/* POPUP */}
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 15,
                      scale: 0.96,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: 10,
                      scale: 0.96,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="
                      absolute
                      right-0
                      top-[75px]

                      w-[340px]

                      rounded-[2rem]

                      border border-white/10
                      bg-[#1b0d0a]/95

                      backdrop-blur-2xl

                      overflow-hidden

                      shadow-[0_20px_80px_rgba(0,0,0,0.45)]

                      z-[100]
                    "
                  >
                    {/* TOP */}
                    <div
                      className="
                        relative

                        px-6
                        pt-6
                        pb-5

                        border-b
                        border-white/10
                      "
                    >
                      {/* GLOW */}
                      <div
                        className="
                          absolute
                          top-0
                          right-0

                          w-40
                          h-40

                          bg-orange-500/10
                          blur-[80px]
                          rounded-full
                        "
                      />

                      <div
                        className="
                          relative z-10

                          flex
                          items-center
                          gap-4
                        "
                      >
                        <img
                          src={avatarUrl || FALLBACK_AVATAR}
                          alt={displayName}
                          className="
                            w-16
                            h-16

                            rounded-full
                            object-cover

                            border-2
                            border-orange-500/40
                          "
                        />

                        <div>
                          <h3
                            className="
                              text-white
                              text-lg
                              font-bold
                            "
                          >
                            {displayName}
                          </h3>

                          <p
                            className="
                              text-orange-400
                              text-sm
                            "
                          >
                            {accountLabel}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* BODY */}
                    <div className="p-6 space-y-4">
                      {/* EMAIL */}
                      <div
                        className="
                          flex
                          items-center
                          gap-4

                          rounded-2xl

                          border border-white/5
                          bg-white/[0.03]

                          px-4
                          py-3
                        "
                      >
                        <i
                          className="
                            bi bi-envelope

                            text-orange-400
                            text-lg
                          "
                        />

                        <div>
                          <p
                            className="
                              text-white/40
                              text-xs
                            "
                          >
                            Email
                          </p>

                          <p
                            className="
                              text-white
                              text-sm
                            "
                          >
                            {displayEmail}
                          </p>
                        </div>
                      </div>

                      {/* PHONE */}
                      <div
                        className="
                          flex
                          items-center
                          gap-4

                          rounded-2xl

                          border border-white/5
                          bg-white/[0.03]

                          px-4
                          py-3
                        "
                      >
                        <i
                          className="
                            bi bi-telephone

                            text-orange-400
                            text-lg
                          "
                        />

                        <div>
                          <p
                            className="
                              text-white/40
                              text-xs
                            "
                          >
                            Telefon
                          </p>

                          <p
                            className="
                              text-white
                              text-sm
                            "
                          >
                            {displayPhone}
                          </p>
                        </div>
                      </div>

                      {/* BUTTONS */}
                      <div
                        className="
                          grid
                          grid-cols-2
                          gap-3
                          pt-2
                        "
                      >
                        {/* PROFILE */}
                        <Link to="/profile">
                          <button
                            className="
                              w-full
                              h-12

                              rounded-2xl

                              bg-gradient-to-r
                              from-orange-500
                              to-red-500

                              text-white
                              font-semibold

                              flex
                              items-center
                              justify-center
                              gap-2

                              hover:scale-[1.02]

                              transition-all duration-300
                            "
                          >
                            <i className="bi bi-person"></i>

                            Profile
                          </button>
                        </Link>

                        {/* LOGOUT */}
                        <button
                          onClick={handleLogout}
                          disabled={logoutMutation.isPending}
                          className="
                            h-12

                            rounded-2xl

                            border border-red-500/20
                            bg-red-500/10

                            text-red-400
                            font-semibold

                            flex
                            items-center
                            justify-center
                            gap-2

                            hover:bg-red-500/20

                            transition-all duration-300
                          "
                        >
                          <i className="bi bi-box-arrow-right"></i>

                          Chiqish
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={toggleMenu}
          className="
            md:hidden
            text-white
            p-2
            z-[60]
            relative
            cursor-pointer
          "
        >
          <motion.div
            animate={
              isOpen
                ? { rotate: 180 }
                : { rotate: 0 }
            }
          >
            {isOpen ? (
              <i className="bi bi-three-dots text-2xl"></i>
            ) : (
              <i className="bi bi-three-dots-vertical text-3xl"></i>
            )}
          </motion.div>
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="opened"
            exit="closed"
            variants={menuVariants}
            className="mobile-menu-panel md:hidden"
          >
            <div
              className="
                flex
                flex-col

                p-6
                gap-y-4

                h-full
                pt-28
              "
            >
              {[
                {
                  name: "Asosiy",
                  path: "/",
                },
                {
                  name: "Biz haqimizda",
                  path: "/about",
                },
                {
                  name: "Kurslar",
                  path: "/courses",
                },
                {
                  name: "Bog'lanish",
                  path: "/contact",
                },
              ].map((link, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                >
                  <NavLink
                    to={link.path}
                    end={link.path === "/"}
                    onClick={closeMenu}
                    className={getMobileClass}
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                variants={itemVariants}
                className="
                  h-[1px]
                  bg-gray-800
                  my-4
                "
              />

              {/* MOBILE BUTTONS */}
              <motion.div
                variants={itemVariants}
                className="
                  flex
                  flex-col
                  gap-4
                "
              >
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="w-full"
                >
                  <button
                    className="
                      mobile-action-btn
                      cursor-pointer

                      border-2
                      border-red-500
                    "
                  >
                    <i className="bi bi-person text-xl"></i>

                    Profile
                  </button>
                </Link>

                <button
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  className="
                    mobile-action-btn
                    cursor-pointer

                    border-2
                    border-red-500/30
                    bg-red-500/10
                    text-red-300
                  "
                >
                  <i className="bi bi-box-arrow-right text-xl"></i>

                  Chiqish
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;