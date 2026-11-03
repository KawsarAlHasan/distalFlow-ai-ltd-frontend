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
const pieData = [
  { name: "Meta", value: 4, color: "#4F74E8" },
  { name: "Google", value: 4, color: "#74B0F4" },
  { name: "Organic", value: 2, color: "#34C472" },
];

export default function LeadsSource() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="mb-1">
        <span className="font-semibold text-gray-900 text-sm">
          Leads by Source
        </span>
        <p className="text-xs text-gray-400">Acquisition channel mix</p>
      </div>
      <div className="flex items-center justify-center mt-2">
        <PieChart width={200} height={180}>
          <Pie
            data={pieData}
            cx={100}
            cy={90}
            innerRadius={58}
            outerRadius={88}
            paddingAngle={2}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {pieData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
        {/* Center label */}
      </div>
      {/* We overlay the center text manually */}
      <div
        className="flex items-center justify-center"
        style={{
          marginTop: "-120px",
          marginBottom: "80px",
          pointerEvents: "none",
        }}
      >
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">10</div>
          <div className="text-xs text-gray-400">Total</div>
        </div>
      </div>
      {/* Legend */}
      <div className="flex gap-6 mt-2">
        {pieData.map((d) => (
          <div key={d.name} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: d.color }}
            />
            <span className="text-xs text-gray-600">{d.name}</span>
            <span className="text-xs font-semibold text-gray-800 ml-1">
              {d.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
