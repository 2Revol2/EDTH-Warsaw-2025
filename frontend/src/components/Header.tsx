import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="flex-shrink-0">
      <nav className="bg-slate-900 border-b border-slate-700 p-3 sm:p-4">
        <div className="flex gap-3 sm:gap-4">
          <Link to="/" className="text-white hover:text-blue-400 transition text-sm sm:text-base">
            Main
          </Link>
          <Link to="/map" className="text-white hover:text-blue-400 transition text-sm sm:text-base">
            Map
          </Link>
        </div>
      </nav>
    </header>
  );
};
