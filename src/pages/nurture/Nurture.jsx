import React, { useState } from "react";
import { Switch } from "antd";
import {
  FiPlus,
  FiArrowUp,
  FiShield,
  FiMessageSquare,
  FiMail,
  FiEdit2,
} from "react-icons/fi";

import NewSequenceModal from "./NewSequenceModal";
import EditSequenceModal from "./EditSequenceModal";
import AddStepModal from "./AddStepModal";
import EditStepModal from "./EditStepModal";

// ---------- Fake data ----------
const topStats = [
  { label: "Messages sent (30d)", value: "1,284" },
  { label: "Open rate", value: "62%", delta: "Email" },
  { label: "Opt-out rate", value: "1.4%", note: "PECR compliant" },
];

const SEQUENCES = [
  {
    id: 1,
    name: "Implants — default",
    meta: "5 steps · SMS, Email, WhatsApp",
    active: true,
    selected: true,
  },
  {
    id: 2,
    name: "Invisalign — default",
    meta: "4 steps · SMS, Email",
    active: true,
  },
  {
    id: 3,
    name: "Re-engagement 14-day",
    meta: "3 steps · SMS, Email",
    active: true,
  },
  {
    id: 4,
    name: "Appointment reminders",
    meta: "48h · 24h · 2h",
    active: true,
  },
];

// Default template used when a new sequence starts "from template"
const TEMPLATE_STEPS = [
  {
    id: 1,
    channel: "sms",
    label: "SMS · Immediately",
    wait: 0,
    unit: "days",
    message:
      '"Hi {name}, thanks for your enquiry with Bright Smile. We\'ll call you shortly — or reply here with any questions."',
    delayAfter: "wait 1 day",
  },
  {
    id: 2,
    channel: "email",
    label: "Email · Day 1",
    wait: 1,
    unit: "days",
    message:
      '"What to expect" — patient stories + finance options.',
    delayAfter: "wait 2 days",
  },
  {
    id: 3,
    channel: "sms",
    label: "SMS · Day 3 — final",
    wait: 2,
    unit: "days",
    message:
      '"Still thinking it over, {name}? Here\'s that booking link once more."',
    delayAfter: null,
  },
];

const INITIAL_STEPS = [
  {
    id: 1,
    channel: "sms",
    label: "SMS · Immediately",
    wait: 0,
    unit: "days",
    message:
      '"Hi {name}, thanks for your implant enquiry with Bright Smile. We\'ll call you shortly — or reply here with any questions."',
    delayAfter: "wait 1 day",
  },
  {
    id: 2,
    channel: "email",
    label: "Email · Day 1",
    wait: 1,
    unit: "days",
    message:
      '"What to expect from dental implants" — patient stories + finance from £97/mo.',
    delayAfter: "wait 2 days",
  },
  {
    id: 3,
    channel: "wa",
    label: "WhatsApp · Day 3",
    badge: "Growth+",
    wait: 2,
    unit: "days",
    message: "Pre-approved template: gentle nudge with one-click booking link.",
    delayAfter: "wait 4 days",
  },
  {
    id: 4,
    channel: "sms",
    label: "SMS · Day 7 — final",
    wait: 4,
    unit: "days",
    message:
      '"Still thinking it over, {name}? Here\'s that booking link once more."',
    delayAfter: null,
  },
];

const CHANNEL_META = {
  sms: { bg: "bg-[#2f6fed]", icon: FiMessageSquare },
  email: { bg: "bg-[#0f6f6a]", icon: FiMail },
  wa: { bg: "bg-[#16a34a]", icon: FiMessageSquare },
};

function stepsLabel(count) {
  return `${count} step${count === 1 ? "" : "s"}`;
}

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

