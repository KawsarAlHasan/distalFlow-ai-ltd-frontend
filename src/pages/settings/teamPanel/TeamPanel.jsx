import React from "react";
import { FiPlus, FiSettings, FiShield } from "react-icons/fi";
import InviteTeamMember from "./InviteTeamMember";

const team = [
  {
    name: "Dr. Amira Patel",
    email: "amira@brightsmile.co.uk",
    role: "Clinic admin",
    roleStyle: "bg-violet-50 text-violet-600",
    twoFA: true,
    you: true,
    palette: { bg: "#0F3B3D", color: "#fff" },
  },
  {
    name: "Rachel Cho",
    email: "rachel@brightsmile.co.uk",
    role: "Staff",
    roleStyle: "bg-emerald-50 text-emerald-600",
    twoFA: true,
    palette: { bg: "#16324F", color: "#fff" },
  },
  {
    name: "Jordan Miles",
    email: "jordan@brightsmile.co.uk",
    role: "Staff",
    roleStyle: "bg-emerald-50 text-emerald-600",
    twoFA: false,
    palette: { bg: "#6B4FA6", color: "#fff" },
  },
];

export default function TeamPanel() {
  return (
    <>
      <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Team members
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Control who can see leads and change settings
            </p>
          </div>
          <InviteTeamMember />
        </div>

        <div className="grid grid-cols-[2fr_2fr_1.2fr_0.8fr_0.4fr] px-6 py-3 border-b border-gray-100">
          {["Member", "Email", "Role", "2FA", ""].map((h) => (
            <div
              key={h}
              className="font-mono text-[11px] uppercase tracking-wider text-gray-400"
            >
              {h}
            </div>
          ))}
        </div>

        {team.map((m) => (
          <div
            key={m.name}
            className="grid grid-cols-[2fr_2fr_1.2fr_0.8fr_0.4fr] items-center px-6 py-4 border-b border-gray-50 last:border-b-0 hover:bg-gray-50/60 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                style={{
                  backgroundColor: m.palette.bg,
                  color: m.palette.color,
                }}
              >
                {m.name
                  .split(" ")
                  .map((w) => w[0])
                  .filter((_, i, arr) => i === 0 || i === arr.length - 1)
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {m.name}
              </span>
            </div>
            <div className="text-sm text-gray-500">{m.email}</div>
            <div>
              <span
                className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${m.roleStyle}`}
              >
                {m.role}
              </span>
            </div>
            <div>
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                  m.twoFA ? "text-emerald-600" : "text-red-500"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    m.twoFA ? "bg-emerald-500" : "bg-red-500"
                  }`}
                />
                {m.twoFA ? "On" : "Off"}
              </span>
            </div>
            <div className="flex justify-end">
              {m.you ? (
                <span className="text-xs text-gray-400">You</span>
              ) : (
                <button className="text-gray-400 hover:text-gray-700 transition-colors">
                  <FiSettings size={15} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mt-6">
        <FiShield className="text-blue-500 shrink-0 mt-0.5" size={15} />
        <p className="text-sm text-blue-900 leading-relaxed">
          <span className="font-semibold">Roles:</span> Clinic admins manage
          billing, settings and team. Staff can see and work leads but can't
          change billing or integrations.
        </p>
      </div>
    </>
  );
}
