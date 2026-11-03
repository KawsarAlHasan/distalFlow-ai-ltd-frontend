import { useState } from "react";
import { Modal, Input, Button, message } from "antd";
import { FiAlertTriangle, FiTrash2, FiClock, FiX } from "react-icons/fi";

/**
 * DeleteModal
 *
 * Reusable GDPR data deletion confirmation modal.
 * Usage:
 *
 *   const [open, setOpen] = useState(false);
 *
 *   <DeleteModal
 *     open={open}
 *     onClose={() => setOpen(false)}
 *     patientName="John Doe"
 *     patientId="pat_123"
 *     onConfirmDelete={async (patientId) => {
 *       // call your API here to create the deletion request
 *       await api.post(`/patients/${patientId}/deletion-request`);
 *     }}
 *   />
 */
const DeleteModal = ({ open, onClose, patientName, patientId, onConfirmDelete }) => {
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("confirm"); // "confirm" | "success"

  const isMatch =
    confirmText.trim() === patientName?.trim() ||
    confirmText.trim().toUpperCase() === "DELETE";

  const resetAndClose = () => {
    setConfirmText("");
    setStep("confirm");
    onClose();
  };

  const handleConfirm = async () => {
    if (!isMatch) {
      message.error("Please type the patient's name or DELETE to confirm.");
      return;
    }

    setLoading(true);
    try {
      if (onConfirmDelete) {
        await onConfirmDelete(patientId);
      }
      setStep("success");
    } catch (error) {
      message.error(
        error?.response?.data?.message ||
          "Failed to create deletion request. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={resetAndClose}
      footer={null}
      centered
      closeIcon={<FiX className="text-gray-400" />}
      className="gdpr-delete-modal"
      width={480}
    >
      {step === "confirm" ? (
        <div className="pt-2">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50">
              <FiAlertTriangle className="text-red-600" size={20} />
            </div>
            <h3 className="text-[18px] font-semibold text-gray-900 m-0">
              Delete Patient Data
            </h3>
          </div>

          {/* Warning body */}
          <p className="text-[14px] text-gray-600 leading-relaxed mb-3">
            You are about to request permanent deletion of all data for{" "}
            <strong className="text-gray-900">{patientName}</strong>. This
            includes the patient record, call recordings, transcripts,
            conversation history, documents, and lead records.
          </p>

          {/* 24hr hold notice */}
          <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 p-3 mb-4">
            <FiClock className="text-amber-600 mt-0.5 flex-shrink-0" size={16} />
            <p className="text-[13px] text-amber-800 leading-relaxed m-0">
              This request will enter a <strong>24-hour cancellable hold</strong>{" "}
              before permanent deletion is executed. You can cancel the
              request at any point during this window.
            </p>
          </div>

          {/* Confirm input */}
          <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
            Type <span className="font-bold">{patientName}</span> or{" "}
            <span className="font-bold">DELETE</span> to confirm
          </label>
          <Input
            size="large"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder={`Type "${patientName}" or "DELETE"`}
            className="rounded-lg mb-5"
          />

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button size="large" onClick={resetAndClose} className="rounded-lg">
              Cancel
            </Button>
            <Button
              size="large"
              danger
              type="primary"
              icon={<FiTrash2 size={14} />}
              loading={loading}
              disabled={!isMatch}
              onClick={handleConfirm}
              className="rounded-lg"
            >
              Request Deletion
            </Button>
          </div>
        </div>
      ) : (
        <div className="pt-2 text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-50 mx-auto mb-4">
            <FiClock className="text-green-600" size={22} />
          </div>
          <h3 className="text-[18px] font-semibold text-gray-900 mb-2">
            Deletion Request Submitted
          </h3>
          <p className="text-[14px] text-gray-600 leading-relaxed mb-6">
            A 24-hour hold period has started for{" "}
            <strong className="text-gray-900">{patientName}</strong>. Data
            will be permanently deleted after the hold expires unless
            cancelled. An audit record will be emailed once deletion is
            executed.
          </p>
          <Button
            size="large"
            type="primary"
            onClick={resetAndClose}
            className="rounded-lg"
          >
            Close
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default DeleteModal;