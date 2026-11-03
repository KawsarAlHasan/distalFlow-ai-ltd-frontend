import React, { useState } from "react";
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

const { Sider, Header, Content } = Layout;

const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <Layout className="distalFlo-layout">
        {/* Desktop Sidebar */}
        <Sider
          width={286}
          className="distalFlo-antd-sider distalFlo-desktop-sider"
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <SidebarContent />
        </Sider>

        <Layout>
          {/* Header */}
          <HeaderContent setMobileOpen={setMobileOpen} />

          {/* Page Content */}
          <Content className="distalFlo-content p-6">
            <Outlet />
          </Content>
        </Layout>
      </Layout>

      {/* Mobile Drawer */}
      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        placement="left"
        width={220}
        className="distalFlo-drawer"
        closeIcon={null}
        styles={{
          body: { padding: 0, background: "#1c1712" },
          header: { display: "none" },
        }}
      >
        <SidebarContent onClose={() => setMobileOpen(false)} />
      </Drawer>
    </>
  );
};

export default MainLayout;
