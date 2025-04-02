import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md fixed w-full z-10">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-800">РГПУ</Link>
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Главная</Link>
          <Link to="/teachers" className="text-gray-700 hover:text-blue-600">Преподаватели</Link>
          <Link to="/laboratory" className="text-gray-700 hover:text-blue-600">Лаборатория</Link>
          <Link to="/skills" className="text-gray-700 hover:text-blue-600">Скиллз-паспорт</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;