export default function Nurture() {
  const [sequences, setSequences] = useState(SEQUENCES);
  const [activeSeqId, setActiveSeqId] = useState(1);

  // Steps are stored per-sequence now, keyed by sequence id
  const [stepsBySequence, setStepsBySequence] = useState({
    1: INITIAL_STEPS,
  });

  const [builderOn, setBuilderOn] = useState(true);

  const [newSeqOpen, setNewSeqOpen] = useState(false);
  const [editSeqOpen, setEditSeqOpen] = useState(false);
  const [addStepOpen, setAddStepOpen] = useState(false);
  const [editStepOpen, setEditStepOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(null);

  const activeSequence = sequences.find((s) => s.id === activeSeqId);
  const steps = stepsBySequence[activeSeqId] || [];

  const setStepsForActive = (updater) => {
    setStepsBySequence((prev) => {
      const current = prev[activeSeqId] || [];
      const next =
        typeof updater === "function" ? updater(current) : updater;
      return { ...prev, [activeSeqId]: next };
    });
  };

  const handleAddStep = (step) => {
    setStepsForActive((prev) => {
      const updated = [...prev];
      if (updated.length)
        updated[updated.length - 1].delayAfter =
          `wait ${step.wait} ${step.unit}`;
      return [
        ...updated,
        {
          id: Date.now(),
          channel: step.channel,
          label: `${{ sms: "SMS", email: "Email", wa: "WhatsApp" }[step.channel]} · custom`,
          message: step.message,
          delayAfter: null,
        },
      ];
    });

    // keep the sequence list's meta text roughly in sync
    setSequences((prev) =>
      prev.map((s) =>
        s.id === activeSeqId
          ? { ...s, meta: stepsLabel((stepsBySequence[activeSeqId]?.length || 0) + 1) }
          : s,
      ),
    );
  };

  const handleSaveStep = (updated) => {
    setStepsForActive((prev) =>
      prev.map((s) => (s.id === updated.id ? { ...s, ...updated } : s)),
    );
  };

  const handleDeleteStep = (toDelete) => {
    setStepsForActive((prev) => prev.filter((s) => s.id !== toDelete.id));
    setSequences((prev) =>
      prev.map((s) =>
        s.id === activeSeqId
          ? {
              ...s,
              meta: stepsLabel(
                Math.max((stepsBySequence[activeSeqId]?.length || 1) - 1, 0),
              ),
            }
          : s,
      ),
    );
  };

  const handleCreateSequence = ({ name, startFrom }) => {
    const id = Date.now();
    const isBlank = startFrom === "blank";
    const initialSteps = isBlank ? [] : TEMPLATE_STEPS;

    setSequences((prev) => [
      ...prev,
      {
        id,
        name: name || "Untitled sequence",
        meta: stepsLabel(initialSteps.length),
        active: true,
      },
    ]);

    setStepsBySequence((prev) => ({ ...prev, [id]: initialSteps }));
    setActiveSeqId(id);
  };

  const handleSaveSequence = (updated) => {
    setSequences((prev) =>
      prev.map((s) => (s.id === updated.id ? { ...s, ...updated } : s)),
    );
  };

  const handleDeleteSequence = (toDelete) => {
    setSequences((prev) => prev.filter((s) => s.id !== toDelete.id));
    setStepsBySequence((prev) => {
      const next = { ...prev };
      delete next[toDelete.id];
      return next;
    });
    if (activeSeqId === toDelete.id) {
      const remaining = sequences.filter((s) => s.id !== toDelete.id);
      if (remaining.length) setActiveSeqId(remaining[0].id);
    }
  };

  return (
    <div className="page">
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
        <button
          type="button"
          onClick={() => setNewSeqOpen(true)}
          className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-gray-800 transition-colors shrink-0"
        >
          <FiPlus size={14} />
          New sequence
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 mb-6">
        {topStats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* Sequence list */}
        <div className="col-span-4">
          <div className="bg-white border border-slate-200 rounded-xl mb-4 overflow-hidden">
            <div className="px-4.5 px-[18px] py-3.5 border-b border-slate-100">
              <h3 className="text-[16px] font-semibold">Your sequences</h3>
            </div>
            <div className="py-1.5">
              {sequences.map((seq) => (
                <div
                  key={seq.id}
                  onClick={() => setActiveSeqId(seq.id)}
                  className={`flex justify-between items-center px-[18px] py-3 border-b border-slate-100 last:border-b-0 cursor-pointer ${
                    seq.id === activeSeqId
                      ? "bg-[#eef7f6]"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <div>
                    <b className="text-[13.5px]">{seq.name}</b>
                    <div className="text-slate-500 text-[12px] mt-1.5">{seq.meta}</div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-[12px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      On
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSeqId(seq.id);
                        setEditSeqOpen(true);
                      }}
                      className="w-8 h-8 grid place-items-center rounded-md text-slate-500 hover:bg-slate-100"
                    >
                      <FiEdit2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
            <FiShield className="text-emerald-600 flex-none mt-0.5" size={18} />
            <div className="text-[13px] text-emerald-900">
              <b>Opt-outs handled for you.</b> An SMS reply of STOP removes a
              lead from all sequences automatically and logs it against their
              record.
            </div>
          </div>
        </div>

        {/* Builder */}
        <div className="col-span-8">
          <div className="bg-white border border-slate-200 rounded-xl">
            <div className="flex justify-between items-center px-5 py-4 border-b border-slate-100">
              <div>
                <h3 className="text-[16px] font-semibold">
                  {activeSequence?.name}
                </h3>
                <div className="text-slate-500 text-[12.5px] mt-0.5">
                  Pauses automatically when the lead books or opts out
                </div>
              </div>

              <Switch checked={builderOn} onChange={setBuilderOn} />
            </div>

            <div className="p-5">
              {steps.length === 0 && (
                <div className="text-center text-[13px] text-slate-400 py-8 border border-dashed border-slate-200 rounded-lg mb-3">
                  This sequence is empty. Add your first step below.
                </div>
              )}

              {steps.map((step, i) => {
                const meta = CHANNEL_META[step.channel] || CHANNEL_META.sms;
                const Icon = meta.icon;
                const isLast = i === steps.length - 1;
                return (
                  <React.Fragment key={step.id}>
                    <div className="flex gap-3.5">
                      <div className="flex flex-col items-center flex-none w-10">
                        <div
                          className={`w-10 h-10 rounded-[11px] grid place-items-center text-white flex-none ${meta.bg}`}
                        >
                          <Icon size={16} />
                        </div>
                        {!isLast && (
                          <div className="w-0.5 flex-1 bg-slate-200 min-h-[18px]" />
                        )}
                      </div>
                      <div className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3.5 mb-3">
                        <div className="flex justify-between items-center">
                          <b className="text-[13px]">
                            {step.label}
                            {step.badge && (
                              <span className="ml-2 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[#eef7f6] text-[#0f6f6a] align-middle">
                                {step.badge}
                              </span>
                            )}
                          </b>
                          <button
                            onClick={() => {
                              setActiveStep(step);
                              setEditStepOpen(true);
                            }}
                            className="w-7 h-7 grid place-items-center rounded-md text-slate-500 hover:bg-slate-100"
                          >
                            <FiEdit2 size={13} />
                          </button>
                        </div>
                        <p className="text-[13px] text-slate-500 mt-1.5">
                          {step.message}
                        </p>
                      </div>
                    </div>
                    {step.delayAfter && (
                      <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 py-1 pl-[54px]">
                        ↓ {step.delayAfter}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}

              <button
                onClick={() => setAddStepOpen(true)}
                className="w-full flex items-center justify-center gap-1.5 border border-dashed border-slate-300 text-slate-600 hover:bg-slate-50 text-[13.5px] font-medium rounded-lg py-2.5 mt-2"
              >
                <FiPlus size={14} /> Add step
              </button>
            </div>
          </div>
        </div>
      </div>

      <NewSequenceModal
        open={newSeqOpen}
        onClose={() => setNewSeqOpen(false)}
        onCreate={handleCreateSequence}
      />
      <EditSequenceModal
        open={editSeqOpen}
        onClose={() => setEditSeqOpen(false)}
        sequence={activeSequence}
        onSave={handleSaveSequence}
        onDelete={handleDeleteSequence}
      />
      <AddStepModal
        open={addStepOpen}
        onClose={() => setAddStepOpen(false)}
        onAdd={handleAddStep}
      />
      <EditStepModal
        open={editStepOpen}
        onClose={() => setEditStepOpen(false)}
        step={activeStep}
        onSave={handleSaveStep}
        onDelete={handleDeleteStep}
      />
    </div>
  );
}