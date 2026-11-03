import React from "react";
import { Avatar, Badge, Button, Tag } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { HiOutlineUsers } from "react-icons/hi";
import { HiOutlinePhone } from "react-icons/hi";
import { BsCalendar3 } from "react-icons/bs";
import { TrendingUp } from "lucide-react";
import LeadsSource from "./LeadsSource";
import LeadsStage from "./LeadsStage";

// ── Data ──────────────────────────────────────────────────────────────────────
const hotLeads = [
  {
    name: "Sarah Whitman",
    time: "09:46",
    treatment: "Dental Implants",
    source: "Meta",
    qualified: "4 min ago",
    avatar: "SW",
    color: "#6B7280",
  },
  {
    name: "James Okoro",
    time: "09:21",
    treatment: "Invisalign",
    source: "Meta",
    qualified: "12 min ago",
    avatar: "JO",
    color: "#374151",
  },
  {
    name: "Megan Lewis",
    time: "08:55",
    treatment: "Dental Implants",
    source: "Google",
    qualified: "15 min ago",
    avatar: "ML",
    color: "#9CA3AF",
  },
  {
    name: "Olivia Grant",
    time: "Yesterday",
    treatment: "Facial Aesthetics",
    source: "Meta",
    qualified: "20 min ago",
    avatar: "OG",
    color: "#D97706",
  },
];

const campaigns = [
  { name: "Dental Implants", leads: 86, cpl: "£41", status: "live" },
  { name: "Facial Aesthetics", leads: 18, cpl: "£52", status: "paused" },
  { name: "Invisalign", leads: 44, cpl: "£33", status: "live" },
  { name: "Invisalign", leads: 44, cpl: "£33", status: "live" },
];

// ── Sub-components ─────────────────────────────────────────────────────────────
const StatCard = ({ icon, label, value, sub, subColor = "text-green-600" }) => (
  <div className="bg-white rounded-2xl p-5 flex flex-col gap-2 shadow-sm">
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-400 font-medium tracking-wide">
        {label}
      </span>
      <span className="text-gray-400 text-lg">{icon}</span>
    </div>
    <div className="text-3xl font-bold text-gray-900">{value}</div>
    <div className={`text-xs font-medium ${subColor}`}>{sub}</div>
  </div>
);

// ── Main Component ─────────────────────────────────────────────────────────────
function Dashboard() {
  return (
    <div className="min-h-screen font-sans">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Welcome back, Dr. Patel. Here's what's happening today.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <StatCard
          icon={<HiOutlineUsers />}
          label="Leads this Month"
          value="142"
          sub="+22% vs last month"
        />
        <StatCard
          icon={<HiOutlinePhone className="text-amber-400" />}
          label="Call Connected"
          value="212"
          sub="+71% answer rate"
        />
        <StatCard
          icon={<BsCalendar3 className="text-blue-400" />}
          label="Consultations Booking"
          value="38"
          sub="+22% vs last month"
        />
        <StatCard
          icon={<TrendingUp size={18} className="text-green-500" />}
          label="Cost Per Booking"
          value="$38"
          sub="$6 lower"
          subColor="text-red-500"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        {/* Leads by Source */}
        <LeadsSource />

        {/* Leads by Stage */}
        <LeadsStage />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
        {/* Hot Leads */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="mb-4">
            <span className="font-semibold text-gray-900 text-sm">
              Hot leads
            </span>
            <p className="text-xs text-gray-400">
              Qualified by the AI call — follow up fast
            </p>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-400 border-b border-gray-100">
                <th className="text-left pb-2 font-medium">Lead</th>
                <th className="text-left pb-2 font-medium">Treatment</th>
                <th className="text-left pb-2 font-medium">Source</th>
                <th className="text-left pb-2 font-medium">Qualified</th>
              </tr>
            </thead>
            <tbody>
              {hotLeads.map((lead, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar
                        size={34}
                        style={{
                          backgroundColor: lead.color,
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        {lead.avatar}
                      </Avatar>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          {lead.name}
                        </div>
                        <div className="text-xs text-gray-400">{lead.time}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-gray-700">
                    {lead.treatment}
                  </td>
                  <td className="py-3 text-sm text-gray-700">{lead.source}</td>
                  <td className="py-3 text-xs text-gray-400">
                    {lead.qualified}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Active Campaigns */}
        <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col">
          <h3 className="font-semibold text-gray-900 text-sm mb-4">
            Active campaigns
          </h3>
          <div className="flex flex-col gap-3 flex-1">
            {campaigns.map((c, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {c.name}
                  </div>
                  <div className="text-xs text-gray-400">
                    {c.leads} leads · {c.cpl} CPL
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1
                    ${c.status === "live" ? "text-green-600" : "text-gray-400"}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full inline-block ${
                      c.status === "live" ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                  {c.status}
                </span>
              </div>
            ))}
          </div>
          <Button
            block
            className="mt-4 rounded-xl border-gray-200 text-sm text-gray-700 font-medium hover:border-gray-400"
          >
            View all campaigns
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
