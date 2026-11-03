import React, { useEffect, useState } from "react";
import { Modal, Input, InputNumber, Select, message, Popconfirm, Button } from "antd";
import { FiCheck } from "react-icons/fi";

const CHANNELS = [
  { key: "sms", label: "SMS" },
  { key: "email", label: "Email" },
  { key: "wa", label: "WhatsApp" },
];

export default function EditStepModal({
  open,
  onClose,
  step,
  onSave,
  onDelete,
  loading,
}) {
  const [channel, setChannel] = useState("sms");
  const [wait, setWait] = useState(2);
  const [unit, setUnit] = useState("days");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (step) {
      setChannel(step.channel || "sms");
      setWait(step.wait ?? 2);
      setUnit(step.unit || "days");
      setMsg(step.message || "");
    }
  }, [step, open]);

  const handleSave = () => {
    if (!msg.trim()) {
      message.error("Message cannot be empty");
      return;
    }

    onSave &&
      onSave({
        id: step.id,
        channel,
        wait: Number(wait) || 0,
        unit,
        message: msg.trim(),
        badge: channel === "wa" ? "Growth+" : null,
      });
  };

  const handleDelete = () => {
    onDelete && onDelete(step.id);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={
        <div className="flex justify-between items-center w-full px-6 py-4 -mx-6 -mb-6 mt-6 bg-gray-50 border-t border-gray-100">
          <Popconfirm
            title="Remove this step?"
            okText="Remove"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
            onConfirm={handleDelete}
          >
            <button
              type="button"
              disabled={loading}
              className="text-[13px] text-red-500 hover:text-red-600 font-medium disabled:opacity-50"
            >
              Delete step
            </button>
          </Popconfirm>

          <div className="flex gap-2">
            <Button onClick={onClose} disabled={loading}>
              Cancel
            </Button>

            <Button
              type="primary"
              onClick={handleSave}
              loading={loading}
              className="bg-[#0f6f6a] hover:!bg-[#0c5a56] border-[#0f6f6a] shadow-none"
            >
              Save changes
            </Button>
          </div>
        </div>
      }
      title={
        <div>
          <div className="text-[16px] font-semibold">Edit step</div>
          <div className="text-[13px] text-slate-500 font-normal mt-0.5">
            Update channel, timing and message.
          </div>
        </div>
      }
      width={460}
      centered
    >
      <div className="flex flex-col gap-4 pt-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-slate-700">
            Channel
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {CHANNELS.map((c) => (
              <div
                key={c.key}
                onClick={() => setChannel(c.key)}
                className={`flex items-center gap-2 border rounded-lg px-3 py-2.5 cursor-pointer transition-colors ${
                  channel === c.key
                    ? "border-[#0f6f6a] bg-[#eef7f6]"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded grid place-items-center border ${
                    channel === c.key
                      ? "bg-[#0f6f6a] border-[#0f6f6a] text-white"
                      : "border-slate-300"
                  }`}
                >
                  {channel === c.key && <FiCheck size={11} />}
                </span>
                <b className="text-[13px]">{c.label}</b>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">
              Wait
            </label>
            <InputNumber
              className="w-full"
              min={0}
              value={wait}
              onChange={(v) => setWait(v)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">
              Unit
            </label>
            <Select
              value={unit}
              onChange={setUnit}
              options={[
                { value: "days", label: "days" },
                { value: "hours", label: "hours" },
              ]}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-slate-700">
            Message
          </label>
          <Input.TextArea
            rows={4}
            placeholder="Use {name} to personalise…"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
}
