import React from "react";
import { Outlet, NavLink, useNavigate, Link } from "react-router-dom";
import { Layout, Input, Avatar, Badge, Drawer, Button } from "antd";
import {
  RiDashboardLine,
  RiFilterLine,
  RiBroadcastLine,
  RiMessage2Line,
  RiCalendarLine,
  RiBarChartLine,
  RiBankCardLine,
  RiSettings3Line,
  RiLogoutBoxLine,
  RiBellLine,
  RiSearchLine,
  RiMenuLine,
  RiCloseLine,
} from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { useAdmin } from "../../context/AdminContext";

export default function SidebarContent({ onClose }) {
  const { adminProfile } = useAdmin();

  const NAV_ITEMS = [
    {
      section: "Acquisition",
      links: [
        { label: "Dashboard", path: "/dashboard", icon: RiDashboardLine },
        { label: "Leads & Pipeline", path: "/leads", icon: RiFilterLine },
        { label: "Campaigns", path: "/campaigns", icon: RiBroadcastLine },
        { label: "Ads", path: "/ads", icon: RiBroadcastLine },
        { label: "Nurture Sequences", path: "/nurture", icon: RiMessage2Line },
        { label: "Bookings", path: "/bookings", icon: RiCalendarLine },
      ],
    },
    {
      section: "Insight",
      links: [{ label: "Reports", path: "/reports", icon: RiBarChartLine }],
    },
    {
      section: "Account",
      links: [
        { label: "Billing & Plan", path: "/billing", icon: RiBankCardLine },
        { label: "Settings", path: "/settings", icon: RiSettings3Line },
      ],
    },
  ];

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    onClose?.();
  };

  return (
    <div className="distalFlo-sidebar">
      {/* Logo */}
      <Link to="/" className="flex justify-center mb-4 lg:mb-8">
        <img
          src="/images/hero-horizontal-1.png"
          alt="logo"
          className="pt-2 pr-3"
          // className="w-[222px] h-[80px] lg:w-[331px] lg:h-[119px] object-contain"
        />
      </Link>

      {/* Nav */}
      <nav className="distalFlo-nav">
        {NAV_ITEMS.map(({ section, links }) => (
          <div key={section} className="distalFlo-nav-section">
            <p className="distalFlo-nav-section-label">{section}</p>
            {links.map(({ label, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                onClick={onClose}
                className={({ isActive }) =>
                  `distalFlo-nav-link ${isActive ? "distalFlo-nav-link--active" : ""}`
                }
              >
                <Icon size={17} className="distalFlo-nav-icon" />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="flex items-center gap-3 border-t border-[#5a5040] px-4 py-3">
        <Avatar
          src={adminProfile?.profile_image}
          size={34}
          style={{
            background: "#C9A84C",
            color: "#1a1510",
            fontWeight: 700,
            fontSize: 13,
            flexShrink: 0,
          }}
        >
          AP
        </Avatar>
        <div className="distalFlo-user-info">
          <p className="pt-0.5 pb-1 text-[#fff] m-0">{adminProfile?.name}</p>
          <p className="distalFlo-user-role m-0">{adminProfile?.roleName}</p>
        </div>
        <button
          className="distalFlo-logout-btn"
          onClick={handleLogout}
          title="Logout"
        >
          <IoIosLogOut size={17} />
        </button>
      </div>
    </div>
  );
}
