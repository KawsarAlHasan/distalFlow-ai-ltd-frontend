import React, { useState } from "react";
import { Modal, Switch, Select } from "antd";
import { FiPlus, FiX, FiEye, FiEdit2 } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { PiMegaphoneSimpleBold } from "react-icons/pi";
import { BsBullseye } from "react-icons/bs";
import { LuWorkflow } from "react-icons/lu";
import { IoCalendarOutline } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import { PiCreditCardBold } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";

const MODULES = [
  {
    key: "dashboard",
    name: "Dashboard",
    desc: "View clinic performance & analytics",
    icon: <MdDashboard size={16} />,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    view: true,
    edit: false,
    editable: true,
  },
  {
    key: "leads",
    name: "Leads & Pipeline",
    desc: "View and work leads through the pipeline",
    icon: <HiOutlineUserGroup size={16} />,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    view: true,
    edit: true,
    editable: true,
  },
  {
    key: "campaigns",
    name: "Campaigns",
    desc: "Manage marketing campaigns",
    icon: <PiMegaphoneSimpleBold size={16} />,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
    view: true,
    edit: true,
    editable: true,
  },
  {
    key: "ads",
    name: "Ads",
    desc: "Create & manage Meta and Google ads",
    icon: <BsBullseye size={16} />,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
    view: true,
    edit: false,
    editable: true,
  },
  {
    key: "nurture",
    name: "Nurture Sequences",
    desc: "Build & edit automated follow-ups",
    icon: <LuWorkflow size={16} />,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    view: true,
    edit: true,
    editable: true,
  },
  {
    key: "bookings",
    name: "Bookings",
    desc: "View and manage appointments",
    icon: <IoCalendarOutline size={16} />,
    iconBg: "bg-teal-50",
    iconColor: "text-teal-500",
    view: true,
    edit: true,
    editable: true,
  },
  {
    key: "reports",
    name: "Reports",
    desc: "View reports and export data",
    icon: <TbReportAnalytics size={16} />,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    view: true,
    edit: false,
    editable: true,
  },
  {
    key: "account",
    name: "Account",
    desc: "Manage clinic profile & details",
    icon: <FaRegUserCircle size={16} />,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-400",
    view: false,
    edit: false,
    editable: false,
  },
  {
    key: "billing",
    name: "Billing & Plan",
    desc: "Manage billing, invoices & subscription",
    icon: <PiCreditCardBold size={16} />,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    view: false,
    edit: false,
    editable: false,
  },
  {
    key: "settings",
    name: "Settings",
    desc: "Integrations, branding & team",
    icon: <IoSettingsOutline size={16} />,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-500",
    view: false,
    edit: false,
    editable: false,
  },
];

export default function InviteTeamMember() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Receptionist");
  const [modules, setModules] = useState(MODULES);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const handleSendInvite = () => setIsModalOpen(false);

  const toggle = (key, field) => {
    setModules((prev) =>
      prev.map((m) => (m.key === key ? { ...m, [field]: !m[field] } : m)),
    );
  };

  return (
    <>
      <button
        onClick={showModal}
        className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-gray-800 transition-colors shrink-0"
      >
        <FiPlus size={14} />
        Invite
      </button>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        centered
        footer={null}
        closeIcon={<FiX size={18} className="text-gray-400" />}
        width={520}
        styles={{
          content: { padding: 0, borderRadius: 16, overflow: "hidden" },
        }}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Invite a team member
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Set the role and exactly what they can view or edit.
          </p>
        </div>

        {/* Body */}
        <div className="px-6 pb-2 max-h-[65vh] overflow-y-auto">
          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@brightsmile.co.uk"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 outline-none focus:border-gray-400 placeholder:text-gray-400 transition-colors"
            />
          </div>

          {/* Role */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Role
            </label>
            <Select
              value={role}
              onChange={setRole}
              className="w-full custom-role-select"
              size="large"
              options={[
                { value: "Receptionist", label: "Receptionist" },
                { value: "Dentist", label: "Dentist" },
                { value: "Manager", label: "Manager" },
                { value: "Admin", label: "Admin" },
              ]}
            />
          </div>

          {/* Module access */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Module access
            </label>
            <div className="rounded-2xl border border-gray-100 overflow-hidden">
              {/* table header */}
              <div className="flex items-center px-4 py-2.5 bg-gray-50 text-[11px] font-medium text-gray-400">
                <div className="flex-1">Module</div>
                <div className="w-14 flex items-center justify-center gap-1">
                  <FiEye size={12} />
                  View
                </div>
                <div className="w-14 flex items-center justify-center gap-1">
                  <FiEdit2 size={11} />
                  Edit
                </div>
              </div>

              {/* rows */}
              <div className="divide-y divide-gray-50 bg-white">
                {modules.map((m) => (
                  <div
                    key={m.key}
                    className="flex items-center px-4 py-3 hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${m.iconBg} ${m.iconColor}`}
                      >
                        {m.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {m.name}
                        </div>
                        <div className="text-xs text-gray-400 truncate">
                          {m.desc}
                        </div>
                      </div>
                    </div>
                    <div className="w-14 flex items-center justify-center">
                      <Switch
                        checked={m.view}
                        disabled={!m.editable}
                        onChange={() => toggle(m.key, "view")}
                        size="small"
                        className={m.view ? "bg-gray-900" : ""}
                      />
                    </div>
                    <div className="w-14 flex items-center justify-center">
                      <Switch
                        checked={m.edit}
                        disabled={!m.editable}
                        onChange={() => toggle(m.key, "edit")}
                        size="small"
                        className={m.edit ? "bg-gray-900" : ""}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 mt-2 bg-gray-50 border-t border-gray-100">
          <button
            onClick={handleCancel}
            className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSendInvite}
            className="px-4 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors"
          >
            Send invite
          </button>
        </div>
      </Modal>

      <style>{`
        .ant-switch.ant-switch-checked {
          background: #111827 !important;
        }
        .custom-role-select .ant-select-selector {
          border-radius: 12px !important;
          height: 44px !important;
          display: flex;
          align-items: center;
          border-color: #e5e7eb !important;
        }
      `}</style>
    </>
  );
}
