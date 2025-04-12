import { Link, useLocation } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';

const Header = ({ links }) => {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  return (
    <header className="bg-white border-t-4 border-b-4 border-black">
      <div className="container">
        <nav className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4">
          <div className="flex flex-wrap gap-x-8 gap-y-2 items-center justify-between w-full">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {links.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className={`text-xl py-1 whitespace-nowrap border-b-2 border-transparent hover:border-black transition-colors ${location.pathname === link.path ? 'border-black' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            {isAdminPage && (
              <button 
                onClick={() => window.dispatchEvent(new Event('openHeaderSettings'))}
                className="text-xl p-1 hover:rotate-45 transition-transform duration-300 border-2 border-black"
              >
                <FiSettings />
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;