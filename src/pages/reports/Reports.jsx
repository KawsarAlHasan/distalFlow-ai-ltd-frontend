import React from "react";
import { Table, Dropdown } from "antd";
import {
  FiDownload,
  FiChevronDown,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import FunnelOverTime from "./FunnelOverTime";
import LeadSource from "./LeadSource";

// ---------- Fake data ----------
const topStats = [
  { label: "Total Leads", value: "148", delta: "22%", deltaType: "up" },
  { label: "Ad Spend", value: "£1,560", note: "Edit spend" },
  {
    label: "Cost Per Lead",
    value: "£10.50",
    delta: "£1.20 lower",
    deltaType: "down",
  },
  {
    label: "Cost Per Booking",
    value: "£38",
    delta: "£6 lower",
    deltaType: "down",
  },
];

const campaignRows = [
  {
    key: 1,
    campaign: "Dental Implants",
    leads: 86,
    calls: 66,
    booked: 22,
    attended: 14,
    converted: 5,
    revenue: "£21,000",
    cost: "£42",
  },
  {
    key: 2,
    campaign: "Invisalign",
    leads: 44,
    calls: 35,
    booked: 13,
    attended: 8,
    converted: 3,
    revenue: "£9,600",
    cost: "£33",
  },
  {
    key: 3,
    campaign: "Facial Aesthetics",
    leads: 18,
    calls: 14,
    booked: 4,
    attended: 3,
    converted: 1,
    revenue: "£2,400",
    cost: "£52",
  },
];

const dateOptions = {
  items: [
    { key: "7", label: "Last 7 days" },
    { key: "30", label: "Last 30 days" },
    { key: "90", label: "Last 90 days" },
  ],
};

// ---------- Sub components ----------
function StatCard({ label, value, delta, deltaType, note }) {
  return (
    <div className="flex-1 bg-white rounded-2xl border border-black/5 px-6 py-5">
      <div className="font-mono text-[11px] uppercase tracking-wider text-gray-400 mb-3">
        {label}
      </div>
      <div className="font-serif text-3xl text-gray-900 mb-2">{value}</div>
      {delta && (
        <div
          className={`flex items-center gap-1 text-xs font-medium ${
            deltaType === "up" ? "text-emerald-600" : "text-orange-600"
          }`}
        >
          {deltaType === "up" ? (
            <FiArrowUp size={12} />
          ) : (
            <FiArrowDown size={12} />
          )}
          <span>{delta}</span>
        </div>
      )}
      {note && (
        <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
          {note}
        </button>
      )}
    </div>
  );
}

// ---------- Main component ----------
function Reports() {
  const columns = [
    {
      title: "Campaign",
      dataIndex: "campaign",
      key: "campaign",
      render: (v) => (
        <span className="text-sm font-semibold text-gray-900">{v}</span>
      ),
    },
    { title: "Leads", dataIndex: "leads", key: "leads" },
    { title: "Calls", dataIndex: "calls", key: "calls" },
    { title: "Booked", dataIndex: "booked", key: "booked" },
    { title: "Attended", dataIndex: "attended", key: "attended" },
    { title: "Converted", dataIndex: "converted", key: "converted" },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
      render: (v) => (
        <span className="font-mono text-sm text-gray-900">{v}</span>
      ),
    },
    {
      title: "Cost / Booking",
      dataIndex: "cost",
      key: "cost",
      render: (v) => (
        <span className="font-mono text-sm text-gray-500">{v}</span>
      ),
    },
  ].map((c) => ({
    ...c,
    render:
      c.render || ((v) => <span className="text-sm text-gray-600">{v}</span>),
  }));

  return (
    <div>
      <style>{`
        .reports-table .ant-table { background: transparent; }
        .reports-table .ant-table-thead > tr > th {
          background: transparent;
          border-bottom: 1px solid #f3f4f6;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #9ca3af;
          font-weight: 500;
          padding: 10px 24px;
        }
        .reports-table .ant-table-thead > tr > th::before { display: none; }
        .reports-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #f9fafb;
          padding: 16px 24px;
        }
        .reports-table .ant-table-tbody > tr:last-child > td { border-bottom: none; }
      `}</style>

      <div>
        {/* Header */}
        <div className="lg:flex items-start justify-between mb-6">
          <div>
            <h1 className="font-serif text-3xl text-gray-900 mb-2">Reports</h1>
            <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
              Where your leads come from and what they cost. Add your ad spend
              and DistalFlo calculates the rest.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Dropdown menu={dateOptions} trigger={["click"]}>
              <button className="inline-flex items-center gap-2 bg-white text-sm text-gray-700 font-medium px-4 py-2.5 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                Last 30 days
                <FiChevronDown size={14} className="text-gray-400" />
              </button>
            </Dropdown>
            <button className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-gray-800 transition-colors">
              <FiDownload size={14} />
              Monthly report
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-5 mb-6">
          {topStats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mb-6">
          {/* Funnel over time */}
          <FunnelOverTime />

          {/* Lead source donut */}
          <LeadSource />
        </div>

        {/* Per-campaign performance table */}
        <div className="bg-white rounded-2xl border border-black/5 overflow-hidden reports-table">
          <div className="px-6 py-5 border-b border-gray-50">
            <h2 className="font-serif text-xl text-gray-900">
              Per-campaign performance
            </h2>
          </div>
          <Table
            columns={columns}
            dataSource={campaignRows}
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
}

export default Reports;
