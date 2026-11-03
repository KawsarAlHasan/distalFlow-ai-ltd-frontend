import React, { useState } from "react";
import { Modal, Input, Select, message } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchCampaignsApi } from "../../api/campaignApi";

export default function NewSequenceModal({ open, onClose, onCreate, loading }) {
  const [name, setName] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [startFrom, setStartFrom] = useState("template");

  // Fetch real campaigns from backend
  const { data: campaigns = [] } = useQuery({
    queryKey: ["campaigns"],
    queryFn: fetchCampaignsApi,
    enabled: open,
  });

  const campaignOptions = [
    { value: "", label: "General / No specific campaign" },
    ...(campaigns && campaigns.length > 0
      ? campaigns.map((c) => ({
          value: c.id,
          label: c.name,
        }))
      : [
          { value: "Dental Implants", label: "Dental Implants" },
          { value: "Invisalign", label: "Invisalign" },
          { value: "Facial Aesthetics", label: "Facial Aesthetics" },
        ]),
  ];

  const handleCreate = () => {
    if (!name.trim()) {
      message.error("Please enter a sequence name");
      return;
    }

    onCreate &&
      onCreate({
        name: name.trim(),
        campaignId: campaignId || null,
        template: startFrom,
      });

    setName("");
    setCampaignId("");
    setStartFrom("template");
  };

  const handleCancel = () => {
    setName("");
    setCampaignId("");
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
              onPressEnter={handleCreate}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">
              Apply to campaign
            </label>

            <Select
              value={campaignId}
              onChange={setCampaignId}
              size="large"
              options={campaignOptions}
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
          type="button"
          onClick={handleCancel}
          disabled={loading}
          className="text-sm font-medium text-gray-600 px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleCreate}
          disabled={loading}
          className="text-sm font-medium text-white bg-gray-900 px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </Modal>
  );
}
