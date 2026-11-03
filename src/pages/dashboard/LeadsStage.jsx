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

// ── Data ──────────────────────────────────────────────────────────────────────
const barData = [
  { name: "Invisalign", value: 9, color: "#9B6BF2" },
  { name: "Implants", value: 8, color: "#F47B30" },
  { name: "Veneers", value: 3, color: "#2ECC71" },
  { name: "Bonding", value: 8, color: "#6B8CFF" },
  { name: "Bridges", value: 7, color: "#2ECC98" },
];

const CustomBar = (props) => {
  const { x, y, width, height, fill } = props;
  const radius = 6;
  return (
    <path
      d={`M${x},${y + radius} 
         Q${x},${y} ${x + radius},${y} 
         L${x + width - radius},${y} 
         Q${x + width},${y} ${x + width},${y + radius} 
         L${x + width},${y + height} 
         L${x},${y + height} Z`}
      fill={fill}
    />
  );
};

export default function LeadsStage() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="mb-1">
        <span className="font-semibold text-gray-900 text-sm">
          Leads by Stage
        </span>
        <p className="text-xs text-gray-400">Current funnel distribution</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={barData}
          barCategoryGap="30%"
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "#9CA3AF" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            ticks={[0, 1, 3, 5, 10]}
            tick={{ fontSize: 11, fill: "#9CA3AF" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{ borderRadius: 8, fontSize: 12 }}
          />
          <Bar dataKey="value" shape={<CustomBar />} radius={[6, 6, 0, 0]}>
            {barData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
