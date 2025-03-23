import { motion } from "framer-motion";
import { NavLink } from "react-router-dom"; // Changed from Link to NavLink

const Header = () => {
  return (
    <motion.nav
      className="flex items-center justify-between p-4 text-lg antialiased text-white bg-green-600 font-cuprum md:text-l"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <figure className="flex items-center gap-2">
        <svg
          id="logo-16"
          width="70"
          height="30"
          viewBox="0 0 109 43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M64.9315 11.4284C62.1883 8.6852 58.9316 6.5091 55.3475 5.0245C51.7633 3.5399 47.9219 2.7758 44.0424 2.7758C40.1629 2.7758 36.3215 3.5399 32.7373 5.0245C29.1532 6.5091 25.8965 8.6852 23.1533 11.4284L44.0424 32.3174L64.9315 11.4284Z"
            className="ccompli1"
            fill="#FFD200"
          />
          <path
            d="M44.0686 32.3475C46.8118 35.0907 50.0684 37.2667 53.6526 38.7513C57.2367 40.2359 61.0782 41 64.9577 41C68.837 41 72.679 40.2359 76.263 38.7513C79.847 37.2667 83.104 35.0907 85.847 32.3475L64.9577 11.4584L44.0686 32.3475Z"
            className="ccompli2"
            fill="#06E07F"
          />
          <path
            d="M44.017 32.3429C41.2738 35.0861 38.0171 37.2621 34.433 38.7467C30.8488 40.2313 27.0074 40.9954 23.1279 40.9954C19.2484 40.9954 15.407 40.2313 11.8228 38.7467C8.2387 37.2621 4.982 35.0861 2.2388 32.3429L23.1279 11.4538L44.017 32.3429Z"
            className="ccustom"
            fill="#E3073C"
          />
          <path
            d="M64.9831 11.433C67.726 8.6898 70.983 6.5138 74.567 5.0292C78.151 3.5446 81.993 2.7805 85.872 2.7805C89.752 2.7805 93.593 3.5446 97.177 5.0292C100.761 6.5138 104.018 8.6898 106.761 11.433L85.872 32.3221L64.9831 11.433Z"
            className="ccustom"
            fill="#1F84EF"
          />
        </svg>
        <h1 className="text-2xl font-bold uppercase skew-x-[-20deg] border-l border-r border-green-200 bg-green-700 hover:bg-green-500">
          <span className="block skew-x-[20deg]">EthioLeague</span>
        </h1>
      </figure>
      <ul className="flex gap-4 max-w-[50rem] ml-auto mr-0 md:mr-0">
        <li className="bg-green-700 border-l border-r border-green-200 skew-x-[-20deg] transition-colors duration-200 hover:bg-green-500 group">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block p-4 text-green-100 ${isActive ? "bg-gray-800" : ""}`
            }
          >
            <span className="block skew-x-[20deg]">Home</span>
          </NavLink>
        </li>
        <li className="bg-green-700 border-r border-green-200 skew-x-[-20deg] transition-colors duration-200 hover:bg-green-500 group">
          <NavLink
            to="/fixtures"
            className={({ isActive }) =>
              `block p-4 text-green-100 ${isActive ? "bg-gray-800" : ""}`
            }
          >
            <span className="block skew-x-[20deg]">Fixtures</span>
          </NavLink>
        </li>
        <li className="bg-green-700 border-r border-green-200 skew-x-[-20deg] transition-colors duration-200 hover:bg-green-500 group">
          <NavLink
            to="/news"
            className={({ isActive }) =>
              `block p-4 text-green-100 ${isActive ? "bg-gray-800" : ""}`
            }
          >
            <span className="block skew-x-[20deg]">News</span>
          </NavLink>
        </li>
        <li className="bg-green-700 border-r border-green-200 skew-x-[-20deg] transition-colors duration-200 hover:bg-green-500 group">
          <NavLink
            to="/results"
            className={({ isActive }) =>
              `block p-4 text-green-100 ${isActive ? "bg-gray-800" : ""}`
            }
          >
            <span className="block skew-x-[20deg]">Results</span>
          </NavLink>
        </li>
        <li className="bg-green-700 border-r border-green-200 skew-x-[-20deg] transition-colors duration-200 hover:bg-green-500 group">
          <NavLink
            to="/table"
            className={({ isActive }) =>
              `block p-4 text-green-100 ${isActive ? "bg-gray-800" : ""}`
            }
          >
            <span className="block skew-x-[20deg]">Table</span>
          </NavLink>
        </li>
        <li className="bg-green-700 border-r border-green-200 skew-x-[-20deg] transition-colors duration-200 hover:bg-green-500 group">
          <NavLink
            to="/teams"
            className={({ isActive }) =>
              `block p-4 text-green-100 ${isActive ? "bg-gray-800" : ""}`
            }
          >
            <span className="block skew-x-[20deg]">Teams</span>
          </NavLink>
        </li>
        <li className="bg-green-700 border-r border-green-200 skew-x-[-20deg] transition-colors duration-200 hover:bg-green-500 group">
          <NavLink
            to="/videos"
            className={({ isActive }) =>
              `block p-4 text-green-100 ${isActive ? "bg-gray-800" : ""}`
            }
          >
            <span className="block skew-x-[20deg]">Videos</span>
          </NavLink>
        </li>
      </ul>
    </motion.nav>
  );
};

export default Header;