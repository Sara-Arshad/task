import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isMenuOpen, closeMenu }) => {
  return isMenuOpen ? (
    <div
      className="fixed inset-0 bg-gradient-to-br from-gray-800 via-black to-gray-900 bg-opacity-95 z-50 flex flex-col items-center justify-center space-y-8 text-white transition-transform duration-300 ease-in-out"
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
  ) : null;
};

export default MobileMenu;
