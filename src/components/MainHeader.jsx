import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import DarkModeSwitch from './DarkModeSwitch'

export function MainHeader({ toggleDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navbar = useRef(null)

  const toggleMenu = () => {
    setIsMenuOpen((isMenuOpen) => (isMenuOpen = !isMenuOpen))
  }

  useEffect(() => {
    isMenuOpen ? (navbar.current.style.transform = 'translate(0)') : (navbar.current.style.transform = 'translate(100%)')
  }, [isMenuOpen])

  return (
    <header className="app-header">
      {isMenuOpen && <div onClick={toggleMenu} className="screen"></div>}
      <section>
        <h1 className="logo">MyWeather</h1>
        <DarkModeSwitch toggleDarkMode={toggleDarkMode} />

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
  )
}
