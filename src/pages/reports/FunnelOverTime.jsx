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

const funnelData = [
  { week: "Wk 1", Leads: 60, Booked: 20, Converted: 10 },
  { week: "Wk 2", Leads: 80, Booked: 28, Converted: 12 },
  { week: "Wk 3", Leads: 110, Booked: 30, Converted: 14 },
  { week: "Wk 4", Leads: 100, Booked: 25, Converted: 13 },
];

function LegendDot({ color, label }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className="w-2.5 h-2.5 rounded-sm"
        style={{ backgroundColor: color }}
      />
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}

export default function FunnelOverTime() {
  return (
    <div className="bg-white rounded-2xl border border-black/5 p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="font-serif text-xl text-gray-900 mb-1">
            Funnel over time
          </h2>
          <p className="text-xs text-gray-400">
            Leads → booked → attended → converted
          </p>
        </div>
        <div className="flex items-center gap-4">
          <LegendDot color="#5F9EA0" label="Leads" />
          <LegendDot color="#D97B29" label="Booked" />
          <LegendDot color="#2F6B3C" label="Converted" />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={funnelData} barSize={36}>
          <XAxis
            dataKey="week"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />
          <Bar
            dataKey="Leads"
            stackId="a"
            fill="#5F9EA0"
            radius={[4, 4, 0, 0]}
          />
          <Bar dataKey="Booked" stackId="a" fill="#D97B29" />
          <Bar
            dataKey="Converted"
            stackId="a"
            fill="#2F6B3C"
            radius={[0, 0, 2, 2]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
