import React, { useState } from "react";
import { Avatar, Button, Table } from "antd";
import {
  FiPhone,
  FiMail,
  FiMinusCircle,
  FiArrowUp,
  FiTrash2,
  FiTrash,
} from "react-icons/fi";
import ViewDetails from "./ViewDetails";
import DeleteModal from "../../components/DeleteModal2";
import { useNavigate, useSearchParams } from "react-router-dom";
import LeadBin from "./LeadBin";

// ---------- Fake data ----------
const stats = [
  {
    label: "Total lead",
    value: "2000",
    delta: "+40% vs last 12 month",
    deltaIcon: <FiArrowUp className="text-emerald-600" size={12} />,
  },
  {
    label: "Calls Today",
    value: "38",
    delta: "Avg 4m 02s to first call",
    deltaIcon: <FiPhone className="text-emerald-600" size={12} />,
  },
  {
    label: "Answer Rate",
    value: "76%",
    delta: "+4% this week",
    deltaIcon: <FiArrowUp className="text-emerald-600" size={12} />,
  },
  {
    label: "Avg Call Length",
    value: "2m 51s",
    delta: null,
  },
];

const sourceStyles = {
  Meta: "bg-blue-50 text-blue-600 border-blue-100",
  Organic: "bg-emerald-50 text-emerald-600 border-emerald-100",
  Google: "bg-sky-50 text-sky-600 border-sky-100",
};

const stageStyles = {
  Qualified: {
    dot: "bg-violet-500",
    text: "text-violet-600",
    bg: "bg-violet-50",
  },
  Booked: { dot: "bg-orange-500", text: "text-orange-600", bg: "bg-orange-50" },
  New: { dot: "bg-slate-400", text: "text-slate-600", bg: "bg-slate-50" },
};

const outcomeStyles = {
  Answered: { text: "text-emerald-600", icon: <FiPhone size={11} /> },
  Voicemail: { text: "text-amber-500", icon: <FiMail size={11} /> },
  "No answer": { text: "text-gray-400", icon: <FiMinusCircle size={11} /> },
};

const avatarPalette = [
  { bg: "#FDE8D7", color: "#C2703D" },
  { bg: "#DCEAFB", color: "#3B6FB6" },
  { bg: "#E4F5E9", color: "#3E9160" },
  { bg: "#F3E3F7", color: "#8B4FA6" },
  { bg: "#FCE4E4", color: "#C24848" },
];

const names = [
  { name: "Sarah Whitman", phone: "07700 900 412" },
  { name: "Daniel Ferreira", phone: "07700 900 118" },
  { name: "Priya Anand", phone: "07700 900 561" },
  { name: "Michael Osei", phone: "07700 900 233" },
  { name: "Lucy Bennett", phone: "07700 900 874" },
  { name: "Tomasz Nowak", phone: "07700 900 305" },
  { name: "Aisha Rahman", phone: "07700 900 690" },
  { name: "Ethan Clarke", phone: "07700 900 447" },
];

const sources = [
  "Meta",
  "Meta",
  "Meta",
  "Meta",
  "Organic",
  "Meta",
  "Google",
  "Meta",
];
const stages = [
  "Qualified",
  "Qualified",
  "Booked",
  "Booked",
  "Booked",
  "Qualified",
  "Qualified",
  "Qualified",
];
const outcomes = [
  "Answered",
  "Answered",
  "Voicemail",
  "Voicemail",
  "No answer",
  "No answer",
  "No answer",
  "No answer",
];

const leads = names.map((n, i) => ({
  key: i,
  ...n,
  initials: n.name
    .split(" ")
    .map((w) => w[0])
    .join(""),
  treatment: "Dental Implants",
  source: sources[i],
  stage: stages[i],
  outcome: outcomes[i],
  revenue: "$200",
  length: "3m 12s",
  palette: avatarPalette[i % avatarPalette.length],
}));

// ---------- Sub components ----------
function StatCard({ label, value, delta, deltaIcon }) {
  return (
    <div className="flex-1 bg-white rounded-2xl border border-black/5 px-6 py-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="font-mono text-[11px] uppercase tracking-wider text-gray-400 mb-3">
        {label}
      </div>
      <div className="font-serif text-4xl text-gray-900 mb-2">{value}</div>
      {delta && (
        <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
          {deltaIcon}
          <span>{delta}</span>
        </div>
      )}
    </div>
  );
}

function SourceTag({ source }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md border text-xs font-medium ${sourceStyles[source]}`}
    >
      {source}
    </span>
  );
}

function StageTag({ stage }) {
  const s = stageStyles[stage] || stageStyles.New;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${s.bg} ${s.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {stage}
    </span>
  );
}

function OutcomeTag({ outcome }) {
  const o = outcomeStyles[outcome];
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium ${o.text}`}
    >
      {o.icon}
      {outcome}
    </span>
  );
}

