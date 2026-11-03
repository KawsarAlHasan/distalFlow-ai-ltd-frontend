import React, { useState } from "react";
import { Plus, X, ChevronRight, Check, Facebook, Search } from "lucide-react";

const STEPS = [1, 2, 3];

function Stepper({ current }) {
  return (
    <div className="flex items-center gap-2">
      {STEPS.map((step, idx) => (
        <React.Fragment key={step}>
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold transition-colors
              ${
                step < current
                  ? "bg-neutral-900 text-white"
                  : step === current
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 text-neutral-400"
              }`}
          >
            {step < current ? <Check size={12} strokeWidth={3} /> : step}
          </div>
          {idx < STEPS.length - 1 && (
            <div
              className={`h-[2px] w-8 rounded-full transition-colors ${
                step < current ? "bg-neutral-900" : "bg-neutral-200"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function Field({ label, children, optional }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-neutral-700">
        {label}
        {optional && (
          <span className="ml-1 font-normal text-neutral-400">(Optional)</span>
        )}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900";

function SectionLabel({ children }) {
  return (
    <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
      {children}
    </p>
  );
}

export default function NewAdsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [platform, setPlatform] = useState("meta");

  const [interests, setInterests] = useState(["Cosmetic dentistry", "Teeth whitening"]);
  const [locations, setLocations] = useState(["London, UK"]);

  const open = () => {
    setStep(1);
    setIsOpen(true);
  };
  const close = () => setIsOpen(false);

  const next = () => setStep((s) => Math.min(3, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const removeChip = (list, setList, value) =>
    setList(list.filter((v) => v !== value));

  return (
    <div className="font-sans">
      <button
        onClick={open}
        className="flex items-center gap-1.5 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
      >
        <Plus size={16} strokeWidth={2.5} />
        New ads
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={close}
        >
          <div
            className="flex max-h-[90vh] w-full max-w-[520px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-900">
                  <Plus size={16} className="text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-[15px] font-semibold text-neutral-900">
                    Create New Ad
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Step {step} of 3: Platform &amp; Setup
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Stepper current={step} />
                <button
                  onClick={close}
                  className="text-neutral-400 transition-colors hover:text-neutral-700"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {/* Platform selector — always visible */}
              <div className="mb-6">
                <SectionLabel>Select Platform</SectionLabel>
                <div className="flex gap-3">
                  <button
                    onClick={() => setPlatform("meta")}
                    className={`flex flex-1 items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                      platform === "meta"
                        ? "border-blue-500 bg-blue-50/50 text-neutral-900"
                        : "border-neutral-200 text-neutral-500 hover:border-neutral-300"
                    }`}
                  >
                    <Facebook
                      size={16}
                      className={platform === "meta" ? "text-blue-600" : "text-neutral-400"}
                      fill={platform === "meta" ? "currentColor" : "none"}
                    />
                    Meta (Facebook/IG)
                  </button>
                  <button
                    onClick={() => setPlatform("google")}
                    className={`flex flex-1 items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                      platform === "google"
                        ? "border-blue-500 bg-blue-50/50 text-neutral-900"
                        : "border-neutral-200 text-neutral-500 hover:border-neutral-300"
                    }`}
                  >
                    <Search
                      size={15}
                      className={platform === "google" ? "text-blue-600" : "text-neutral-400"}
                    />
                    Google Search
                  </button>
                </div>
              </div>

              {/* STEP 1 */}
              {step === 1 && (
                <div className="flex flex-col gap-4">
                  <Field label="Ad Account">
                    <select className={inputClass}>
                      <option>Bright Smile Ads</option>
                    </select>
                  </Field>

                  <Field label="Campaign Objective">
                    <select className={inputClass}>
                      <option>Leads</option>
                      <option>Awareness</option>
                      <option>Traffic</option>
                    </select>
                  </Field>

                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Pixel">
                      <select className={inputClass}>
                        <option>Pixel - 192837465</option>
                      </select>
                    </Field>
                    <Field label="Conversion Event">
                      <select className={inputClass}>
                        <option>Lead</option>
                        <option>Purchase</option>
                      </select>
                    </Field>
                  </div>

                  <div className="my-1 border-t border-neutral-100" />
                  <SectionLabel>Budget &amp; Schedule</SectionLabel>

                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Budget Type">
                      <select className={inputClass}>
                        <option>Daily</option>
                        <option>Lifetime</option>
                      </select>
                    </Field>
                    <Field label="Amount ($)">
                      <input className={inputClass} defaultValue="20" />
                    </Field>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Start Date">
                      <input type="date" className={inputClass} defaultValue="2026-04-30" />
                    </Field>
                    <Field label="End Date" optional>
                      <input type="date" className={inputClass} defaultValue="2026-05-30" />
                    </Field>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="flex flex-col gap-4">
                  <SectionLabel>Audience Targeting</SectionLabel>

                  <Field label="Locations">
                    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2">
                      {locations.map((loc) => (
                        <span
                          key={loc}
                          className="flex items-center gap-1 rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700"
                        >
                          {loc}
                          <button onClick={() => removeChip(locations, setLocations, loc)}>
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </Field>

                  <div className="grid grid-cols-3 gap-3">
                    <Field label="Min Age">
                      <input className={inputClass} defaultValue="18" />
                    </Field>
                    <Field label="Max Age">
                      <input className={inputClass} defaultValue="60" />
                    </Field>
                    <Field label="Gender">
                      <select className={inputClass}>
                        <option>Male</option>
                        <option>Female</option>
                        <option>All</option>
                      </select>
                    </Field>
                  </div>

                  <Field label="Detailed Targeting (Interests)">
                    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2">
                      {interests.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700"
                        >
                          {tag}
                          <button onClick={() => removeChip(interests, setInterests, tag)}>
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </Field>

                  <div className="my-1 border-t border-neutral-100" />
                  <SectionLabel>Placements</SectionLabel>

                  <label className="flex items-center gap-2 text-sm text-neutral-700">
                    <input type="checkbox" className="h-4 w-4 rounded border-neutral-300" />
                    Advantage+ placements (Recommended)
                  </label>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="flex flex-col gap-4">
                  <SectionLabel>Ad Creative</SectionLabel>

                  <Field label="Primary Text">
                    <textarea
                      rows={3}
                      placeholder="Tell people what your ad is about..."
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Headline">
                    <input placeholder="Catchy headline" className={inputClass} />
                  </Field>

                  <Field label="Description">
                    <input placeholder="Additional details" className={inputClass} />
                  </Field>

                  <Field label="Ad Creative (Image URL)">
                    <input placeholder="https://..." className={inputClass} />
                  </Field>

                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Call to Action">
                      <select className={inputClass}>
                        <option>Book Now</option>
                        <option>Learn More</option>
                        <option>Sign Up</option>
                      </select>
                    </Field>
                    <Field label="Destination URL">
                      <input placeholder="https://..." className={inputClass} />
                    </Field>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-neutral-100 px-6 py-4">
              <button
                onClick={step === 1 ? close : back}
                className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-neutral-700"
              >
                {step === 1 ? "Cancel" : "Back"}
              </button>
              <button
                onClick={step === 3 ? close : next}
                className="flex items-center gap-1 rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
              >
                {step === 3 ? "Create Ad" : "Next"}
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}