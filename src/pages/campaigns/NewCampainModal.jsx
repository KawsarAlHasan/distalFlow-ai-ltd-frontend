import React, { useState } from "react";
import { Modal, Upload, message } from "antd";
import {
  FiPlus,
  FiX,
  FiUploadCloud,
  FiStar,
  FiUsers,
  FiFilm,
  FiTrash2,
  FiRefreshCw,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { createCampaignApi } from "../../api/campaignApi";
import { API } from "../../api/api";

function Field({
  label,
  required,
  placeholder,
  textarea,
  defaultValue,
  value,
  onChange,
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-2">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {textarea ? (
        <textarea
          rows={3}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          className="w-full text-sm border border-gray-200 rounded-lg px-3.5 py-2.5 text-gray-700 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-900/10 resize-none"
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          className="w-full text-sm border border-gray-200 rounded-lg px-3.5 py-2.5 text-gray-700 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-900/10"
        />
      )}
    </div>
  );
}

const STEPS = ["Campaign details", "Doctor & reviews", "AI video"];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center gap-2 px-6 pt-5">
      {STEPS.map((label, i) => {
        const idx = i + 1;
        const active = idx === current;
        const done = idx < current;
        return (
          <React.Fragment key={label}>
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-colors ${
                  done
                    ? "bg-gray-900 text-white"
                    : active
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {idx}
        </div>
              <span
                className={`text-xs font-medium hidden sm:block ${
                  active ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {label}
              </span>
        </div>
            {idx !== STEPS.length && (
              <div className="flex-1 h-px bg-gray-200 min-w-[12px]" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function ImageUploader({ preview, onChange }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-2">
        Doctor photo
      </label>
      <Upload
        showUploadList={false}
        beforeUpload={(file) => {
          const reader = new FileReader();
          reader.onload = (e) => onChange(e.target.result);
          reader.readAsDataURL(file);
          return false;
        }}
        accept="image/*"
      >
        <div className="w-full border border-dashed border-gray-200 rounded-lg px-3.5 py-4 flex items-center gap-3 cursor-pointer hover:border-gray-300 transition-colors">
          {preview ? (
            <img
              src={preview}
              alt="Doctor preview"
              className="w-12 h-12 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
              <FiUploadCloud className="text-gray-400" size={18} />
        </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-700">
              {preview ? "Replace photo" : "Upload a photo"}
            </p>
            <p className="text-xs text-gray-400">PNG or JPG, up to 5MB</p>
        </div>
        </div>
      </Upload>
    </div>
  );
}

function formatBytes(bytes) {
  if (!bytes && bytes !== 0) return "";
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(0)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
}

function VideoUploadCard({ file, name, size, url, onReplace, onRemove }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      {/* File meta row */}
      <div className="flex items-center justify-between gap-3 px-3.5 py-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
            <FiFilm className="text-gray-500" size={14} />
        </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-800 truncate max-w-[220px]">
              {name}
            </p>
            <p className="text-[11px] text-gray-400">
              {formatBytes(size)} · Review before confirming
            </p>
        </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={onReplace}
            title="Replace video"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <FiRefreshCw size={13} />
          </button>
          <button
            type="button"
            onClick={onRemove}
            title="Remove video"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <FiTrash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NewCampaignModal({ onSuccess }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    // Step 1
    campaignName: "",
    headline: "A brighter smile in one visit",
    bodyCopy:
      "Permanent, natural-looking dental implants placed by our award-winning Oxford team. Book your free consultation.",
    cta: "Request my free consultation",
    aiGreeting:
      "Hi, this is Bright Smile Dental calling about your dental implant enquiry. Is now a good time for a quick chat?",
    // Step 2
    rating: "4.9",
    patientCount: "340",
    doctorImage: null,
    doctorName: "",
    doctorQualification: "",
    doctorDescription: "",
    // Step 3
    consent: false,
    sourceVideo: null,
    sourceVideoName: "",
    sourceVideoSize: 0,
    sourceVideoUrl: "",
    videoScript: "",
    videoApproved: false,
  });

  const [generating, setGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState("");

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e?.target ? e.target.value : e }));

  const resetAndClose = () => {
    setIsModalOpen(false);
    setStep(1);
    setGenerating(false);
    setGeneratedVideoUrl("");
  };

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => resetAndClose();

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleGenerateVideo = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      // Placeholder: reuse the source video as the "generated" preview
      setGeneratedVideoUrl(form.sourceVideoUrl);
    }, 3000);
  };

  const handleChangeVideo = () => {
    setGeneratedVideoUrl("");
    setForm((f) => ({ ...f, videoApproved: false }));
  };

  const handleApproveVideo = () => {
    setForm((f) => ({ ...f, videoApproved: true }));
  };

  const clearSourceVideo = () => {
    if (form.sourceVideoUrl) URL.revokeObjectURL(form.sourceVideoUrl);
    setForm((f) => ({
      ...f,
      sourceVideo: null,
      sourceVideoName: "",
      sourceVideoSize: 0,
      sourceVideoUrl: "",
      consent: false,
      videoApproved: false,
    }));
    setGeneratedVideoUrl("");
    setGenerating(false);
  };

  const handleUploadVideo = (file) => {
    if (form.sourceVideoUrl) URL.revokeObjectURL(form.sourceVideoUrl);
    const url = URL.createObjectURL(file);
    setForm((f) => ({
      ...f,
      sourceVideo: file,
      sourceVideoName: file.name,
      sourceVideoSize: file.size,
      sourceVideoUrl: url,
      consent: false,
      videoApproved: false,
    }));
    setGeneratedVideoUrl("");
    return false;
  };

  const handleCreate = async () => {
    try {
      const payload = {
        name: form.campaignName,
        headline: form.headline || "A brighter smile in one visit",
        bodyCopy:
          form.bodyCopy ||
          "Permanent, natural-looking dental implants placed by our award-winning Oxford team.",
        cta: form.cta || "Claim my free consultation",
        aiGreeting:
          form.aiGreeting ||
          "Hi, this is Bright Smile Dental calling about your enquiry.",
        rating: Number(form.rating) || 4.9,
        patientCount: Number(form.patientCount) || 340,
        showDoctorSection: Boolean(form.doctorName),
        doctorName: form.doctorName || undefined,
        doctorQualification: form.doctorQualification || undefined,
        doctorDescription: form.doctorDescription || undefined,
        doctorImageUrl: form.doctorPhotoPreview || undefined,
        showVideoSection: Boolean(form.videoApproved),
        consent: form.consent,
        sourceVideoUrl: form.sourceVideoUrl || undefined,
        sourceVideoName: form.sourceVideoName || undefined,
        sourceVideoSize: form.sourceVideoSize || undefined,
        videoScript: form.videoScript || undefined,
        generatedVideoUrl: generatedVideoUrl || undefined,
        videoApproved: form.videoApproved,
      };

      await createCampaignApi(payload);
      message.success("Campaign created successfully!");

      resetAndClose();
    } catch (error) {
      console.error(error);
      message.error(
        error?.response?.data?.message || "Failed to create campaign"
      );
    }
  };

  const nextDisabled =
    (step === 1 && !form.campaignName.trim()) ||
    (step === 3 && !form.videoApproved);

  return (
    <div>
      <button
        type="button"
        onClick={showModal}
        className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-gray-800 transition-colors shrink-0"
      >
        <FiPlus size={14} />
        New campaign
      </button>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        closable={false}
        width={520}
        styles={{
          content: { padding: 0, borderRadius: 20, overflow: "hidden" },
        }}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 relative">
          <button
            onClick={handleCancel}
            className="absolute top-6 right-6 text-gray-300 hover:text-gray-500 transition-colors"
          >
            <FiX size={20} />
          </button>
          <h2 className="font-serif text-xl text-gray-900 mb-1">
            Create a campaign
          </h2>
          <p className="text-xs text-gray-400">
            {step === 1 &&
              "You can refine the landing page and AI script after creating."}
            {step === 2 &&
              "Add social proof and the doctor's profile for the landing page."}
            {step === 3 &&
              "Record a short talking-head video to power the AI avatar."}
          </p>
        </div>

        <StepIndicator current={step} />

        {/* Body */}
        <div className="px-6 py-6 flex flex-col gap-5 max-h-[55vh] overflow-y-auto">
          {step === 1 && (
            <>
              <Field
                label="Treatment / campaign name"
                required
                placeholder="e.g. Teeth Whitening"
                value={form.campaignName}
                onChange={set("campaignName")}
              />
              <Field
                label="Landing page headline"
                placeholder="A brighter smile in one visit"
                value={form.headline}
                onChange={set("headline")}
              />
              <Field
                label="Body copy"
                textarea
                value={form.bodyCopy}
                onChange={set("bodyCopy")}
              />
              <Field
                label="Call-to-action button"
                placeholder="Request my free consultation"
                value={form.cta}
                onChange={set("cta")}
              />
              <Field
                label="AI greeting (spoken under the clinic's name)"
                textarea
                value={form.aiGreeting}
                onChange={set("aiGreeting")}
              />
            </>
          )}

          {step === 2 && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Rating
                  </label>
                  <div className="relative">
                    <FiStar
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400"
                      size={14}
                    />
                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder="4.9"
                      value={form.rating}
                      onChange={set("rating")}
                      className="w-full text-sm border border-gray-200 rounded-lg pl-9 pr-3.5 py-2.5 text-gray-700 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-900/10"
                    />
        </div>
        </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Patients rated
                  </label>
                  <div className="relative">
                    <FiUsers
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                      size={14}
                    />
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="340"
                      value={form.patientCount}
                      onChange={set("patientCount")}
                      className="w-full text-sm border border-gray-200 rounded-lg pl-9 pr-3.5 py-2.5 text-gray-700 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-900/10"
                    />
        </div>
        </div>
        </div>

              <ImageUploader
                preview={form.doctorImage}
                onChange={(dataUrl) =>
                  setForm((f) => ({ ...f, doctorImage: dataUrl }))
                }
              />

              <Field
                label="Doctor name"
                placeholder="e.g. Dr. Sarah Whitfield"
                value={form.doctorName}
                onChange={set("doctorName")}
              />
              <Field
                label="Qualification"
                placeholder="e.g. BDS, MFDS RCS, GDC 123456"
                value={form.doctorQualification}
                onChange={set("doctorQualification")}
              />
              <Field
                label="Description"
                textarea
                placeholder="Short bio shown on the landing page"
                value={form.doctorDescription}
                onChange={set("doctorDescription")}
              />
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Source video (2–3 min talking-head)
                </label>

                {!form.sourceVideo ? (
                  <Upload
                    showUploadList={false}
                    accept="video/*"
                    beforeUpload={handleUploadVideo}
                  >
                    <div className="w-[460px] border border-dashed border-gray-200 rounded-xl px-3.5 py-8 flex flex-col items-center justify-center gap-2.5 cursor-pointer hover:border-gray-300 hover:bg-gray-50/50 transition-colors text-center">
                      <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center">
                        <FiUploadCloud className="text-gray-400" size={20} />
        </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Upload or record a video
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Used to generate the clinic's AI avatar (HeyGen) ·
                          MP4, up to 500MB
                        </p>
        </div>
        </div>
                  </Upload>
                ) : (
                  <VideoUploadCard
                    file={form.sourceVideo}
                    name={form.sourceVideoName}
                    size={form.sourceVideoSize}
                    url={form.sourceVideoUrl}
                    onRemove={clearSourceVideo}
                    onReplace={() =>
                      document.getElementById("replace-video-input")?.click()
                    }
                  />
                )}

                {/* Hidden input used only for the "replace" action on an existing video */}
                <input
                  id="replace-video-input"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUploadVideo(file);
                    e.target.value = "";
                  }}
                />
        </div>

              {/* NEW: Script field for the video */}
              <Field
                label="Script"
                textarea
                placeholder="Write the exact lines the avatar should say in the video…"
                value={form.videoScript}
                onChange={set("videoScript")}
              />

              <label
                className={`flex items-start gap-2.5 ${
                  form.sourceVideo
                    ? "cursor-pointer"
                    : "cursor-not-allowed opacity-50"
                }`}
              >
                <input
                  type="checkbox"
                  disabled={!form.sourceVideo}
                  checked={form.consent}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setForm((f) => ({
                      ...f,
                      consent: checked,
                      videoApproved: checked ? f.videoApproved : false,
                    }));
                    if (!checked) {
                      setGeneratedVideoUrl("");
                      setGenerating(false);
                    }
                  }}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900/10"
                />
                <span className="text-xs text-gray-600 leading-relaxed">
                  I consent to my likeness and voice being used to generate AI
                  video content on behalf of my clinic on the DistalFlo
                  platform.
                </span>
              </label>

              {!generatedVideoUrl && (
                <button
                  type="button"
                  disabled={!form.consent || generating}
                  onClick={handleGenerateVideo}
                  className="w-full text-sm font-medium text-white bg-gray-900 px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {generating ? "Generating Avatar…" : "Generate Avatar"}
                </button>
              )}

              {generating && (
                <div className="flex flex-col items-center justify-center gap-2 py-6 border border-gray-100 rounded-lg bg-gray-50">
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
                  <p className="text-xs text-gray-500">
                    Rendering AI avatar video…
                  </p>
        </div>
              )}

              {generatedVideoUrl && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Generated video
                  </label>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <video
                      src={generatedVideoUrl}
                      controls
                      className="w-full max-h-56 bg-black block"
                    />
        </div>
                  {form.videoApproved ? (
                    <div className="mt-3 flex items-center gap-2 text-xs font-medium text-green-700 bg-green-50 border border-green-100 rounded-lg px-3.5 py-2.5">
                      Video approved
        </div>
                  ) : (
                    <div className="mt-3 flex gap-3">
                      <button
                        type="button"
                        onClick={handleChangeVideo}
                        className="flex-1 text-sm font-medium text-gray-600 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors"
                      >
                        Re generate
                      </button>
                      <button
                        type="button"
                        onClick={handleApproveVideo}
                        className="flex-1 text-sm font-medium text-white bg-gray-900 px-4 py-2.5 rounded-xl hover:bg-gray-800 transition-colors"
                      >
                        Approve video
                      </button>
        </div>
                  )}
        </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button
            onClick={step === 1 ? handleCancel : handleBack}
            className="text-sm font-medium text-gray-600 px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            {step === 1 ? "Cancel" : "Back"}
          </button>
          <button
            disabled={nextDisabled}
            onClick={step === 3 ? handleCreate : handleNext}
            className="text-sm font-medium text-white bg-gray-900 px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {step === 3 ? "Create campaign" : "Continue"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