// ---------- Main component ----------
function Leads() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  if (searchParams.get("action") === "recycle-bin") {
    return <LeadBin />;
  }

  const openDeleteModal = (lead) => {
    setSelectedLead(lead);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedLead(null);
  };

  const goToRecycleBin = () => {
    navigate("/leads?action=recycle-bin");
  };

  // ---------- antd Table column definitions ----------
  const columns = [
    {
      title: "Lead",
      dataIndex: "name",
      key: "name",
      render: (_, lead) => (
        <div className="flex items-center gap-3">
          <Avatar
            style={{
              backgroundColor: lead.palette.bg,
              color: lead.palette.color,
              fontWeight: 600,
              fontSize: 12,
            }}
          >
            {lead.initials}
          </Avatar>
          <div>
            <div className="text-sm font-semibold text-gray-900">
              {lead.name}
            </div>
            <div className="text-xs text-gray-400 font-mono">{lead.phone}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Treatment",
      dataIndex: "treatment",
      key: "treatment",
      render: (treatment) => (
        <span className="text-sm text-gray-600">{treatment}</span>
      ),
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      render: (source) => <SourceTag source={source} />,
    },
    {
      title: "Stage",
      dataIndex: "stage",
      key: "stage",
      render: (stage) => <StageTag stage={stage} />,
    },
    {
      title: "Outcome",
      dataIndex: "outcome",
      key: "outcome",
      render: (outcome) => <OutcomeTag outcome={outcome} />,
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
      render: (revenue) => (
        <span className="text-sm font-mono text-gray-900">{revenue}</span>
      ),
    },
    {
      title: "Length",
      dataIndex: "length",
      key: "length",
      render: (length) => (
        <span className="text-sm font-mono text-gray-500">{length}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "right",
      render: (_, lead) => (
        <div className="flex justify-end items-center gap-3">
          <ViewDetails />
          <Button
            onClick={() => openDeleteModal(lead)}
            icon={<FiTrash2 size={14} />}
            danger
            className="flex items-center gap-1.5 text-[13px] rounded-full"
          ></Button>
        </div>
      ),
    },
  ];

  const deletedCount = 0;

  return (
    <div className="min-h-screen w-full">
      <style>{`
        .leads-table .ant-table {
          background: transparent;
        }
        .leads-table .ant-table-thead > tr > th {
          background: transparent;
          border-bottom: 1px solid #f3f4f6;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #9ca3af;
          font-weight: 500;
          padding: 12px 24px;
        }
        .leads-table .ant-table-thead > tr > th::before {
          display: none;
        }
        .leads-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #f9fafb;
          padding: 16px 24px;
        }
        .leads-table .ant-table-tbody > tr:last-child > td {
          border-bottom: none;
        }
        .leads-table .ant-table-tbody > tr:hover > td {
          background: rgba(249, 250, 251, 0.6) !important;
        }
      `}</style>

      <div className="">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="font-serif text-3xl text-gray-900 mb-2">
              Leads &amp; Pipeline
            </h1>
            <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
              Every enquiry, from first contact to converted patient. Drag a
              card to move it through the journey.
            </p>
          </div>

          <Button
            onClick={goToRecycleBin}
            className="group relative flex items-center gap-2 h-9 pl-3.5 pr-4 rounded-full
    text-[13px] font-medium text-gray-500
    bg-white border border-gray-200
    shadow-[0_1px_2px_rgba(0,0,0,0.04)]
    overflow-hidden
    transition-all duration-300 ease-out
    hover:text-red-600 hover:border-red-200
    hover:shadow-[0_4px_14px_rgba(220,38,38,0.12)]
    hover:-translate-y-[1px]
    active:translate-y-0 active:shadow-[0_1px_2px_rgba(0,0,0,0.04)]
  "
          >
            {/* soft red wash that sweeps in on hover */}
            <span
              className="absolute inset-0 -translate-x-full group-hover:translate-x-0
      bg-gradient-to-r from-red-50 via-red-50/80 to-transparent
      transition-transform duration-500 ease-out"
            />

            {/* icon with its own little "shake" on hover */}
            <span className="relative z-10 flex items-center justify-center w-4 h-4">
              <FiTrash2
                size={14}
                className="transition-all duration-300 ease-out
        group-hover:rotate-[-8deg] group-hover:scale-110"
              />
            </span>

            <span className="relative z-10">Recycle Bin</span>

            {deletedCount > 0 && (
              <span
                className="relative z-10 ml-0.5 min-w-[18px] h-[18px] px-1 rounded-full
        bg-gray-900 text-white text-[10px] font-semibold
        flex items-center justify-center
        transition-colors duration-300
        group-hover:bg-red-500"
              >
                {deletedCount}
              </span>
            )}
          </Button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-black/5 overflow-hidden leads-table">
          <Table
            columns={columns}
            dataSource={leads}
            pagination={false}
            rowKey="key"
          />
        </div>
      </div>

      {/* Delete modal — bound to whichever lead's button was clicked */}
      <DeleteModal
        open={deleteModalOpen}
        onClose={closeDeleteModal}
        patientName={selectedLead?.name}
        patientId={selectedLead?.key}
        onConfirmDelete={async (patientId) => {
          // Replace with your actual API call
          await fetch(`/api/leads/${patientId}/deletion-request`, {
            method: "POST",
          });
        }}
      />
    </div>
  );
}

export default Leads;
