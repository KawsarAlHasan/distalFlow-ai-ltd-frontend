import React, { useEffect, useState } from "react";
import { Modal, Input, Switch, Select, message, Popconfirm } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchCampaignsApi } from "../../api/campaignApi";

export default function EditSequenceModal({
  open,
  onClose,
  sequence,
  onSave,
  onDelete,
  loading,
}) {
  const [name, setName] = useState("");
  const [active, setActive] = useState(true);
  const [campaignId, setCampaignId] = useState("");

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
      : []),
  ];

  useEffect(() => {
    if (sequence) {
      setName(sequence.name || "");
      setActive(sequence.active ?? true);
      setCampaignId(sequence.campaignId || "");
    }
  }, [sequence, open]);

  const handleSave = () => {
    if (!name.trim()) {
      message.error("Sequence name cannot be empty");
      return;
    }

    onSave?.({
      id: sequence.id,
      name: name.trim(),
      active,
      campaignId: campaignId || null,
    });
  };

  const handleDelete = () => {
    onDelete?.(sequence.id);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={440}
      centered
      title={<span className="text-[16px] font-semibold">Edit Sequence</span>}
    >
      <div className="flex flex-col gap-4 pt-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-slate-700">
            Sequence name
          </label>

          <Input
            size="large"
            placeholder="Sequence name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onPressEnter={handleSave}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-slate-700">
            Linked Campaign
          </label>

          <Select
            value={campaignId}
            onChange={setCampaignId}
            size="large"
            options={campaignOptions}
          />
        </div>

        <div className="flex justify-between items-center border border-slate-200 rounded-lg px-3.5 py-3">
          <div>
            <div className="text-[13px] font-semibold">Active</div>
            <div className="text-[12px] text-slate-500">
              Pauses automatically when the lead books or opts out
            </div>
          </div>

          <Switch checked={active} onChange={setActive} />
        </div>
      </div>

      {/* Custom Footer */}
      <div className="flex justify-between items-center px-6 py-4 -mx-6 -mb-6 mt-6 bg-gray-50 border-t border-gray-100">
        <Popconfirm
          title="Delete this sequence?"
          description="All steps in this sequence will also be removed."
          okText="Delete"
          cancelText="Cancel"
          okButtonProps={{ danger: true }}
          onConfirm={handleDelete}
        >
          <button
            type="button"
            disabled={loading}
            className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors disabled:opacity-50"
          >
            Delete sequence
          </button>
        </Popconfirm>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="text-sm font-medium text-gray-600 px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="text-sm font-medium text-white bg-gray-900 px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
