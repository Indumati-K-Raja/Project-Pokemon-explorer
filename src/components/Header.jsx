import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Optional: if you want to style it separately

const Header = () => {
  return (
    <header className="header">
      <nav className="nav-container">
        <Link to="/" className="nav-link">Pokédex</Link>
        <div className="nav-links">
          <Link to="/favorites" className="nav-link">Favorites</Link>
          <Link to="/compare" className="nav-link">Compare</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
