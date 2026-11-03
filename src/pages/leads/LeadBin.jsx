import React, { useState } from "react";
import { Avatar, Button, Table, Tooltip, message } from "antd";
import { FiRotateCcw, FiTrash2, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ViewDetails from "./ViewDetails";
import DeleteModal2 from "../../components/DeleteModal2";
import DeletePermanently from "../../components/DeletePermanently";

// ---------- Fake data (deleted in the last 24h) ----------
const avatarPalette = [
  { bg: "#FDE8D7", color: "#C2703D" },
  { bg: "#DCEAFB", color: "#3B6FB6" },
  { bg: "#E4F5E9", color: "#3E9160" },
  { bg: "#F3E3F7", color: "#8B4FA6" },
  { bg: "#FCE4E4", color: "#C24848" },
];

const initialDeletedLeads = [
  {
    key: 1,
    name: "Grace Holloway",
    phone: "07700 900 221",
    treatment: "Teeth Whitening",
    source: "Meta",
    deletedAt: "Today, 09:42 AM",
    deletedBy: "Sarah (Front Desk)",
  },
  {
    key: 2,
    name: "Omar Farouk",
    phone: "07700 900 903",
    treatment: "Dental Implants",
    source: "Google",
    deletedAt: "Today, 08:15 AM",
    deletedBy: "Admin",
  },
  {
    key: 3,
    name: "Chloe Ibrahim",
    phone: "07700 900 356",
    treatment: "Invisalign",
    source: "Organic",
    deletedAt: "Yesterday, 07:58 PM",
    deletedBy: "Sarah (Front Desk)",
  },
  {
    key: 4,
    name: "Nathan Price",
    phone: "07700 900 640",
    treatment: "Root Canal",
    source: "Meta",
    deletedAt: "Yesterday, 03:20 PM",
    deletedBy: "Admin",
  },
].map((l, i) => ({
  ...l,
  initials: l.name
    .split(" ")
    .map((w) => w[0])
    .join(""),
  palette: avatarPalette[i % avatarPalette.length],
}));

const sourceStyles = {
  Meta: "bg-blue-50 text-blue-600 border-blue-100",
  Organic: "bg-emerald-50 text-emerald-600 border-emerald-100",
  Google: "bg-sky-50 text-sky-600 border-sky-100",
};

function SourceTag({ source }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md border text-xs font-medium ${sourceStyles[source]}`}
    >
      {source}
    </span>
  );
}

export default function LeadBin() {
  const navigate = useNavigate();
  const [deletedLeads, setDeletedLeads] = useState(initialDeletedLeads);

  const handleBack = () => {
    navigate("/leads");
  };

  const handleRestore = (lead) => {
    // Replace with your actual API call
    // await fetch(`/api/leads/${lead.key}/restore`, { method: "POST" });
    setDeletedLeads((prev) => prev.filter((l) => l.key !== lead.key));
    message.success(`${lead.name} restored to Leads & Pipeline`);
  };

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
      title: "Deleted At",
      dataIndex: "deletedAt",
      key: "deletedAt",
      render: (deletedAt) => (
        <span className="text-sm font-mono text-gray-500">{deletedAt}</span>
      ),
    },
    {
      title: "Deleted By",
      dataIndex: "deletedBy",
      key: "deletedBy",
      render: (deletedBy) => (
        <span className="text-sm text-gray-600">{deletedBy}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "right",
      render: (_, lead) => (
        <div className="flex justify-end items-center gap-3">
          <ViewDetails />

          <Tooltip title="Restore">
            <Button
              onClick={() => handleRestore(lead)}
              icon={<FiRotateCcw size={14} />}
              className="flex items-center gap-1.5 text-[13px] rounded-full text-emerald-600 border-emerald-200 hover:!text-emerald-700 hover:!border-emerald-300"
            />
          </Tooltip>

          <Tooltip title="Delete permanently">
            <DeletePermanently
              lead={lead}
              onConfirm={(deletedLead) =>
                setDeletedLeads((prev) =>
                  prev.filter((l) => l.key !== deletedLead.key),
                )
              }
              BTN={
                <Button
                  icon={<FiTrash2 size={14} />}
                  danger
                  className="flex items-center gap-1.5 text-[13px] rounded-full"
                />
              }
            />
            {/* <DeletePermanently
              BTN={
                <Button
                  icon={<FiTrash2 size={14} />}
                  danger
                  className="flex items-center gap-1.5 text-[13px] rounded-full"
                />
              }
            /> */}
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full">
      <style>{`
        .bin-table .ant-table {
          background: transparent;
        }
        .bin-table .ant-table-thead > tr > th {
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
        .bin-table .ant-table-thead > tr > th::before {
          display: none;
        }
        .bin-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #f9fafb;
          padding: 16px 24px;
        }
        .bin-table .ant-table-tbody > tr:last-child > td {
          border-bottom: none;
        }
        .bin-table .ant-table-tbody > tr:hover > td {
          background: rgba(249, 250, 251, 0.6) !important;
        }
      `}</style>

      <div className="">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-4 transition-colors"
          >
            <FiArrowLeft size={14} />
            Back to Leads
          </button>
          <h1 className="font-serif text-3xl text-gray-900 mb-2">
            Recycle Bin
          </h1>
          <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
            Leads deleted in the last 24 hours. Restore them or remove them
            permanently.
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-black/5 overflow-hidden bin-table">
          {deletedLeads.length > 0 ? (
            <Table
              columns={columns}
              dataSource={deletedLeads}
              pagination={false}
              rowKey="key"
            />
          ) : (
            <div className="py-16 text-center text-sm text-gray-400">
              Recycle bin is empty.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
