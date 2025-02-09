import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <h1 className="text-2xl font-bold">EthioLeague</h1>
      <nav>
        <ul className="flex gap-4">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/fixtures">Fixtures</Link></li>
          <li><Link to="/news">News</Link></li>
          <li><Link to="/results">Results</Link></li>
          <li><Link to="/table">Table</Link></li>
          <li><Link to="/teams">Teams</Link></li>
          <li><Link to="/videos">Videos</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
