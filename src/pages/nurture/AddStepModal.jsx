import React, { useState } from "react";
import { Modal, Input, InputNumber, Select, message } from "antd";
import { FiCheck } from "react-icons/fi";

const CHANNELS = [
  { key: "sms", label: "SMS" },
  { key: "email", label: "Email" },
  { key: "wa", label: "WhatsApp" },
];

export default function AddStepModal({ open, onClose, onAdd, loading }) {
  const [channel, setChannel] = useState("sms");
  const [wait, setWait] = useState(2);
  const [unit, setUnit] = useState("days");
  const [msg, setMsg] = useState("");

  const handleAdd = () => {
    if (!msg.trim()) {
      message.error("Please enter a message for this step");
      return;
    }

    onAdd &&
      onAdd({
        channel,
        wait: Number(wait) || 0,
        unit,
        message: msg.trim(),
        badge: channel === "wa" ? "Growth+" : null,
      });

    setMsg("");
    setWait(2);
    setUnit("days");
    setChannel("sms");
  };

  const handleCancel = () => {
    setMsg("");
    setWait(2);
    setUnit("days");
    setChannel("sms");
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={null}
      title={
        <div>
          <div className="text-[16px] font-semibold">Add a step</div>
          <div className="text-[13px] text-slate-500 font-normal mt-0.5">
            Choose a channel, timing and message.
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
          onClick={handleAdd}
          disabled={loading}
          className="text-sm font-medium text-white bg-[#0f6f6a] hover:bg-[#0c5a56] px-5 py-2.5 rounded-xl transition-colors disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add step"}
        </button>
      </div>
    </Modal>
  );
}
