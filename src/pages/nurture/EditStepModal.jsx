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
  }, [step]);

  const handleSave = () => {
    onSave &&
      onSave({
        ...step,
        channel,
        wait,
        unit,
        message: msg.trim() || "New nurture message.",
      });
    message.success("Step updated");
    onClose();
  };

  const handleDelete = () => {
    onDelete && onDelete(step);
    message.success("Step removed");
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={handleSave}
      title={
        <div>
          <div className="text-[16px] font-semibold">Edit step</div>
          <div className="text-[13px] text-slate-500 font-normal mt-0.5">
            Update channel, timing and message.
          </div>
        </div>
      }
      okText="Save changes"
      cancelText="Cancel"
      width={460}
      okButtonProps={{ className: "bg-[#0f6f6a] hover:!bg-[#0c5a56]" }}
    footer={
  <div className="flex justify-between items-center w-full">
    <Popconfirm
      title="Remove this step?"
      okText="Remove"
      cancelText="Cancel"
      okButtonProps={{ danger: true }}
      onConfirm={handleDelete}
    >
      <button className="text-[13px] text-red-500 hover:text-red-600 font-medium">
        Delete step
      </button>
    </Popconfirm>

    <div className="flex gap-2">
      <Button onClick={onClose}>
        Cancel
      </Button>

      <Button
        type="primary"
        onClick={handleSave}
        className="bg-[#0f6f6a] hover:!bg-[#0c5a56] border-[#0f6f6a] shadow-none"
      >
        Save changes
      </Button>
    </div>
  </div>
}
      //   footer={(_, { OkBtn, CancelBtn }) => (
      //     <div className="flex justify-between items-center">
      //       <Popconfirm
      //         title="Remove this step?"
      //         okText="Remove"
      //         okButtonProps={{ danger: true }}
      //         onConfirm={handleDelete}
      //       >
      //         <button className="text-[13px] text-red-500 hover:text-red-600 font-medium">
      //           Delete step
      //         </button>
      //       </Popconfirm>
      //       <div className="flex gap-2">
      //         <CancelBtn />
      //         <OkBtn />
      //       </div>
      //     </div>
      //   )}
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
