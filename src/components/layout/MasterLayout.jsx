import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const MasterLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const nav_item = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/profile", label: "Profile" },
  ];

  return (
    <div>
      <nav className="bg-blue-950 p-6 flex justify-between items-center relative">
        {/* Logo */}
        <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
          <img src={logo} alt="Logo" className="w-full h-full object-cover" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-5 text-xl">
          {nav_item.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? "p-2 rounded-3xl bg-blue-300 text-white"
                  : "p-2 rounded-2xl text-gray-200 hover:bg-blue-700 hover:scale-105 transition-all duration-300"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Toggle Button (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 bg-gray-700 rounded text-white"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: -250 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }} exit={{ opacity: 0, x: -1000 }}
              className="flex flex-col gap-4 pt-5 absolute top-[80px] left-0 w-full px-5 py-3 bg-blue-900 z-[40] md:hidden">
              {nav_item.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "p-2 rounded-3xl bg-blue-500 text-white"
                      : "p-2 rounded-2xl text-gray-200 hover:bg-blue-700 transition-all duration-300"
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};

export default MasterLayout;
