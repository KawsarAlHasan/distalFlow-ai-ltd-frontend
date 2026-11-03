import React, { useState } from "react";
import { Switch } from "antd";
import {
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiMessageSquare,
  FiMail,
  FiArrowUp,
  FiCheckCircle,
  FiChevronDown,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import NewSequenceModal from "./NewSequenceModal";

// ---------- Fake data ----------
const topStats = [
  { label: "Messages sent (30d)", value: "1,284" },
  { label: "Open rate", value: "62%", delta: "Email" },
  { label: "Opt-out rate", value: "1.4%", note: "PECR compliant" },
];

const sequences = [
  {
    id: 1,
    name: "Implants — default",
    meta: "5 steps · SMS, Email, WhatsApp",
    status: "On",
    active: true,
  },
  {
    id: 2,
    name: "Invisalign — default",
    meta: "4 steps · SMS, Email",
    status: "On",
  },
  {
    id: 3,
    name: "Re-engagement 14-day",
    meta: "3 steps · SMS, Email",
    status: "On",
  },
  {
    id: 4,
    name: "Appointment reminders",
    meta: "48h · 24h · 2h",
    status: "On",
  },
];

const channelStyle = {
  sms: {
    bg: "bg-slate-700",
    icon: <FiMessageSquare size={13} className="text-white" />,
  },
  email: {
    bg: "bg-teal-600",
    icon: <FiMail size={13} className="text-white" />,
  },
  whatsapp: {
    bg: "bg-emerald-500",
    icon: <FaWhatsapp size={14} className="text-white" />,
  },
};

const steps = [
  {
    id: 1,
    channel: "sms",
    label: "SMS · Immediately",
    message:
      '"Hi {name}, thanks for your implant enquiry with Bright Smile. We\'ll call you shortly — or reply here with any questions."',
    wait: "WAIT 1 DAY",
  },
  {
    id: 2,
    channel: "email",
    label: "Email · Day 1",
    message:
      '"What to expect from dental implants" — patient stories + finance from £97/mo.',
    wait: "WAIT 2 DAYS",
  },
  {
    id: 3,
    channel: "whatsapp",
    label: "WhatsApp · Day 3",
    badge: "Growth+",
    message: "Pre-approved template: gentle nudge with one-click booking link.",
    wait: "WAIT 4 DAYS",
  },
];

// ---------- Sub components ----------
function StatCard({ label, value, delta, note }) {
  return (
    <div className="flex-1 bg-white rounded-2xl border border-black/5 px-6 py-5">
      <div className="font-mono text-[11px] uppercase tracking-wider text-gray-400 mb-3">
        {label}
      </div>
      <div className="font-serif text-3xl text-gray-900 mb-2">{value}</div>
      {delta && (
        <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
          <FiArrowUp size={12} />
          <span>{delta}</span>
        </div>
      )}
      {note && <div className="text-xs text-gray-400">{note}</div>}
    </div>
  );
}

function SequenceRow({ seq, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left flex items-center justify-between px-6 py-4 border-l-2 transition-colors ${
        active
          ? "border-gray-900 bg-gray-50/70"
          : "border-transparent hover:bg-gray-50/50"
      }`}
    >
      <div>
        <div className="text-sm font-semibold text-gray-900">{seq.name}</div>
        <div className="text-xs text-gray-400 mt-0.5">{seq.meta}</div>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          {seq.status}
        </span>
        <span className="text-red-500 hover:text-red-600 cursor-pointer">
          <FiTrash2 size={15} />
        </span>
      </div>
    </button>
  );
}

function StepCard({ step, isLast }) {
  const c = channelStyle[step.channel];
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${c.bg}`}
        >
          {c.icon}
        </div>
        {!isLast && <div className="w-px flex-1 bg-gray-100 mt-1" />}
      </div>

      <div className="flex-1 pb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">
              {step.label}
            </span>
            {step.badge && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-violet-50 text-violet-600">
                {step.badge}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <FiEdit2 size={13} className="hover:text-gray-700 cursor-pointer" />
            <FiTrash2
              size={13}
              className="text-red-400 hover:text-red-600 cursor-pointer"
            />
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-sm text-gray-600 leading-relaxed">
          {step.message}
        </div>

        {!isLast && (
          <div className="flex items-center gap-1.5 mt-4 text-gray-400">
            <FiChevronDown size={12} />
            <span className="font-mono text-[10px] uppercase tracking-wider">
              {step.wait}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Main component ----------
function Nurture2() {
  const [activeId, setActiveId] = useState(1);
  const [sequenceOn, setSequenceOn] = useState(true);

  return (
    <div>
      <div>
        {/* Header */}
        <div className="lg:flex items-start justify-between mb-6">
          <div>
            <h1 className="font-serif text-3xl text-gray-900 mb-2">
              Nurture Sequences
            </h1>
            <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
              Automated follow-up that keeps leads warm until they book. SMS and
              email on every plan, WhatsApp on Growth and Full.
            </p>
          </div>
          <NewSequenceModal />
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 mb-6">
          {topStats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left: sequences list */}
          <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-50">
              <h2 className="font-serif text-xl text-gray-900">
                Your sequences
              </h2>
            </div>
            <div>
              {sequences.map((seq) => (
                <SequenceRow
                  key={seq.id}
                  seq={seq}
                  active={activeId === seq.id}
                  onClick={() => setActiveId(seq.id)}
                />
              ))}
            </div>

            <div className="m-4 flex items-start gap-2.5 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
              <FiCheckCircle
                className="text-emerald-500 shrink-0 mt-0.5"
                size={16}
              />
              <p className="text-sm text-emerald-900 leading-relaxed">
                <span className="font-semibold">Opt-outs handled for you.</span>{" "}
                An SMS reply of STOP removes a lead from all sequences
                automatically and logs it against their record.
              </p>
            </div>
          </div>

          {/* Right: sequence detail */}
          <div className="bg-white rounded-2xl border border-black/5 p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="font-serif text-xl text-gray-900">
                  Implants — default
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Pauses automatically when the lead books or opts out
                </p>
              </div>
              <Switch
                checked={sequenceOn}
                onChange={setSequenceOn}
                style={sequenceOn ? { backgroundColor: "#0d9488" } : undefined}
              />
            </div>

            <div>
              {steps.map((step, i) => (
                <StepCard
                  key={step.id}
                  step={step}
                  isLast={i === steps.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nurture2;
