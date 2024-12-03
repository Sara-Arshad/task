import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import MobileMenu from "./MobileView";

const Navbar: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`flex justify-between items-center px-6 py-4 ${
          isHomePage ? "bg-transparent text-white" : "bg-white text-black"
        } border-b border-gray-500/30`}
      >
        <div className="text-2xl font-bold">Freeio.</div>

        <div className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? (
            <MenuIcon fontSize="large" className="cursor-pointer" />
          ) : (
            <MenuIcon fontSize="large" className="cursor-pointer" />
          )}
        </div>

        {/* Navigation Links for larger screens */}
        <ul className="hidden md:flex space-x-6">
          <Link to="/">
            <li className="cursor-pointer hover:text-green-500 hover:border-t border-green-500">
              Home
            </li>
          </Link>
          <li className="cursor-pointer hover:text-green-500">Browse Jobs</li>
          <li className="cursor-pointer hover:text-green-500">Users</li>
          <li className="cursor-pointer hover:text-green-500">Blog</li>
          <li className="cursor-pointer hover:text-green-500">Pages</li>
        </ul>

        <div className="hidden md:flex items-center space-x-6">
          <button
            className={`hover:text-green-500 ${
              isHomePage ? "text-white" : "text-black"
            }`}
          >
            <SearchIcon />
          </button>
          <button
            className={`py-2 px-4 border ${
              isHomePage ? "border-white text-white" : "border-black text-black"
            } rounded hover:bg-green-500`}
          >
            Login
          </button>
          <button className="py-2 px-4 text-white bg-green-500 rounded hover:bg-green-600">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
    </>
  );
};

export default Navbar;
