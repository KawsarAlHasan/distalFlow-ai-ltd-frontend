import React, { useState } from "react";
import { Modal, Input, Select } from "antd";

export default function NewSequenceModal({ open, onClose, onCreate }) {
  const [name, setName] = useState("");
  const [campaign, setCampaign] = useState("Dental Implants");
  const [startFrom, setStartFrom] = useState("template");

  const handleCreate = () => {
    onCreate &&
      onCreate({
        name,
        campaign,
        startFrom,
      });

    setName("");
    setCampaign("Dental Implants");
    setStartFrom("template");
    onClose();
  };

  const handleCancel = () => {
    setName("");
    setCampaign("Dental Implants");
    setStartFrom("template");
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={420}
      centered
      destroyOnClose
    >
      <div className="py-2">
        {/* Header */}
        <h2 className="text-[18px] font-semibold text-gray-900">
          New sequence
        </h2>

        {/* Body */}
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">
              Sequence name
            </label>
            <Input
              placeholder="e.g. Whitening — default"
              size="large"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">
              Apply to campaign
            </label>

            <Select
              value={campaign}
              onChange={setCampaign}
              size="large"
              options={[
                {
                  value: "Dental Implants",
                  label: "Dental Implants",
                },
                {
                  value: "Invisalign",
                  label: "Invisalign",
                },
                {
                  value: "Facial Aesthetics",
                  label: "Facial Aesthetics",
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">
              Start from
            </label>

            <Select
              value={startFrom}
              onChange={setStartFrom}
              size="large"
              options={[
                {
                  value: "template",
                  label: "Treatment template (recommended)",
                },
                {
                  value: "blank",
                  label: "Blank sequence",
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 px-6 py-4 -mx-6 -mb-6 mt-6 bg-gray-50 border-t border-gray-100">
        <button
          onClick={handleCancel}
          className="text-sm font-medium text-gray-600 px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>

        <button
          onClick={handleCreate}
          className="text-sm font-medium text-white bg-gray-900 px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-colors"
        >
          Create
        </button>
      </div>
    </Modal>
  );
}
