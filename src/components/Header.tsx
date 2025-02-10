import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <motion.nav
      className="bg-green-600 text-white p-4 flex justify-between items-center"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-2xl font-bold">EthioLeague</h1>
      <ul className="flex gap-4">
        <li><Link to="/" className="nav-item hover:bg-violet-500  mx-1 my-1 p-5 text-white ">Home</Link></li>
        <li><Link to="/fixtures" className="nav-item hover:bg-violet-500  mx-1 my-1 p-5 text-white">Fixtures</Link></li>
        <li><Link to="/news" className="nav-item hover:bg-violet-500 mx-1 my-1 p-5 text-white">News</Link></li>
        <li><Link to="/results" className="nav-item hover:bg-violet-500 mx-1 my-1 p-5 text-white">Results</Link></li>
        <li><Link to="/table" className="nav-item hover:bg-violet-500  mx-1 my-1 p-5 text-white">Table</Link></li>
        <li><Link to="/teams" className="nav-item hover:bg-violet-500  mx-1 my-1 p-5 text-white">Teams</Link></li>
        <li><Link to="/videos" className="nav-item hover:bg-violet-500  mx-1 my-1 p-5 text-white">Videos</Link></li>
      </ul>
    </motion.nav>
  );
};

export default Header;
