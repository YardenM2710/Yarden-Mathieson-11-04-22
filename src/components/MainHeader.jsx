import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

export function MainHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbar = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((isMenuOpen) => (isMenuOpen = !isMenuOpen));
  };

  useEffect(() => {
    isMenuOpen
      ? (navbar.current.style.transform = 'translate(0)')
      : (navbar.current.style.transform = 'translate(100%)');
  }, [isMenuOpen]);

  return (
    <header className="app-header">
      {isMenuOpen && <div onClick={toggleMenu} className="screen"></div>}
      <section>
        <h1 className="logo">Weather App</h1>
        <div onClick={toggleMenu} className="menu">
          <MenuIcon />
        </div>
        <nav ref={navbar} className="navbar">
          <Link onClick={toggleMenu} to="/">
            Weather
          </Link>
          <Link onClick={toggleMenu} to="/favourites">
            Your Favourites
          </Link>
        </nav>
      </section>
    </header>
  );
}
