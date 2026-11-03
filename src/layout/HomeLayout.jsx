import React from "react";
import { Outlet, NavLink } from "react-router-dom";
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
import SidebarContent from "../components/common/SidebarContent";
import HeaderContent from "../components/common/HeaderContent";
import Navbar from "../pages/homePage/homeComponents/Navbar";
import Footer from "../pages/homePage/homeComponents/Footer";

const { Sider, Header, Content } = Layout;

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default HomeLayout;
