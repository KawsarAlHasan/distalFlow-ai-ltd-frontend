import React, { useState } from "react";
import { Switch, Segmented } from "antd";
import {
  FiClock,
  FiInfo,
  FiRefreshCw,
  FiCheck,
} from "react-icons/fi";

// ---------- Fake data ----------
const topStats = [
  { label: "Upcoming", value: "19" },
  { label: "This Week", value: "7" },
  { label: "No-shows (30D)", value: "3", note: "Re-booking sent" },
  { label: "Attended", value: "11", note: "92% show rate", noteIcon: true },
];

// June 2026 calendar — Mon first, 31 is prev month, 1-4 of next month greyed
const weeks = [
  [
    { day: 31, muted: true },
    { day: 1 },
    { day: 2 },
    { day: 3 },
    { day: 4 },
    { day: 5 },
    { day: 6 },
  ],
  [
    { day: 7 },
    { day: 8 },
    { day: 9, events: [{ label: "H. Reed", color: "green" }] },
    { day: 10 },
    { day: 11 },
    { day: 12, events: [{ label: "2 consults", color: "green" }] },
    { day: 13 },
  ],
  [
    { day: 14 },
    { day: 15 },
    { day: 16, today: true, events: [{ label: "S. Whitman", color: "amber" }] },
    { day: 17 },
    {
      day: 18,
      events: [
        { label: "O. Grant", color: "amber" },
        { label: "J. Okoro", color: "amber" },
      ],
    },
    { day: 19, events: [{ label: "B. Carter", color: "amber" }] },
    { day: 20 },
  ],
  [
    { day: 21 },
    { day: 22 },
    { day: 23 },
    { day: 24 },
    { day: 25 },
    { day: 26 },
    { day: 27 },
  ],
  [
    { day: 28 },
    { day: 29 },
    { day: 30 },
    { day: 1, muted: true },
    { day: 2, muted: true },
    { day: 3, muted: true },
    { day: 4, muted: true },
  ],
];

const weekDayLabels = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const scheduleDays = [
  { day: "Monday", open: true, bookings: 8 },
  { day: "Tuesday", open: true, bookings: 8 },
  { day: "Wednesday", open: true, bookings: 8 },
  { day: "Thursday", open: true, bookings: 8 },
  { day: "Friday", open: true, bookings: 8 },
  { day: "Saturday", open: false, bookings: 8 },
  { day: "Sunday", open: false, bookings: 8 },
];

const appointments = [
  {
    name: "Olivia Grant",
    initials: "OG",
    palette: { bg: "#F3E3F7", color: "#8B4FA6" },
    treatment: "Facial Aesthetics",
    date: "18 Jun",
    status: "Confirmed",
  },
  {
    name: "James Okoro",
    initials: "JO",
    palette: { bg: "#DCEAFB", color: "#3B6FB6" },
    treatment: "Invisalign",
    date: "18 Jun",
    status: "Confirmed",
  },
  {
    name: "Ben Carter",
    initials: "BC",
    palette: { bg: "#E4F5E9", color: "#3E9160" },
    treatment: "Dental Implants",
    date: "19 Jun",
    status: "Confirmed",
  },
];

// ---------- Sub components ----------
function StatCard({ label, value, note, noteIcon }) {
  return (
    <div className="flex-1 bg-white rounded-2xl border border-black/5 px-6 py-5">
      <div className="font-mono text-[11px] uppercase tracking-wider text-gray-400 mb-3">
        {label}
      </div>
      <div className="font-serif text-3xl text-gray-900 mb-2">{value}</div>
      {note && (
        <div
          className={`flex items-center gap-1 text-xs font-medium ${
            noteIcon ? "text-emerald-600" : "text-gray-400"
          }`}
        >
          {noteIcon && <FiCheck size={12} />}
          <span>{note}</span>
        </div>
      )}
    </div>
  );
}

const eventColors = {
  green: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-100 text-amber-800",
};

