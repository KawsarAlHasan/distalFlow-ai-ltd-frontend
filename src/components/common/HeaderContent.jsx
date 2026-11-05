import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Layout,
  Input,
  Avatar,
  Badge,
  Drawer,
  Dropdown,
  Tag,
} from "antd";
import {
  RiMenuLine,
  RiSearchLine,
} from "react-icons/ri";

const { Header } = Layout;

import {
  UserOutlined,
  LogoutOutlined,
  BellOutlined,
} from "@ant-design/icons";
import ChangePassword from "../ChangePassword";
import AccountSetting from "../AccountSetting";
import Notifications from "../Notifications";
import { useNotification } from "../../api/userApi";
import { useAdmin } from "../../context/AdminContext";
import { signOutAdmin } from "../../api/api";

export default function HeaderContent({ setMobileOpen }) {
  const location = useLocation();

  const getNavTextKey = () => {
    const path = location.pathname;
    if (path === "/") return "Dashboard";
    if (path === "/leads") return "Leads & Pipeline";
    if (path === "/campaigns") return "Campaigns";
    if (path === "/ads") return "Ads";
    if (path === "/nurture") return "Nurture Sequences";
    if (path === "/bookings") return "Bookings";
    if (path === "/reports") return "Reports";
    if (path === "/billing") return "Billing & Plan";
    if (path === "/settings") return "Settings";
    return "Dashboard";
  };

  const [drawerVisible, setDrawerVisible] = useState(false);
  const { adminProfile, refetch } = useAdmin();

  const {
    notification,
    isLoading,
    isError,
    error,
    refetch: notificationRefetch,
  } = useNotification();

  const handleSignOut = () => {
    signOutAdmin();
  };

  const userAvatar = adminProfile?.profilePic || adminProfile?.profile_image;
  const clinicDisplay = adminProfile?.clinic?.name || adminProfile?.clinicName || adminProfile?.roleName || "Clinic Admin";

  const profileMenuItems = [
    {
      key: "adminProfile",
      label: (
        <div className="p-2 cursor-default">
          <div className="flex gap-3 items-start">
            <Avatar
              size={50}
              src={userAvatar}
              icon={<UserOutlined />}
              className="border border-gray-200"
            />
            <div>
              <h1 className="text-[#242424] text-[15px] font-bold mb-1">
                {adminProfile?.name || "Clinic Doctor"}
              </h1>
              <Tag color="gold" className="m-0 text-xs">
                {clinicDisplay}
              </Tag>
            </div>
          </div>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "profile",
      label: <AccountSetting adminProfile={adminProfile} refetch={refetch} />,
    },
    {
      key: "change-password",
      label: <ChangePassword />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: (
        <div
          onClick={handleSignOut}
          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
        >
          <LogoutOutlined /> Logout
        </div>
      ),
    },
  ];

  return (
    <Header className="distalFlo-header">
      {/* Mobile menu toggle */}
      <button
        className="distalFlo-mobile-menu-btn"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <RiMenuLine size={20} />
      </button>

      <span className="distalFlo-header-title hidden md:block">{getNavTextKey()}</span>

      <div className="distalFlo-header-search">
        <Input
          prefix={<RiSearchLine size={14} color="#aaa" />}
          placeholder="Search leads, campaigns, clinic..."
          bordered={false}
          style={{
            background: "#f7f7f7",
            borderRadius: 8,
            border: "1px solid #e5e5e5",
            height: 34,
            fontSize: 13,
          }}
        />
      </div>

      <div className="distalFlo-header-actions">
        {/* Right section */}
        <div className="flex items-center gap-4">
          <Badge
            count={notification?.unreadNotifications || 0}
            size="small"
            className="cursor-pointer p-2 rounded-full border-2 border-gray-200 hover:border-orange-400 transition-colors"
          >
            <BellOutlined
              className="text-xl"
              onClick={() => setDrawerVisible(true)}
            />
          </Badge>

          <Dropdown
            menu={{ items: profileMenuItems }}
            trigger={["click"]}
            placement="bottomRight"
            overlayStyle={{ width: "300px" }}
          >
            <div className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Avatar
                size="large"
                src={userAvatar}
                icon={<UserOutlined />}
                className="border-2 border-gray-200 hover:border-orange-400 transition-colors"
              />
              <div className="hidden md:block">
                <div className="text-[#242424] text-[14px] font-semibold leading-tight">
                  {adminProfile?.name || "Clinic Doctor"}
                </div>
                <div className="text-[12px] text-gray-500 leading-tight">
                  {clinicDisplay}
                </div>
              </div>
              <div className="hidden md:block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </Dropdown>
        </div>

        {/* Drawer for notifications */}
        <Drawer
          title="Notifications"
          placement="right"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
        >
          <Notifications
            notification={notification}
            isLoading={isLoading}
            isError={isError}
            error={error}
            refetch={notificationRefetch}
          />
        </Drawer>
      </div>
    </Header>
  );
}
