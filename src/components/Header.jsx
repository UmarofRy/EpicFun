import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [serverStatus, setServerStatus] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetchServerStatus();
    const interval = setInterval(fetchServerStatus, 30000);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fetchServerStatus = async () => {
    try {
      const res3 = await fetch('https://api.mcsrvstat.us/3/epicmine.fun');
      const data3 = await res3.json();
      let players = data3?.players;
      if (!players || (!players.list && !players.sample)) {
        const res2 = await fetch('https://api.mcsrvstat.us/2/epicmine.fun');
        const data2 = await res2.json();
        players = data2?.players || players;
      }
      setServerStatus({ ...data3, players });
    } catch (error) {
      console.error('Server holatini olishda xatolik:', error);
      setServerStatus({ online: false, players: { online: 0, max: 0 } });
    }
  };

  // Dark mode toggle removed as per requirements

  const navigation = [
    { name: 'Asosiy', href: '/' },
    { name: 'Qoidalar', href: '/rules' },
    { name: 'Donat', href: '/donate' },
    { name: 'Jamoa', href: '/team' },
    { name: 'Blog', href: '/blog' },
    { name: 'Aloqa', href: '/contact' },
  ];

  // Removed copyServerIP function as IP copy is no longer needed

  return (
    <header className={`header ${isScrolled ? 'scrolled' : 'transparent'}`}>
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="header-logo">
            <img
              src="Logo.png"
              alt="EPICMINE.FUN Logo"
              className="logo-image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="logo-text hidden">
              <div>
                <h1 className="logo-title">EPICMINE.FUN</h1>
                <p className="logo-subtitle">epicmine.fun</p>
              </div>
            </div>
          </Link>

          {/* Server Status - Desktop */}
          <div className="server-status">
            <div className="status-info">
              <div className={`status-dot ${serverStatus?.online ? 'online' : 'offline'}`}></div>
              <span className="status-text">
                {serverStatus?.online ? `Online: ${serverStatus?.players?.online || 0}/${serverStatus?.players?.max || 0}` : 'Offline'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link ${location.pathname === item.href ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="header-actions">
            <Link to="/admin" className="auth-button login">
              Admin Panel
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mobile-menu-button"
            aria-label="Mobil menyu"
          >
            <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMenuOpen ? 'open' : 'closed'}`}>
          {/* Server Status - Mobile */}
          <div className="mobile-server-status">
            <div className="status-info">
              <div className={`status-dot ${serverStatus?.online ? 'online' : 'offline'}`}></div>
              <span className="status-text">
                {serverStatus?.online ? `Online: ${serverStatus?.players?.online || 0}/${serverStatus?.players?.max || 0}` : 'Offline'}
              </span>
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <div className="mobile-nav-links">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`mobile-nav-link ${location.pathname === item.href ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Actions */}
          <div className="mobile-actions">
            <div className="mobile-auth-buttons">
              <Link
                to="/admin"
                className="mobile-auth-button login"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
