import React, { useState } from "react";
import { Modal, Avatar, Divider, message } from "antd";
import { FiAlertTriangle, FiX, FiTrash2 } from "react-icons/fi";

const sourceStyles = {
  Meta: "bg-blue-50 text-blue-600 border-blue-100",
  Organic: "bg-emerald-50 text-emerald-600 border-emerald-100",
  Google: "bg-sky-50 text-sky-600 border-sky-100",
};

function SourceTag({ source }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md border text-xs font-medium ${
        sourceStyles[source] || "bg-gray-50 text-gray-600 border-gray-100"
      }`}
    >
      {source}
    </span>
  );
}

export default function DeletePermanently({ BTN, lead, onConfirm }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => {
    if (loading) return;
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      // Replace with your actual API call
      // await fetch(`/api/leads/${lead.key}`, { method: "DELETE" });
      await new Promise((r) => setTimeout(r, 700));
      onConfirm?.(lead);
      message.success(`${lead?.name || "Lead"} permanently deleted`);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      message.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {React.cloneElement(BTN, { onClick: showModal })}

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        closable={false}
        centered
        width={440}
        styles={{
          content: { padding: 0, borderRadius: 20, overflow: "hidden" },
          mask: { backdropFilter: "blur(2px)" },
        }}
      >
        {/* Header */}
        <div className="relative px-6 pt-6 pb-5 border-b border-gray-100">
          <button
            onClick={handleCancel}
            disabled={loading}
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-40"
          >
            <FiX size={18} />
          </button>

          <div className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center mb-3">
            <FiAlertTriangle size={20} className="text-red-500" />
          </div>
          <h2 className="font-serif text-xl text-gray-900 mb-1">
            Delete permanently?
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed pr-6">
            This action cannot be undone. This lead will be removed from the
            system forever.
          </p>
        </div>

        {/* Lead summary */}
        {lead && (
          <div className="px-6 py-5">
            <div className="flex items-center gap-3 mb-4">
              <Avatar
                style={{
                  backgroundColor: lead.palette?.bg || "#FDE8D7",
                  color: lead.palette?.color || "#C2703D",
                  fontWeight: 600,
                  fontSize: 13,
                }}
                size={40}
              >
                {lead.initials}
              </Avatar>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-gray-900 truncate">
                  {lead.name}
                </div>
                <div className="text-xs text-gray-400 font-mono">
                  {lead.phone}
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 border border-gray-100 divide-y divide-gray-100">
              <div className="flex items-center justify-between px-4 py-2.5">
                <span className="text-xs text-gray-400 uppercase tracking-wide font-mono">
                  Treatment
                </span>
                <span className="text-sm text-gray-700 font-medium">
                  {lead.treatment}
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-2.5">
                <span className="text-xs text-gray-400 uppercase tracking-wide font-mono">
                  Source
                </span>
                <SourceTag source={lead.source} />
              </div>
              <div className="flex items-center justify-between px-4 py-2.5">
                <span className="text-xs text-gray-400 uppercase tracking-wide font-mono">
                  Deleted At
                </span>
                <span className="text-sm text-gray-700 font-mono">
                  {lead.deletedAt}
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-2.5">
                <span className="text-xs text-gray-400 uppercase tracking-wide font-mono">
                  Deleted By
                </span>
                <span className="text-sm text-gray-700">{lead.deletedBy}</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="flex items-center gap-3 px-6 py-4 bg-gray-50/60 border-t border-gray-100">
          <button
            onClick={handleCancel}
            disabled={loading}
            className="flex-1 h-10 rounded-full text-sm font-medium text-gray-600 border border-gray-200 hover:bg-white transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 h-10 rounded-full text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-60"
          >
            {loading ? (
              <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <FiTrash2 size={14} />
            )}
            {loading ? "Deleting..." : "Delete Permanently"}
          </button>
        </div>
      </Modal>
    </>
  );
}
