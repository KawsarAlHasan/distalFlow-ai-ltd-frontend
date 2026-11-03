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

const leadSource = [
  { name: "Meta Ads", value: 58, color: "#5F9EA0" },
  { name: "Google Ads", value: 30, color: "#D97B29" },
  { name: "Organic", value: 12, color: "#6B5FA6" },
];

export default function LeadSource() {
  return (
    <div className="bg-white rounded-2xl border border-black/5 p-6">
      <h2 className="font-serif text-xl text-gray-900 mb-6">Lead source</h2>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={leadSource}
            dataKey="value"
            innerRadius={62}
            outerRadius={92}
            paddingAngle={2}
            stroke="none"
          >
            {leadSource.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="flex flex-col gap-3 mt-4">
        {leadSource.map((s) => (
          <div key={s.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-sm"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-sm text-gray-600">{s.name}</span>
            </div>
            <span className="text-sm text-gray-400 font-mono">
              — {s.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
