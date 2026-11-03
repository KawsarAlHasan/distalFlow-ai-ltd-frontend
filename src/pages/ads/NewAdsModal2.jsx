import React, { useState } from "react";
import {
  Plus,
  X,
  ChevronRight,
  Check,
  Facebook,
  Search,
  Sparkles,
  Image as ImageIcon,
  Film,
  Layers,
} from "lucide-react";

const STEPS = [1, 2, 3];

// Treatment type -> AI recommended default Meta/Google budget split
const TREATMENT_SPLIT_MAP = {
  "Cosmetic Dentistry": { meta: 60, google: 40 },
  "Teeth Whitening": { meta: 70, google: 30 },
  "Dental Implants": { meta: 35, google: 65 },
  "Orthodontics / Invisalign": { meta: 55, google: 45 },
  "Emergency Dental": { meta: 20, google: 80 },
};

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

function SectionLabel({ children, icon }) {
  return (
    <p className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
      {icon}
      {children}
    </p>
  );
}

// Small char-counter input used in creative generation section
function LimitedField({ label, value, onChange, limit, placeholder, textarea }) {
  const len = value.length;
  const over = len > limit;
  const Comp = textarea ? "textarea" : "input";
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-[13px] font-medium text-neutral-700">{label}</label>
        <span className={`text-[11px] font-medium ${over ? "text-red-500" : "text-neutral-400"}`}>
          {len}/{limit}
        </span>
      </div>
      <Comp
        rows={textarea ? 2 : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${inputClass} ${over ? "border-red-400 focus:border-red-500 focus:ring-red-500" : ""}`}
      />
    </div>
  );
}

export default function NewAdsModal2() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  // "meta" | "google" | "both"
  const [platform, setPlatform] = useState("meta");
  const usesMeta = platform === "meta" || platform === "both";
  const usesGoogle = platform === "google" || platform === "both";

  const [treatmentType, setTreatmentType] = useState("Cosmetic Dentistry");

  const recommendedSplit = TREATMENT_SPLIT_MAP[treatmentType] || { meta: 50, google: 50 };
  const [budgetSplit, setBudgetSplit] = useState(recommendedSplit.meta);
  const [useAiSplit, setUseAiSplit] = useState(true);

  const effectiveMetaSplit = useAiSplit ? recommendedSplit.meta : budgetSplit;
  const effectiveGoogleSplit = 100 - effectiveMetaSplit;

  const [totalBudget, setTotalBudget] = useState(20);

  const [interests, setInterests] = useState(["Cosmetic dentistry", "Teeth whitening"]);
  const [locations, setLocations] = useState(["London, UK"]);

  // Meta-specific
  const [metaPlacements, setMetaPlacements] = useState(["Feed"]);
  const [metaFormat, setMetaFormat] = useState("single_image");
  const [ageRadius, setAgeRadius] = useState({ min: 18, max: 60, radius: 15 });

  // Google-specific
  const [keywords, setKeywords] = useState(["dental implants near me", "teeth whitening clinic"]);
  const [googleGeoRadius, setGoogleGeoRadius] = useState(15);
  const [googleNetworks, setGoogleNetworks] = useState(["Search"]);

  // Creative - Meta
  const [metaHeadline, setMetaHeadline] = useState("Get Your Dream Smile Today");
  const [metaBody, setMetaBody] = useState("Book a free consultation with our top-rated dental team.");

  // Creative - Google RSA
  const [googleHeadlines, setGoogleHeadlines] = useState([
    "Top Dental Clinic Near You",
    "Book Free Consultation",
    "Trusted by 1000+ Patients",
  ]);
  const [googleDescriptions, setGoogleDescriptions] = useState([
    "Expert dental care with flexible appointments. Book your visit online today.",
    "Modern clinic, experienced dentists. Call now or book your consultation online.",
  ]);

  const open = () => {
    setStep(1);
    setIsOpen(true);
  };
  const close = () => setIsOpen(false);

  const next = () => setStep((s) => Math.min(3, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const removeChip = (list, setList, value) =>
    setList(list.filter((v) => v !== value));

  const addChip = (list, setList, value) => {
    const v = value.trim();
    if (v && !list.includes(v)) setList([...list, v]);
  };

  const togglePlacement = (p) => {
    setMetaPlacements((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const toggleNetwork = (n) => {
    setGoogleNetworks((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]
    );
  };

  const updateArrayField = (arr, setArr, idx, value) => {
    const copy = [...arr];
    copy[idx] = value;
    setArr(copy);
  };

  const metaBudgetAmount = usesGoogle && usesMeta
    ? ((totalBudget * effectiveMetaSplit) / 100).toFixed(2)
    : totalBudget;
  const googleBudgetAmount = usesGoogle && usesMeta
    ? ((totalBudget * effectiveGoogleSplit) / 100).toFixed(2)
    : totalBudget;

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
            className="flex max-h-[90vh] w-full max-w-[620px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
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
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
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
                    Meta
                  </button>
                  <button
                    onClick={() => setPlatform("google")}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                      platform === "google"
                        ? "border-blue-500 bg-blue-50/50 text-neutral-900"
                        : "border-neutral-200 text-neutral-500 hover:border-neutral-300"
                    }`}
                  >
                    <Search
                      size={15}
                      className={platform === "google" ? "text-blue-600" : "text-neutral-400"}
                    />
                    Google Ads
                  </button>
                  <button
                    onClick={() => setPlatform("both")}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                      platform === "both"
                        ? "border-blue-500 bg-blue-50/50 text-neutral-900"
                        : "border-neutral-200 text-neutral-500 hover:border-neutral-300"
                    }`}
                  >
                    <Layers
                      size={15}
                      className={platform === "both" ? "text-blue-600" : "text-neutral-400"}
                    />
                    Both
                  </button>
                </div>
              </div>

              {/* STEP 1 */}
              {step === 1 && (
                <div className="flex flex-col gap-4">
                  {usesMeta && (
                    <Field label="Meta Ad Account">
                      <select className={inputClass}>
                        <option>Bright Smile Ads</option>
                      </select>
                    </Field>
                  )}

                  {/* {usesMeta && (
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Facebook Business Manager ID">
                        <input
                          className={inputClass}
                          placeholder="e.g. 123456789012345"
                          value={fbBusinessManagerId}
                          onChange={(e) => setFbBusinessManagerId(e.target.value)}
                        />
                      </Field>
                      <Field label="Meta Ad Account ID">
                        <input
                          className={inputClass}
                          placeholder="act_1234567890"
                          value={metaAdAccountId}
                          onChange={(e) => setMetaAdAccountId(e.target.value)}
                        />
                      </Field>
                    </div>
                  )} */}

                  {/* {usesGoogle && (
                    <Field label="Google Ads Account ID">
                      <input
                        className={inputClass}
                        placeholder="123-456-7890"
                        value={googleAdAccountId}
                        onChange={(e) => setGoogleAdAccountId(e.target.value)}
                      />
                    </Field>
                  )} */}

                  <Field label="Campaign Objective">
                    <select className={inputClass}>
                      <option>Leads</option>
                      <option>Awareness</option>
                      <option>Traffic</option>
                    </select>
                  </Field>

                  <Field label="Treatment Type">
                    <select
                      className={inputClass}
                      value={treatmentType}
                      onChange={(e) => setTreatmentType(e.target.value)}
                    >
                      {Object.keys(TREATMENT_SPLIT_MAP).map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </Field>

                  {usesMeta && (
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
                  )}

                  <div className="my-1 border-t border-neutral-100" />
                  <SectionLabel>Budget &amp; Schedule</SectionLabel>

                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Budget Type">
                      <select className={inputClass}>
                        <option>Daily</option>
                        <option>Lifetime</option>
                      </select>
                    </Field>
                    <Field label="Total Amount ($)">
                      <input
                        className={inputClass}
                        value={totalBudget}
                        onChange={(e) => setTotalBudget(Number(e.target.value) || 0)}
                      />
                    </Field>
                  </div>

                  {/* Budget split control — only when both platforms selected */}
                  {usesMeta && usesGoogle && (
                    <div className="rounded-xl border border-neutral-200 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Sparkles size={14} className="text-amber-500" />
                          <p className="text-[13px] font-semibold text-neutral-800">
                            Budget Split
                          </p>
                        </div>
                        <button
                          onClick={() => setUseAiSplit((v) => !v)}
                          className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                            useAiSplit
                              ? "bg-neutral-900 text-white"
                              : "bg-neutral-100 text-neutral-500"
                          }`}
                        >
                          {useAiSplit ? "AI Recommended" : "Manual"}
                        </button>
                      </div>

                      <div className="mb-2 flex items-center justify-between text-xs font-medium text-neutral-500">
                        <span>Meta {effectiveMetaSplit}% (${metaBudgetAmount})</span>
                        <span>Google {effectiveGoogleSplit}% (${googleBudgetAmount})</span>
                      </div>

                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={effectiveMetaSplit}
                        disabled={useAiSplit}
                        onChange={(e) => {
                          setUseAiSplit(false);
                          setBudgetSplit(Number(e.target.value));
                        }}
                        className="w-full accent-neutral-900 disabled:opacity-50"
                      />
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-neutral-100">
                        <div
                          className="h-full bg-blue-500 transition-all"
                          style={{ width: `${effectiveMetaSplit}%` }}
                        />
                      </div>
                      {useAiSplit && (
                        <p className="mt-2 text-[11px] text-neutral-400">
                          Default split for "{treatmentType}" based on historical conversion performance.
                        </p>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Start Date">
                      <input type="date" className={inputClass} defaultValue="2026-07-30" />
                    </Field>
                    <Field label="End Date" optional>
                      <input type="date" className={inputClass} defaultValue="2026-08-30" />
                    </Field>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="flex flex-col gap-6">
                  {/* Shared / general targeting */}
                  <div className="flex flex-col gap-4">
                    <SectionLabel>General Audience</SectionLabel>

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
                  </div>

                  {/* META TARGETING */}
                  {usesMeta && (
                    <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 p-4">
                      <SectionLabel icon={<Facebook size={12} className="text-blue-600" />}>
                        Meta Targeting
                      </SectionLabel>

                      <div className="grid grid-cols-3 gap-3">
                        <Field label="Min Age">
                          <input
                            className={inputClass}
                            value={ageRadius.min}
                            onChange={(e) =>
                              setAgeRadius((s) => ({ ...s, min: e.target.value }))
                            }
                          />
                        </Field>
                        <Field label="Max Age">
                          <input
                            className={inputClass}
                            value={ageRadius.max}
                            onChange={(e) =>
                              setAgeRadius((s) => ({ ...s, max: e.target.value }))
                            }
                          />
                        </Field>
                        <Field label="Gender">
                          <select className={inputClass}>
                            <option>Male</option>
                            <option>Female</option>
                            <option>All</option>
                          </select>
                        </Field>
                      </div>

                      <Field label="Location Radius (km)">
                        <input
                          type="range"
                          min={1}
                          max={100}
                          value={ageRadius.radius}
                          onChange={(e) =>
                            setAgeRadius((s) => ({ ...s, radius: Number(e.target.value) }))
                          }
                          className="w-full accent-neutral-900"
                        />
                        <p className="text-xs text-neutral-400">{ageRadius.radius} km</p>
                      </Field>

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

                      <Field label="Placements">
                        <div className="flex gap-2">
                          {["Feed", "Reels", "Stories"].map((p) => (
                            <button
                              key={p}
                              onClick={() => togglePlacement(p)}
                              className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                                metaPlacements.includes(p)
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-neutral-200 text-neutral-500 hover:border-neutral-300"
                              }`}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </Field>

                      <Field label="Creative Format">
                        <div className="flex gap-2">
                          {[
                            { key: "single_image", label: "Single Image", icon: <ImageIcon size={13} /> },
                            { key: "carousel", label: "Carousel", icon: <Layers size={13} /> },
                            { key: "video", label: "Video / Reel", icon: <Film size={13} /> },
                          ].map((f) => (
                            <button
                              key={f.key}
                              onClick={() => setMetaFormat(f.key)}
                              className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                                metaFormat === f.key
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-neutral-200 text-neutral-500 hover:border-neutral-300"
                              }`}
                            >
                              {f.icon}
                              {f.label}
                            </button>
                          ))}
                        </div>
                      </Field>

                      <label className="flex items-center gap-2 text-sm text-neutral-700">
                        <input type="checkbox" className="h-4 w-4 rounded border-neutral-300" />
                        Advantage+ placements (Recommended)
                      </label>
                    </div>
                  )}

                  {/* GOOGLE TARGETING */}
                  {usesGoogle && (
                    <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 p-4">
                      <SectionLabel icon={<Search size={12} className="text-blue-600" />}>
                        Google Targeting
                      </SectionLabel>

                      <Field label="Keyword Strategy">
                        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2">
                          {keywords.map((kw) => (
                            <span
                              key={kw}
                              className="flex items-center gap-1 rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700"
                            >
                              {kw}
                              <button onClick={() => removeChip(keywords, setKeywords, kw)}>
                                <X size={12} />
                              </button>
                            </span>
                          ))}
                          <input
                            placeholder="Add keyword + Enter"
                            className="min-w-[140px] flex-1 bg-transparent text-xs outline-none placeholder-neutral-400"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                addChip(keywords, setKeywords, e.currentTarget.value);
                                e.currentTarget.value = "";
                              }
                            }}
                          />
                        </div>
                      </Field>

                      <Field label="Geographic Radius (km)">
                        <input
                          type="range"
                          min={1}
                          max={100}
                          value={googleGeoRadius}
                          onChange={(e) => setGoogleGeoRadius(Number(e.target.value))}
                          className="w-full accent-neutral-900"
                        />
                        <p className="text-xs text-neutral-400">{googleGeoRadius} km</p>
                      </Field>

                      <Field label="Network Selection">
                        <div className="flex gap-2">
                          {["Search", "Display", "Performance Max"].map((n) => (
                            <button
                              key={n}
                              onClick={() => toggleNetwork(n)}
                              className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                                googleNetworks.includes(n)
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-neutral-200 text-neutral-500 hover:border-neutral-300"
                              }`}
                            >
                              {n}
                            </button>
                          ))}
                        </div>
                      </Field>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="flex flex-col gap-6">
                  {usesMeta && (
                    <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 p-4">
                      <SectionLabel icon={<Facebook size={12} className="text-blue-600" />}>
                        Meta Ad Copy
                      </SectionLabel>

                      <LimitedField
                        label="Headline"
                        value={metaHeadline}
                        onChange={setMetaHeadline}
                        limit={40}
                        placeholder="Catchy headline"
                      />
                      <LimitedField
                        label="Primary Text (Body)"
                        value={metaBody}
                        onChange={setMetaBody}
                        limit={125}
                        placeholder="Tell people what your ad is about..."
                        textarea
                      />

                      <Field label="Ad Creative (Image / Video URL)">
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

                  {usesGoogle && (
                    <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 p-4">
                      <SectionLabel icon={<Search size={12} className="text-blue-600" />}>
                        Google RSA (Responsive Search Ad)
                      </SectionLabel>

                      {googleHeadlines.map((h, i) => (
                        <LimitedField
                          key={i}
                          label={`Headline ${i + 1}`}
                          value={h}
                          onChange={(v) => updateArrayField(googleHeadlines, setGoogleHeadlines, i, v)}
                          limit={30}
                          placeholder={`Headline ${i + 1}`}
                        />
                      ))}

                      {googleDescriptions.map((d, i) => (
                        <LimitedField
                          key={i}
                          label={`Description ${i + 1}`}
                          value={d}
                          onChange={(v) => updateArrayField(googleDescriptions, setGoogleDescriptions, i, v)}
                          limit={90}
                          placeholder={`Description ${i + 1}`}
                          textarea
                        />
                      ))}

                      <Field label="Final URL">
                        <input placeholder="https://..." className={inputClass} />
                      </Field>
                    </div>
                  )}
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