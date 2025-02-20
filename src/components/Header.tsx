import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <motion.nav
      className="flex items-center justify-between p-4 text-white bg-green-600"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-2xl font-bold">EthioLeague</h1>
      <ul className="flex gap-4">
        <li><Link to="/" className="p-5 mx-1 my-1 text-white duration-300 nav-item hover:bg-violet-500">Home</Link></li>
        <li><Link to="/fixtures" className="p-5 mx-1 my-1 text-white nav-item hover:bg-violet-500">Fixtures</Link></li>
        <li><Link to="/news" className="p-5 mx-1 my-1 text-white nav-item hover:bg-violet-500">News</Link></li>
        <li><Link to="/results" className="p-5 mx-1 my-1 text-white nav-item hover:bg-violet-500">Results</Link></li>
        <li><Link to="/table" className="p-5 mx-1 my-1 text-white nav-item hover:bg-violet-500">Table</Link></li>
        <li><Link to="/teams" className="p-5 mx-1 my-1 text-white nav-item hover:bg-violet-500">Teams</Link></li>
        <li><Link to="/videos" className="p-5 mx-1 my-1 text-white nav-item hover:bg-violet-500">Videos</Link></li>
      </ul>
    </motion.nav>
  );
};

export default Header;
