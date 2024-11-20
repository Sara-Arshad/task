import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

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
            <CloseIcon fontSize="large" className="cursor-pointer" />
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
      {isMenuOpen && (
        <div
          className={`fixed inset-0 bg-gradient-to-br from-gray-800 via-black to-gray-900 bg-opacity-95 z-50 flex flex-col items-center justify-center space-y-8 text-white transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-y-0" : "translate-y-full"
          }`}
          onClick={closeMenu}
        >
          <div
            className="absolute top-6 right-6 text-white bg-gray-700 rounded-full p-2 cursor-pointer hover:bg-green-500 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              closeMenu();
            }}
          >
            <CloseIcon fontSize="large" />
          </div>
          <ul
            className="space-y-6 text-xl font-medium text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Link to="/">
              <li className="cursor-pointer hover:text-green-500 hover:border-t border-green-500">
                Home
              </li>
            </Link>
            <li className="cursor-pointer hover:text-green-400 transition-all">
              Browse Jobs
            </li>
            <li className="cursor-pointer hover:text-green-400 transition-all">
              Users
            </li>
            <li className="cursor-pointer hover:text-green-400 transition-all">
              Blog
            </li>
            <li className="cursor-pointer hover:text-green-400 transition-all">
              Pages
            </li>
          </ul>
          <div
            className="flex flex-col items-center w-3/4 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="py-3 w-full border border-green-500 text-green-400 font-semibold rounded-lg hover:bg-green-500 hover:text-white transition-all"
              onClick={closeMenu}
            >
              Login
            </button>
            <button className="py-3 w-full bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
