"use client";

import { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const navbarMenu = {
  en: {
    home: "Home",
    events: "Events",
    services: "Services",
    rentals:  "Rentals",
    contact: "Contact",
  },
  es: {
    home: "Inicio",
    events: "Eventos",
    services: "Servicios",
    rentals: "Arriendos",
    contact: "Contacto",
  },
};

export default function NavBar({ props, locale }) {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const currentLocale = typeof locale === "string" ? locale : router.locale || "en";
  const menu = navbarMenu[currentLocale];

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark" || (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const changeLocale = () => {
    const newLocale = currentLocale === "en" ? "es" : "en";
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <header className={`${poppins.className} bg-white dark:bg-gray-900 shadow-md fixed w-full z-50`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
     

      <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-gray-800 dark:text-white uppercase">
  <img 
    src="/web-app-manifest-192x192.png" 
    id="sunflower" 
    alt="Sunflower Logo" 
    className="w-8 h-8 transform transition-transform duration-300 hover:scale-110" 
  />
  <span>Tierra Girasol</span>
</Link>


        {/* Hamburger */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-gray-800 dark:text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L12 10.586l4.293-4.293a1 1 0 111.414 1.414L13.414 12l4.293 4.293a1 1 0 01-1.414 1.414L12 13.414l-4.293 4.293a1 1 0 01-1.414-1.414L10.586 12 6.293 7.707a1 1 0 010-1.414z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>

        {/* Menu */}
        <div className={`flex-col lg:flex-row lg:flex items-center space-y-4 lg:space-y-0 lg:space-x-6 absolute lg:static top-16 left-0 w-full lg:w-auto bg-white dark:bg-gray-900 shadow-md lg:shadow-none ${menuOpen ? "flex" : "hidden"}`}>
          <Link href="#home" onClick={handleLinkClick} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2 lg:py-0">
            {menu.home}
          </Link>
          <Link href="#events" onClick={handleLinkClick} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2 lg:py-0">
            {menu.events}
          </Link>
          <Link href="#services" onClick={handleLinkClick} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2 lg:py-0">
            {menu.services}
          </Link>
          <Link target="_blank" href="https://www.airbnb.cl/rooms/11544582" onClick={handleLinkClick} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2 lg:py-0">
            {menu.rentals}
          </Link>
          <Link href="#contact" onClick={handleLinkClick} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            {menu.contact}
          </Link>
          <Link href="https://www.instagram.com/tierra.girasol/" target="_blank" onClick={handleLinkClick} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2 lg:py-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="h-7 w-7"
          >
            <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-.88a.88.88 0 1 1 0 1.75.88.88 0 0 1 0-1.75z"/>
          </svg>
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="text-gray-800 dark:text-white focus:outline-none"
            aria-label="Toggle Theme"
          >
            {darkMode ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" clipRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          {/* Locale Switch */}
          <button
            onClick={changeLocale}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium focus:outline-none py-2 lg:py-0"
          >
            {currentLocale === "en" ? "ES" : "EN"}
          </button>
        </div>
      </nav>
    </header>
  );
}
