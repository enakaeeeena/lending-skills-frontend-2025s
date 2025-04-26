import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavLink from './common/NavLink';
import SettingsButton from './common/SettingsButton';
import PropTypes from 'prop-types';
import HeaderEditor from '../pages/admin/components/HeaderEditor';

const removeDuplicateLinks = (links) => {
  const uniquePaths = new Set();
  return links.filter(link => {
    if (!uniquePaths.has(link.path)) {
      uniquePaths.add(link.path);
      return true;
    }
    console.warn(`Duplicate path detected and removed: ${link.path}`);
    return false;
  });
};

const Header = ({ links, setHeaderLinks }) => {
  const location = useLocation();
  const [showHeaderEditor, setShowHeaderEditor] = useState(false);
  const [headerLinksLocal, setHeaderLinksLocal] = useState(links);

  useEffect(() => {
    const handleHeaderSettings = () => {
      setShowHeaderEditor(true);
    };

    document.addEventListener('openHeaderSettings', handleHeaderSettings);
    return () => {
      document.removeEventListener('openHeaderSettings', handleHeaderSettings);
    };
  }, []);

  useEffect(() => {
    setHeaderLinksLocal(links);
  }, [links]);

  const handleSaveHeader = (newLinks) => {
    setHeaderLinksLocal(newLinks);
    if (setHeaderLinks) {
      setHeaderLinks(newLinks);
    }
    setShowHeaderEditor(false);
  };

  // Фильтрация дубликатов перед рендером
  const filteredLinks = removeDuplicateLinks(headerLinksLocal);

  return (
    <>
      <header className="w-full border-t-4 border-b-4 border-black">
        <nav className="w-full h-24 flex items-center justify-between px-4 md:px-[100px]">
          <div className="flex-1 flex justify-between items-center">
            {filteredLinks.length > 0 ? (
              <div className="w-full flex justify-evenly items-center gap-4">
                {filteredLinks.map((link) => (
                  <NavLink 
                    key={`${link.path}-${link.label}`} 
                    link={link}
                    currentPath={location.pathname}
                  />
                ))}
              </div>
            ) : (
              <div className="text-gray-400">
                {links.length === 0 ? "No links provided" : "All links were duplicates"}
              </div>
            )}
          </div>
          
          {/* Settings button */}
          {location.pathname === '/admin' && <SettingsButton />}
        </nav>
      </header>

      {showHeaderEditor && (
        <HeaderEditor
          headerLinks={headerLinksLocal}
          onSave={handleSaveHeader}
          onClose={() => setShowHeaderEditor(false)}
        />
      )}
    </>
  );
};

Header.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  setHeaderLinks: PropTypes.func
};

export default Header;