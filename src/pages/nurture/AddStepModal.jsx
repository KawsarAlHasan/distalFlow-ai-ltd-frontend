import React, { useState } from "react";
import { Modal, Input, InputNumber, Select, message } from "antd";
import { FiCheck } from "react-icons/fi";

const CHANNELS = [
  { key: "sms", label: "SMS" },
  { key: "email", label: "Email" },
  { key: "wa", label: "WhatsApp" },
];

export default function AddStepModal({ open, onClose, onAdd }) {
  const [channel, setChannel] = useState("sms");
  const [wait, setWait] = useState(2);
  const [unit, setUnit] = useState("days");
  const [msg, setMsg] = useState("");

  const handleAdd = () => {
    onAdd &&
      onAdd({
        channel,
        wait,
        unit,
        message: msg.trim() || "New nurture message.",
      });
    setMsg("");
    message.success("Step added to sequence");
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={handleAdd}
      title={
        <div>
          <div className="text-[16px] font-semibold">Add a step</div>
          <div className="text-[13px] text-slate-500 font-normal mt-0.5">
            Choose a channel, timing and message.
          </div>
        </div>
      }
      okText="Add step"
      cancelText="Cancel"
      width={460}
      okButtonProps={{ className: "bg-[#0f6f6a] hover:!bg-[#0c5a56]" }}
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