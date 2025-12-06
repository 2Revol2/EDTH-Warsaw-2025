import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <nav className="bg-slate-900 border-b border-slate-700 p-4">
        <div className="flex gap-4">
          <Link to="/" className="text-white hover:text-blue-400 transition">
            Main
          </Link>
          <Link to="/map" className="text-white hover:text-blue-400 transition">
            Map
          </Link>
        </div>
      </nav>
    </header>
  );
};
