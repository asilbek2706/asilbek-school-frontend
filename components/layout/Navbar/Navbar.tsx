import { Link } from "react-router";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar sticky top-0 z-50 blur-effect backdrop-blur-sm bg-gray-900/80 border-b border-gray-700 py-3">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1 group">
          <span className="text-white font-bold text-xl tracking-tight flex items-center gap-2 group-hover:text-red-500 transition-colors">
            <img src="/logo.png" alt="Logo" className="w-10 h-10" />
            Frontend
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <div className="relative flex items-center">
            <input
              id="search-input"
              type="text"
              placeholder="Qidiruv..."
              className="bg-transparent border-b border-gray-500 text-white placeholder:text-gray-400 focus:border-red-500 focus:outline-none transition-all duration-300 pb-1 pr-8 w-full"
            />

            <label
              htmlFor="search-input"
              className="absolute right-0 bottom-2 cursor-pointer group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="text-gray-400 group-hover:text-red-500 transition-colors"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </label>
          </div>

          <Link to="/login">
            <button className="flex items-center gap-2 text-white font-medium px-6 py-1.5 border-2 border-red-500 rounded-md hover:bg-red-500 hover:text-white transition-all duration-300 active:scale-95">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-box-arrow-in-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"
                />
                <path
                  fill-rule="evenodd"
                  d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                />
              </svg>
              Kirish
            </button>
          </Link>
          <a
            href="https://t.me/dasturchi_life"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <button className="flex items-center gap-2 text-white font-medium px-6 py-1.5 bg-blue-600 border-2 border-blue-600 rounded-md hover:bg-transparent hover:text-blue-500 transition-all duration-300 active:scale-95">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-telegram"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
              </svg>
              Telegram
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