function DayCell({ cell }) {
  return (
    <div
      className={`min-h-[85px] border-r border-b border-gray-100 last:border-r-0 px-2.5 py-2 ${
        cell.muted ? "bg-gray-50/60" : "bg-white"
      }`}
    >
      <div
        className={`text-sm mb-1.5 ${
          cell.muted
            ? "text-gray-300"
            : cell.today
            ? "text-amber-500 font-semibold"
            : "text-gray-700"
        }`}
      >
        {cell.day}
      </div>
      <div className="flex flex-col gap-1">
        {cell.events?.map((ev, i) => (
          <span
            key={i}
            className={`text-[11px] font-medium px-1.5 py-0.5 rounded truncate ${eventColors[ev.color]}`}
          >
            {ev.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function ScheduleRow({ item }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <div className="flex items-center gap-3">
        <Switch
          checked={item.open}
          size="small"
          style={item.open ? { backgroundColor: "#0d9488" } : undefined}
        />
        <span
          className={`text-sm font-medium ${
            item.open ? "text-gray-900" : "text-gray-400"
          }`}
        >
          {item.day}
        </span>
      </div>
      {item.open ? (
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">bookings:</span>
          <input
            type="text"
            readOnly
            value={item.bookings}
            className="w-14 text-center text-sm border border-gray-200 rounded-lg py-1 text-gray-700"
          />
        </div>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
          Closed
        </span>
      )}
    </div>
  );
}

function StatusTag({ status }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-600">
      <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
      {status}
    </span>
  );
}

// ---------- Main component ----------
function Bookings() {
  const [view, setView] = useState("Month");

  return (
    <div>
      <div>
        {/* Header */}
        <div className="lg:flex items-start justify-between mb-6">
          <div>
            <h1 className="font-serif text-3xl text-gray-900 mb-2">Bookings</h1>
            <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
              Consultations booked through DistalFlo, synced with CareStack.
              Reminders fire at 48h, 24h and 2h automatically.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            CareStack connected
          </span>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-5 mb-6">
          {topStats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* Calendar + right panel */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 mb-6 items-start">
          {/* Calendar */}
          <div className="bg-white rounded-2xl border border-black/5 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-serif text-xl text-gray-900">June 2026</h2>
              <Segmented
                value={view}
                onChange={setView}
                options={["Month", "Week"]}
              />
            </div>

            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/50">
                {weekDayLabels.map((d) => (
                  <div
                    key={d}
                    className="font-mono text-[10px] uppercase tracking-wider text-gray-400 px-2.5 py-2 border-r border-gray-100 last:border-r-0"
                  >
                    {d}
                  </div>
                ))}
              </div>
              {weeks.map((week, wi) => (
                <div key={wi} className="grid grid-cols-7">
                  {week.map((cell, ci) => (
                    <DayCell key={ci} cell={cell} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div className="flex flex-col gap-6">
            {/* Opening hours */}
            <div className="bg-white rounded-2xl border border-black/5 p-6">
              <h2 className="font-serif text-xl text-gray-900 mb-1">
                Opening hours
              </h2>
              <p className="text-xs text-gray-400 mb-5">
                Shown to patients — booking is by day, not by time
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-gray-400 mb-1.5">Opens</div>
                  <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2">
                    <span className="text-sm text-gray-700">9:00 AM</span>
                    <FiClock size={14} className="text-gray-400" />
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1.5">Closes</div>
                  <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2">
                    <span className="text-sm text-gray-700">9:00 PM</span>
                    <FiClock size={14} className="text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                <FiInfo className="text-blue-500 shrink-0 mt-0.5" size={15} />
                <p className="text-xs text-blue-900 leading-relaxed">
                  These hours appear on the patient's booking page and
                  confirmation. They don't split the day into time slots.
                </p>
              </div>
            </div>

            {/* Weekly schedule */}
            <div className="bg-white rounded-2xl border border-black/5 p-6">
              <h2 className="font-serif text-xl text-gray-900 mb-1">
                Weekly schedule
              </h2>
              <p className="text-xs text-gray-400 mb-4">
                Open days and how many bookings each can take
              </p>

              <div className="flex items-center justify-between mb-1 pb-3 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-900">
                  Default bookings per open day
                </span>
                <input
                  type="text"
                  readOnly
                  value={8}
                  className="w-14 text-center text-sm border border-gray-200 rounded-lg py-1 text-gray-700"
                />
              </div>

              <div className="divide-y divide-gray-50">
                {scheduleDays.map((item) => (
                  <ScheduleRow key={item.day} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming appointments */}
        <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
            <h2 className="font-serif text-lg lg:text-xl text-gray-900">
              Upcoming appointments
            </h2>
            <button className="inline-flex items-center gap-1.5 bg-white text-sm text-gray-700 font-medium px-3.5 py-2 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
              <FiRefreshCw size={13} />
              Sync
            </button>
          </div>

          <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr] px-6 py-3 border-b border-gray-100">
            {["Patient", "Treatment", "Date", "Status"].map((h) => (
              <div
                key={h}
                className="font-mono text-[11px] uppercase tracking-wider text-gray-400"
              >
                {h}
              </div>
            ))}
          </div>

          {appointments.map((a) => (
            <div
              key={a.name}
              className="grid grid-cols-[2fr_1.5fr_1fr_1fr] items-center px-6 py-4 border-b border-gray-50 last:border-b-0 hover:bg-gray-50/60 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                  style={{ backgroundColor: a.palette.bg, color: a.palette.color }}
                >
                  {a.initials}
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {a.name}
                </span>
              </div>
              <div className="text-sm text-gray-600">{a.treatment}</div>
              <div className="text-sm text-gray-500">{a.date}</div>
              <div>
                <StatusTag status={a.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Bookings;