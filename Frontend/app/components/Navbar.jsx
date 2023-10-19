import React, { useState } from "react";
import NavLink from "../components/NavLink";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  {
    title: "About",
    path: "#about",
  }
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <nav className="lg:fixed relative mx-auto rounded-lg top-10 lg:left-10 left-1 right-10 z-50 bg-[#000000] bg-opacity-100">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
        <div className="text-white text-2xl md:text-5xl">
          <span style={{ fontWeight: "bold" }}>OS</span>Portal
        </div>
        <div className="mobile-menu block md:hidden">
          <button
            onClick={toggleNavbar}
            className="flex items-center px-2 py-2 border border-slate-200 rounded text-slate-200 hover:text-white hover:border-white"
          >
            {navbarOpen ? (
              <FiX className="h-5 w-5" />
            ) : (
              <FiMenu className="h-5 w-5" />
            )}
          </button>
        </div>
        <div className={`menu ${navbarOpen ? "block" : "hidden"} md:block md:w-auto`} id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
