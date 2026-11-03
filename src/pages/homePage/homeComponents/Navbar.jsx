


import { Image } from "antd";
import React, { useState, useEffect } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { Link, useNavigate, useLocation } from "react-router-dom";

const navLinks = ["Features", "How It Works", "Integrations", "FAQ"]; // "Pricing",

const NAVBAR_HEIGHT = 80;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname === "/" && location.state?.scrollTo) {
      const targetId = location.state.scrollTo;
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          const elementPosition = el.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - NAVBAR_HEIGHT;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 100);

      window.history.replaceState({}, document.title);

      return () => clearTimeout(timer);
    }
  }, [location]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("instructorProfile");
    localStorage.removeItem("profileTimestamp");
    navigate("/login");
  };

  const handleNavClick = (e, link) => {
    e.preventDefault();
    const targetId = link.toLowerCase().replace(/\s+/g, "-");

    if (location.pathname === "/") {
      const el = document.getElementById(targetId);
      if (el) {
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - NAVBAR_HEIGHT;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    } else {
      navigate("/", { state: { scrollTo: targetId } });
    }

    setMenuOpen(false);
  };

  // Logo / Request Access smooth scroll
  const handleScrollTop = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#100b1e]/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/#" onClick={handleScrollTop}>
            <Image
              preview={false}
              className="cursor-pointer !w-[207px] !h-[62px]"
              src="/images/homeLogo.png"
              alt="logo"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`/#${link.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={(e) => handleNavClick(e, link)}
                className="text-white/60 text-sm hover:text-white transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <h2
              onClick={handleLogOut}
              className="cursor-pointer text-white/60 text-sm hover:text-white transition-colors"
            >
              Log In
            </h2>
            <a
              href="#"
              onClick={handleScrollTop}
              className="mainBtn text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-[#dbb95d] transition-colors"
            >
              Request Access
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white text-2xl p-1"
          >
            {menuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#100b1e]/98 backdrop-blur-md border-t border-white/10">
          <div className="px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={(e) => handleNavClick(e, link)}
                className="text-white/70 text-base hover:text-white transition-colors py-1"
              >
                {link}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
              <h2 onClick={handleLogOut} className="text-white/60 text-sm">
                Log In
              </h2>
              <a
                href="#"
                onClick={handleScrollTop}
                className="bg-[#c9a84c] text-[#100b1e] text-sm font-bold px-5 py-3 rounded-full text-center hover:bg-[#dbb95d] transition-colors"
              >
                Request Access
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}