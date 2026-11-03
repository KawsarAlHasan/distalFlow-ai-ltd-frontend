import { Image } from "antd";
import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { Link, useNavigate, useLocation } from "react-router-dom";

const NAVBAR_HEIGHT = 80;

const footerLinks = {
  Product: [
    {
      name: "Features",
      link: "#",
    },
    {
      name: "How It Works",
      link: "#",
    },
    {
      name: "Integrations",
      link: "#",
    },
    {
      name: "FAQ",
      link: "#",
    },
  ],

  Resources: [
    {
      name: "Documentation",
      link: "#",
    },
    {
      name: "Help Center",
      link: "#",
    },
    {
      name: "Blog",
      link: "#",
    },
    {
      name: "Case Studies",
      link: "#",
    },
  ],

  Company: [
    {
      name: "About Us",
      link: "#",
    },
    {
      name: "Careers",
      link: "#",
    },
    {
      name: "Privacy Policy",
      link: "/privacy",
    },
    {
      name: "Terms of Service",
      link: "/terms",
    },
  ],
};

// Sections that actually exist on the homepage (match Navbar's navLinks)
const SCROLL_SECTIONS = ["features", "how-it-works", "integrations", "faq"];

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e, item) => {
    // Only intercept links that are meant to scroll to a homepage section.
    // Real routes (e.g. /privacy, /terms) should navigate normally.
    if (item.link && item.link !== "#") {
      return;
    }

    e.preventDefault();
    const targetId = item.name.toLowerCase().replace(/\s+/g, "-");

    if (!SCROLL_SECTIONS.includes(targetId)) {
      return;
    }

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
  };

  return (
    <footer className="bg-[#14091c] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand col */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-2">
            <Link to="/">
              <Image
                src="/images/homeLogo.png"
                width={230}
                alt="logo"
                preview={false}
              />
            </Link>

            <p className="subTitleText text-[14px] leading-relaxed max-w-[300px] mt-8 ">
              Automated patient acquisition for private clinics. Built by a
              clinic owner — for clinic owners.
            </p>

            <div className="flex items-center gap-3 mt-8">
              <div className="border border-purple-800/40 bg-[#1a1230] p-4 shadow-[0_0_40px_rgba(255,236,179,0.10)] hover:shadow-[0_0_60px_rgba(255,236,179,0.15)] rounded-full cursor-pointer">
                <RiTwitterXFill className="secondColor hover:text-white/90 transition-colors" />
              </div>

              <div className="border border-purple-800/40 bg-[#1a1230] p-4 shadow-[0_0_40px_rgba(255,236,179,0.10)] hover:shadow-[0_0_60px_rgba(255,236,179,0.15)] rounded-full cursor-pointer">
                <FaLinkedinIn className="secondColor hover:text-white/90 transition-colors" />
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <p className="secondColor text-[16px] font-bold uppercase tracking-[0.2em] mb-5">
                {section}
              </p>
              <ul className="flex flex-col gap-3">
                {links.map((item) => {
                  const isRoute = item.link && item.link !== "#";

                  if (isRoute) {
                    return (
                      <li key={item.name}>
                        <Link
                          to={item.link}
                          className="subTitleText text-[14px] hover:text-white/90! transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    );
                  }

                  return (
                    <li key={item.name}>
                      <a
                        href={`/#${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={(e) => handleNavClick(e, item)}
                        className="subTitleText text-[14px] hover:text-white/90! transition-colors"
                      >
                        {item.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-7 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="subTitleText text-[14px]">
            © 2026 DistalFlo AI Ltd. All rights reserved.
          </p>
          <div className="subTitleText text-[14px] flex flex-wrap gap-3">
            <span className="flex items-center gap-1">
              {" "}
              <Image
                src="/images/icons/footer.png"
                alt="flag"
                width={20}
                height={20}
                preview={false}
              />{" "}
              Built for Private Clinics
            </span>
            <span className="flex items-center gap-1">
              {" "}
              <Image
                src="/images/icons/footer.png"
                alt="flag"
                width={20}
                height={20}
                preview={false}
              />{" "}
              No Agencies
            </span>
            {/* <span className="flex items-center gap-1">
              <Image
                src="/images/icons/footer.png"
                alt="flag"
                width={20}
                height={20}
                preview={false}
              />
              No NHS
            </span> */}
            <span className="flex items-center gap-1">
              {" "}
              <Image
                src="/images/icons/footer.png"
                alt="flag"
                width={20}
                height={20}
                preview={false}
              />{" "}
              100% Automated
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}