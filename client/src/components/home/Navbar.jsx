import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { isLoggedIn } from '../../utils/auth'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = useMemo(
    () => [
      { name: "Adopt", to: "/adopt" },
      { name: "Services", to: "/services" },
      { name: "Rescue", to: "/rescue" },
      { name: "Donate", to: "/donate" },
      { name: "Chat", to: "/chat" },
      { name: "Ask AI", to: "/askai" },
      { name: "Contact", to: "/contact" },
    ],
    []
  );

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div style={{ height: '80px' }} />
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out"
        style={{
          padding: scrolled ? '8px 24px' : '12px 24px',
        }}
      >
      <div
        className="max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 ease-out"
        style={{
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderRadius: scrolled ? '20px' : '24px',
          padding: scrolled ? '10px 28px' : '14px 32px',
          boxShadow: scrolled
            ? '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)'
            : '0 4px 16px rgba(0, 0, 0, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 no-underline group"
          style={{ textDecoration: 'none' }}
        >
          <span
            className="font-black tracking-tight transition-all duration-300 group-hover:opacity-80"
            style={{
              fontSize: '22px',
              background: 'linear-gradient(135deg, #5F5BD7 0%, #827FFE 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
            }}
          >
            WoofMate
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="relative px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-300 no-underline"
              style={{
                color: isActive(link.to) ? '#5F5BD7' : '#64748B',
                backgroundColor: isActive(link.to) ? 'rgba(95, 91, 215, 0.08)' : 'transparent',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive(link.to)) {
                  e.currentTarget.style.color = '#334155';
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.04)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(link.to)) {
                  e.currentTarget.style.color = '#64748B';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth Button (Desktop) */}
        <div className="hidden lg:flex items-center">
          <Link
            to={loggedIn ? "/profile" : "/login"}
            className="px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 no-underline"
            style={{
              background: loggedIn
                ? 'linear-gradient(135deg, #5F5BD7 0%, #827FFE 100%)'
                : 'linear-gradient(135deg, #5F5BD7 0%, #827FFE 100%)',
              color: '#FFFFFF',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(95, 91, 215, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(95, 91, 215, 0.4)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(95, 91, 215, 0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {loggedIn ? "Profile" : "Paw In"}
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl transition-all duration-300"
          style={{ backgroundColor: menuOpen ? 'rgba(95, 91, 215, 0.08)' : 'transparent' }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <span
            className="block h-0.5 w-5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: menuOpen ? '#5F5BD7' : '#64748B',
              transform: menuOpen ? 'rotate(45deg) translate(2px, 2px)' : 'none',
            }}
          />
          <span
            className="block h-0.5 w-5 rounded-full transition-all duration-300 mt-1"
            style={{
              backgroundColor: menuOpen ? '#5F5BD7' : '#64748B',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block h-0.5 w-5 rounded-full transition-all duration-300 mt-1"
            style={{
              backgroundColor: menuOpen ? '#5F5BD7' : '#64748B',
              transform: menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className="lg:hidden max-w-7xl mx-auto overflow-hidden transition-all duration-500 ease-out"
        style={{
          maxHeight: menuOpen ? '500px' : '0',
          opacity: menuOpen ? 1 : 0,
          marginTop: menuOpen ? '8px' : '0',
        }}
      >
        <div
          className="flex flex-col gap-1 p-4"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 no-underline"
              style={{
                color: isActive(link.to) ? '#5F5BD7' : '#475569',
                backgroundColor: isActive(link.to) ? 'rgba(95, 91, 215, 0.08)' : 'transparent',
                textDecoration: 'none',
              }}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to={loggedIn ? "/profile" : "/login"}
            className="px-4 py-3 rounded-xl text-sm font-bold text-center transition-all duration-200 no-underline mt-2"
            style={{
              background: 'linear-gradient(135deg, #5F5BD7 0%, #827FFE 100%)',
              color: '#FFFFFF',
              textDecoration: 'none',
            }}
            onClick={() => setMenuOpen(false)}
          >
            {loggedIn ? "Profile" : "Paw In"}
          </Link>
        </div>
      </div>
      </nav>
    </>
  );
};

export default Navbar;
