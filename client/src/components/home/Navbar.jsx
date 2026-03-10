import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { isLoggedIn } from '../../utils/auth'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  const navLinks = useMemo(
    () => [
      { name: "Adopt", to: "/adopt" },
      { name: "Services", to: "/services" },
      { name: "Rescue", to: "/rescue" },
      { name: "Donate", to: "/donate" },
      { name: "Chat", to: "/chat" },
      { name: "Ask AI", to: "/askai" },
      { name: "About", to: "/about" },
      { name: "Contact Us", to: "/contact" },
      {
        name: loggedIn ? "Profile" : "Pawin",
        to: loggedIn ? "/profile" : "/login",
      },
    ],
    [loggedIn]
  );

  return (
    <div className="h-20 w-full px-6 md:px-20 flex items-center justify-between sticky top-0 z-50 transition-all duration-300 bg-white shadow-md">
      <Link to="/" className="text-xl font-bold text-gray-800">
        WoofMate
      </Link>

      <div className="hidden md:flex gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.to}
            className="text-gray-700 hover:text-black transition"
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-md px-6 py-4 flex flex-col gap-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="text-gray-700 hover:text-black transition"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
