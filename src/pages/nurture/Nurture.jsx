import React, { useState, useEffect } from "react";
import { Switch, Spin, Button, message as antMessage } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FiPlus,
  FiArrowUp,
  FiShield,
  FiMessageSquare,
  FiMail,
  FiEdit2,
  FiAlertCircle,
  FiRefreshCw,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

import NewSequenceModal from "./NewSequenceModal";
import EditSequenceModal from "./EditSequenceModal";
import AddStepModal from "./AddStepModal";
import EditStepModal from "./EditStepModal";

import {
  fetchNurtureSequencesApi,
  createNurtureSequenceApi,
  updateNurtureSequenceApi,
  deleteNurtureSequenceApi,
  addNurtureStepApi,
  updateNurtureStepApi,
  deleteNurtureStepApi,
} from "../../api/nurtureApi";

// ---------- Stats summary ----------
const topStats = [
  { label: "Messages sent (30d)", value: "1,284" },
  { label: "Open rate", value: "62%", delta: "Email" },
  { label: "Opt-out rate", value: "1.4%", note: "PECR compliant" },
];

const CHANNEL_META = {
  sms: { bg: "bg-[#2f6fed]", icon: FiMessageSquare, name: "SMS" },
  email: { bg: "bg-[#0f6f6a]", icon: FiMail, name: "Email" },
  wa: { bg: "bg-[#16a34a]", icon: FaWhatsapp, name: "WhatsApp" },
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
  const queryClient = useQueryClient();

  // 1. Fetch sequences from backend API
  const {
    data: sequences = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["nurtureSequences"],
    queryFn: fetchNurtureSequencesApi,
  });

  const [activeSeqId, setActiveSeqId] = useState(null);
  const [activeEditingSeq, setActiveEditingSeq] = useState(null);

  // Modal open states
  const [newSeqOpen, setNewSeqOpen] = useState(false);
  const [editSeqOpen, setEditSeqOpen] = useState(false);
  const [addStepOpen, setAddStepOpen] = useState(false);
  const [editStepOpen, setEditStepOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(null);

  // Synchronize active sequence ID with fetched data
  useEffect(() => {
    if (sequences && sequences.length > 0) {
      if (!activeSeqId || !sequences.some((s) => s.id === activeSeqId)) {
        setActiveSeqId(sequences[0].id);
      }
    } else {
      setActiveSeqId(null);
    }
  }, [sequences, activeSeqId]);

  const activeSequence =
    sequences.find((s) => s.id === activeSeqId) || sequences[0] || null;
  const steps = activeSequence?.steps || [];

  // 2. Mutations
  const createSeqMutation = useMutation({
    mutationFn: createNurtureSequenceApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["nurtureSequences"]);
      if (data?.id) {
        setActiveSeqId(data.id);
      }
      antMessage.success("Sequence created successfully");
      setNewSeqOpen(false);
    },
    onError: (err) => {
      antMessage.error(
        err?.response?.data?.message || "Failed to create sequence",
      );
    },
  });

  const updateSeqMutation = useMutation({
    mutationFn: ({ id, data }) => updateNurtureSequenceApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["nurtureSequences"]);
      antMessage.success("Sequence updated successfully");
      setEditSeqOpen(false);
    },
    onError: (err) => {
      antMessage.error(
        err?.response?.data?.message || "Failed to update sequence",
      );
    },
  });

  const deleteSeqMutation = useMutation({
    mutationFn: deleteNurtureSequenceApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["nurtureSequences"]);
      antMessage.success("Sequence deleted successfully");
      setEditSeqOpen(false);
    },
    onError: (err) => {
      antMessage.error(
        err?.response?.data?.message || "Failed to delete sequence",
      );
    },
  });

  const addStepMutation = useMutation({
    mutationFn: addNurtureStepApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["nurtureSequences"]);
      antMessage.success("Step added to sequence");
      setAddStepOpen(false);
    },
    onError: (err) => {
      antMessage.error(
        err?.response?.data?.message || "Failed to add step",
      );
    },
  });

  const updateStepMutation = useMutation({
    mutationFn: ({ id, data }) => updateNurtureStepApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["nurtureSequences"]);
      antMessage.success("Step updated successfully");
      setEditStepOpen(false);
    },
    onError: (err) => {
      antMessage.error(
        err?.response?.data?.message || "Failed to update step",
      );
    },
  });

  const deleteStepMutation = useMutation({
    mutationFn: deleteNurtureStepApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["nurtureSequences"]);
      antMessage.success("Step removed successfully");
      setEditStepOpen(false);
    },
    onError: (err) => {
      antMessage.error(
        err?.response?.data?.message || "Failed to delete step",
      );
    },
  });

  // Action handlers
  const handleCreateSequence = ({ name, campaignId, template }) => {
    createSeqMutation.mutate({
      name,
      campaignId: campaignId || undefined,
      template,
    });
  };

  const handleSaveSequence = (updated) => {
    updateSeqMutation.mutate({
      id: updated.id,
      data: {
        name: updated.name,
        active: updated.active,
        campaignId: updated.campaignId,
      },
    });
  };

  const handleDeleteSequence = (id) => {
    deleteSeqMutation.mutate(id);
  };

  const handleToggleSequenceActive = (checked) => {
    if (!activeSequence) return;
    updateSeqMutation.mutate({
      id: activeSequence.id,
      data: { active: checked },
    });
  };

  const handleAddStep = (stepData) => {
    if (!activeSequence) return;
    addStepMutation.mutate({
      sequenceId: activeSequence.id,
      channel: stepData.channel,
      wait: stepData.wait,
      unit: stepData.unit,
      message: stepData.message,
      badge: stepData.badge,
    });
  };

  const handleSaveStep = (stepData) => {
    updateStepMutation.mutate({
      id: stepData.id,
      data: {
        channel: stepData.channel,
        wait: stepData.wait,
        unit: stepData.unit,
        message: stepData.message,
        badge: stepData.badge,
      },
    });
  };

  const handleDeleteStep = (stepId) => {
    deleteStepMutation.mutate(stepId);
  };

  return (
    <div className="page pb-12">
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
          className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-gray-800 transition-colors shrink-0 shadow-sm"
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

      {/* Loading & Error States */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-slate-200">
          <Spin size="large" />
          <p className="text-sm text-gray-500 mt-4">
            Loading nurture sequences...
          </p>
        </div>
      )}

      {isError && !isLoading && (
        <div className="flex flex-col items-center justify-center py-16 bg-red-50 border border-red-200 rounded-2xl text-center px-4">
          <FiAlertCircle className="text-red-500 mb-2" size={32} />
          <h3 className="text-base font-semibold text-red-900">
            Failed to load sequences
          </h3>
          <p className="text-sm text-red-700 max-w-md mt-1 mb-4">
            {error?.response?.data?.message ||
              error?.message ||
              "Something went wrong while fetching sequences."}
          </p>
          <Button
            icon={<FiRefreshCw className="mr-1" />}
            onClick={() => refetch()}
            className="border-red-300 text-red-700 hover:text-red-800"
          >
            Retry
          </Button>
        </div>
      )}

      {/* Main Content */}
      {!isLoading && !isError && (
        <div className="grid grid-cols-12 gap-5">
          {/* Sequence list */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-white border border-slate-200 rounded-xl mb-4 overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-[18px] py-3.5 border-b border-slate-100">
                <h3 className="text-[16px] font-semibold text-gray-900">
                  Your sequences
                </h3>
                <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  {sequences.length}
                </span>
              </div>

              {sequences.length === 0 ? (
                <div className="py-10 px-4 text-center">
                  <p className="text-sm text-slate-500 mb-3">
                    No nurture sequences yet.
                  </p>
                  <Button
                    type="primary"
                    onClick={() => setNewSeqOpen(true)}
                    className="bg-[#0f6f6a] hover:!bg-[#0c5a56] border-[#0f6f6a]"
                  >
                    Create your first sequence
                  </Button>
                </div>
              ) : (
                <div className="py-1.5 divide-y divide-slate-100">
                  {sequences.map((seq) => {
                    const count = seq.steps?.length || 0;
                    const channelNames = [
                      ...new Set(
                        (seq.steps || []).map((s) => {
                          const meta = CHANNEL_META[s.channel];
                          return meta ? meta.name : s.channel.toUpperCase();
                        }),
                      ),
                    ].join(", ");

                    const meta = `${stepsLabel(count)}${
                      channelNames ? ` · ${channelNames}` : ""
                    }`;

                    const isSelected = seq.id === activeSeqId;

                    return (
                      <div
                        key={seq.id}
                        onClick={() => setActiveSeqId(seq.id)}
                        className={`flex justify-between items-center px-[18px] py-3.5 cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-[#eef7f6] border-l-4 border-l-[#0f6f6a]"
                            : "hover:bg-slate-50"
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <b className="text-[13.5px] text-gray-900 truncate block">
                            {seq.name}
                          </b>
                          <div className="text-slate-500 text-[12px] mt-1 truncate">
                            {meta}
                          </div>
                          {seq.campaign?.name && (
                            <div className="text-[11px] font-medium text-[#0f6f6a] mt-0.5 truncate">
                              Campaign: {seq.campaign.name}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2.5 shrink-0">
                          <span
                            className={`flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full ${
                              seq.active
                                ? "text-emerald-700 bg-emerald-50 border border-emerald-200"
                                : "text-slate-500 bg-slate-100 border border-slate-200"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                seq.active ? "bg-emerald-500" : "bg-slate-400"
                              }`}
                            />
                            {seq.active ? "On" : "Off"}
                          </span>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveEditingSeq(seq);
                              setEditSeqOpen(true);
                            }}
                            className="w-8 h-8 grid place-items-center rounded-md text-slate-500 hover:bg-slate-100 transition-colors"
                            title="Edit sequence"
                          >
                            <FiEdit2 size={13} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex gap-3 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
              <FiShield
                className="text-emerald-600 flex-none mt-0.5"
                size={18}
              />
              <div className="text-[13px] text-emerald-900 leading-relaxed">
                <b>Opt-outs handled for you.</b> An SMS reply of STOP removes a
                lead from all sequences automatically and logs it against their
                record.
              </div>
            </div>
          </div>

          {/* Builder */}
          <div className="col-span-12 lg:col-span-8">
            {activeSequence ? (
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
                <div className="flex justify-between items-center px-5 py-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-[16px] font-semibold text-gray-900">
                      {activeSequence.name}
                    </h3>
                    <div className="text-slate-500 text-[12.5px] mt-0.5">
                      Pauses automatically when the lead books or opts out
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400">
                      {activeSequence.active ? "Active" : "Paused"}
                    </span>
                    <Switch
                      checked={Boolean(activeSequence.active)}
                      loading={updateSeqMutation.isPending}
                      onChange={handleToggleSequenceActive}
                    />
                  </div>
                </div>

                <div className="p-5">
                  {steps.length === 0 && (
                    <div className="text-center text-[13px] text-slate-400 py-10 border border-dashed border-slate-200 rounded-lg mb-4">
                      This sequence is empty. Add your first step below.
                    </div>
                  )}

                  {steps.map((step, i) => {
                    const meta =
                      CHANNEL_META[step.channel] || CHANNEL_META.sms;
                    const Icon = meta.icon;
                    const isLast = i === steps.length - 1;

                    // Next step's wait determines the connector delay
                    const nextStep = steps[i + 1];
                    const delayAfter = nextStep
                      ? `wait ${nextStep.wait} ${nextStep.unit}`
                      : null;

                    const timingText =
                      step.wait === 0
                        ? "Immediately"
                        : `${step.wait} ${step.unit}`;
                    const stepLabel = `${meta.name} · ${timingText}${
                      isLast ? " — final" : ""
                    }`;

                    return (
                      <React.Fragment key={step.id}>
                        <div className="flex gap-3.5">
                          <div className="flex flex-col items-center flex-none w-10">
                            <div
                              className={`w-10 h-10 rounded-[11px] grid place-items-center text-white flex-none shadow-sm ${meta.bg}`}
                            >
                              <Icon size={16} />
                            </div>
                            {!isLast && (
                              <div className="w-0.5 flex-1 bg-slate-200 min-h-[22px] my-1" />
                            )}
                          </div>
                          <div className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3.5 mb-2 hover:border-slate-300 transition-colors shadow-xs">
                            <div className="flex justify-between items-center">
                              <b className="text-[13px] text-gray-900">
                                {stepLabel}
                                {step.badge && (
                                  <span className="ml-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#eef7f6] text-[#0f6f6a] align-middle">
                                    {step.badge}
                                  </span>
                                )}
                              </b>
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveStep(step);
                                  setEditStepOpen(true);
                                }}
                                className="w-7 h-7 grid place-items-center rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                                title="Edit step"
                              >
                                <FiEdit2 size={13} />
                              </button>
                            </div>
                            <p className="text-[13px] text-slate-600 mt-1.5 leading-relaxed whitespace-pre-wrap">
                              {step.message}
                            </p>
                          </div>
                        </div>

                        {delayAfter && (
                          <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 py-1 pl-[54px]">
                            ↓ {delayAfter}
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => setAddStepOpen(true)}
                    className="w-full flex items-center justify-center gap-1.5 border border-dashed border-slate-300 text-slate-600 hover:bg-slate-50 text-[13.5px] font-medium rounded-lg py-2.5 mt-3 transition-colors"
                  >
                    <FiPlus size={14} /> Add step
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-400 shadow-sm">
                Select or create a sequence to view and edit its steps.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      <NewSequenceModal
        open={newSeqOpen}
        onClose={() => setNewSeqOpen(false)}
        onCreate={handleCreateSequence}
        loading={createSeqMutation.isPending}
      />

      <EditSequenceModal
        open={editSeqOpen}
        onClose={() => {
          setEditSeqOpen(false);
          setActiveEditingSeq(null);
        }}
        sequence={activeEditingSeq || activeSequence}
        onSave={handleSaveSequence}
        onDelete={handleDeleteSequence}
        loading={updateSeqMutation.isPending || deleteSeqMutation.isPending}
      />

      <AddStepModal
        open={addStepOpen}
        onClose={() => setAddStepOpen(false)}
        onAdd={handleAddStep}
        loading={addStepMutation.isPending}
      />

      <EditStepModal
        open={editStepOpen}
        onClose={() => {
          setEditStepOpen(false);
          setActiveStep(null);
        }}
        step={activeStep}
        onSave={handleSaveStep}
        onDelete={handleDeleteStep}
        loading={updateStepMutation.isPending || deleteStepMutation.isPending}
      />
    </div>
  );
}
