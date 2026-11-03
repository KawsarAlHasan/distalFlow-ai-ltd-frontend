import React, { useEffect, useState } from "react";
import { Modal, Input, Switch, message, Popconfirm } from "antd";

export default function EditSequenceModal({
  open,
  onClose,
  sequence,
  onSave,
  onDelete,
}) {
  const [name, setName] = useState("");
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (sequence) {
      setName(sequence.name || "");
      setActive(sequence.active ?? true);
    }
  }, [sequence]);

  const handleSave = () => {
    onSave?.({
      ...sequence,
      name,
      active,
    });

    message.success("Sequence updated");
    onClose();
  };

  const handleDelete = () => {
    onDelete?.(sequence);
    message.success("Sequence deleted");
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={420}
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
          okText="Delete"
          cancelText="Cancel"
          okButtonProps={{ danger: true }}
          onConfirm={handleDelete}
        >
          <button className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">
            Delete sequence
          </button>
        </Popconfirm>

        <div className="flex gap-2">
          <button
            onClick={handleCancel}
            className="text-sm font-medium text-gray-600 px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="text-sm font-medium text-white bg-gray-900 px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
}
