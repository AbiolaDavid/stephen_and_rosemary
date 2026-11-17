import React, { useState, useEffect } from 'react';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'story', label: 'Our Story' },
  { id: 'details', label: 'Details' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'rsvp', label: 'RSVP' },
  { id: 'wishes', label: 'Wishes' }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPos = window.scrollY + 100;

      sections.forEach(section => {
        if (section && section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#home" className="nav-logo" onClick={(e) => handleNavClick(e, 'home')}>
          A <span>&</span> E
        </a>
        
        <button 
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span><span></span><span></span>
        </button>

        <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.id}>
              <a 
                href={`#${link.id}`} 
                className={activeSection === link.id ? 'active' : ''}
                onClick={(e) => handleNavClick(e, link.id)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 20px 5%;
          transition: var(--transition);
          background: transparent;
        }
        .navbar.scrolled {
          background: rgba(255, 253, 247, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 20px rgba(100, 45, 61, 0.05);
          padding: 15px 5%;
        }
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .nav-logo {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          color: var(--deep-burgundy);
          text-decoration: none;
          font-weight: 700;
        }
        .nav-logo span {
          color: var(--champagne-gold);
          font-family: var(--font-script);
          font-size: 2rem;
          margin: 0 5px;
        }
        .nav-links {
          display: flex;
          list-style: none;
          gap: 30px;
        }
        .nav-links a {
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--deep-burgundy);
          text-decoration: none;
          position: relative;
          transition: var(--transition);
        }
        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--champagne-gold);
          transition: var(--transition);
        }
        .nav-links a:hover::after, .nav-links a.active::after {
          width: 100%;
        }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 1001;
        }
        .hamburger span {
          width: 25px;
          height: 2px;
          background: var(--deep-burgundy);
          transition: var(--transition);
        }
        
        @media (max-width: 768px) {
          .hamburger { display: flex; }
          .nav-links {
            position: fixed;
            top: 0;
            right: -100%;
            width: 70%;
            height: 100vh;
            background: var(--ivory);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 40px;
            transition: var(--transition);
            box-shadow: -5px 0 15px rgba(0,0,0,0.1);
          }
          .nav-links.open { right: 0; }
          .hamburger.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
          .hamburger.active span:nth-child(2) { opacity: 0; }
          .hamburger.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;