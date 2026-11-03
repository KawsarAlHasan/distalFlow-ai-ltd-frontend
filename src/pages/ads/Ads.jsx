import React from "react";
import {
  Plus,
  TrendingUp,
  TrendingDown,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import NewAdsModal from "./NewAdsModal";
import NewAdsModal2 from "./NewAdsModal2";

const stats = [
  {
    label: "Total spend (MTD)",
    value: "£4,820",
    trend: "On track",
    trendType: "up",
  },
  {
    label: "Attributed revenue",
    value: "£18,210",
    trend: "+24.2%",
    trendType: "up",
  },
  {
    label: "Cost per lead (CPL)",
    value: "£33.94",
    trend: "-12.4%",
    trendType: "down",
  },
  {
    label: "Platform fee",
    value: "£241",
    sub: "5%",
    trend: "Queen rate",
    trendType: "none",
  },
];

const ads = [
  {
    id: 1,
    platform: "google",
    name: 'Brand search - "boldco hotel"',
    channel: "Google",
    budget: "£40/day",
    status: "Active",
    tag: "Well performing",
    spend: "$610",
    impressions: "18K impressions",
  },
  {
    id: 2,
    platform: "meta",
    name: "New patient whitening offer",
    channel: "Meta",
    budget: "£80/day",
    status: "Active",
    tag: "Well performing",
    spend: "£1,420",
    impressions: "82K impressions",
  },
];

function PlatformIcon({ platform }) {
  if (platform === "google") {
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white ring-1 ring-black/5">
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path
            fill="#4285F4"
            d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z"
          />
          <path
            fill="#34A853"
            d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.9v2.33A9 9 0 0 0 9 18z"
          />
          <path
            fill="#FBBC05"
            d="M3.95 10.7A5.4 5.4 0 0 1 3.66 9c0-.59.1-1.17.29-1.7V4.97H.9A9 9 0 0 0 0 9c0 1.45.35 2.83.9 4.03l3.05-2.33z"
          />
          <path
            fill="#EA4335"
            d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .9 4.97l3.05 2.33C4.66 5.17 6.65 3.58 9 3.58z"
          />
        </svg>
      </div>
    );
  }
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEF2FF]">
      <svg width="18" height="14" viewBox="0 0 32 22" fill="none">
        <path
          d="M6.5 21C3 21 0 17.9 0 13.7 0 8.2 3.6 2 8.6 2c2.6 0 4.4 1.5 5.7 3.4C15.6 3.5 17.4 2 20 2 25 2 28.6 8.2 28.6 13.7 28.6 17.9 25.6 21 22.1 21c-2.1 0-3.7-1-4.9-2.7-.7 1-2.1 2.7-4.4 2.7-2.3 0-3.7-1.7-4.4-2.7C7.2 20 5.6 21 6.5 21z"
          stroke="#4C6EF5"
          strokeWidth="1.6"
        />
      </svg>
    </div>
  );
}

function Toggle({ on }) {
  return (
    <div
      className={`h-6 w-11 rounded-full p-0.5 transition-colors ${
        on ? "bg-emerald-500" : "bg-neutral-300"
      }`}
    >
      <div
        className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${
          on ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </div>
  );
}

export default function Ads() {
  return (
    <div className="font-serif text-neutral-900">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="font-serif text-4xl italic tracking-tight">Ads</h1>
          <p className="mt-2 max-w-xl font-sans text-sm text-neutral-500">
            Run, monitor, and optimize paid campaigns across Meta, Google —
            with creative pulled from your Content queue.
          </p>
        </div>
        {/* <NewAdsModal /> */}
        <NewAdsModal2 />
        {/* <button className="flex items-center gap-1.5 rounded-lg bg-neutral-900 px-4 py-2.5 font-sans text-sm font-medium text-white hover:bg-neutral-800">
          <Plus size={16} strokeWidth={2.5} />
          New ads
        </button> */}
      </div>

      {/* Stat cards */}
      <div className="mb-8 grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-black/5 bg-white/60 p-5"
          >
            <p className="font-sans text-xs text-neutral-500">{s.label}</p>
            <p className="mt-2 font-serif text-2xl italic">
              {s.value}
              {s.sub && (
                <span className="ml-1 font-sans text-sm not-italic text-neutral-400">
                  {s.sub}
                </span>
              )}
            </p>
            {s.trendType === "none" ? (
              <p className="mt-2 font-sans text-xs text-neutral-400">
                {s.trend}
              </p>
            ) : (
              <div
                className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-sans text-xs font-medium ${
                  s.trendType === "up"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {s.trendType === "up" ? (
                  <TrendingUp size={12} />
                ) : (
                  <TrendingDown size={12} />
                )}
                {s.trend}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tabs + search row */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-6 font-sans text-sm">
          <button className="border-b-2 border-neutral-900 pb-2 font-medium text-neutral-900">
            Active
          </button>
          <button className="pb-2 text-neutral-400 hover:text-neutral-600">
            Paused
          </button>
          <button className="pb-2 text-neutral-400 hover:text-neutral-600">
            Completed
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-black/10 bg-white/60 px-3 py-2">
            <Search size={14} className="text-neutral-400" />
            <input
              placeholder="Search ad set or ad name"
              className="w-48 bg-transparent font-sans text-sm text-neutral-600 placeholder:text-neutral-400 focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-1.5 rounded-lg border border-black/10 bg-white/60 px-3 py-2 font-sans text-sm text-neutral-600">
            <SlidersHorizontal size={14} />
            Filter by
          </button>
        </div>
      </div>

      {/* Ad rows */}
      <div className="overflow-hidden rounded-2xl border border-black/5 bg-white">
        {ads.map((ad, i) => (
          <div
            key={ad.id}
            className={`flex items-center justify-between px-5 py-4 ${
              i !== ads.length - 1 ? "border-b border-black/5" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <PlatformIcon platform={ad.platform} />
              <div>
                <p className="font-sans text-sm font-medium text-neutral-800">
                  {ad.name}
                </p>
                <div className="mt-1 flex items-center gap-2 font-sans text-xs text-neutral-400">
                  <span>{ad.channel}</span>
                  <span>·</span>
                  <span>{ad.budget}</span>
                  <span className="font-medium text-emerald-600">
                    {ad.status}
                  </span>
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-700">
                    {ad.tag}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="font-sans text-[10px] uppercase tracking-wide text-neutral-400">
                  Spend
                </p>
                <p className="font-sans text-sm font-semibold text-neutral-800">
                  {ad.spend}
                </p>
                <p className="font-sans text-[11px] text-neutral-400">
                  {ad.impressions}
                </p>
              </div>
              <div className="text-right">
                <p className="mb-1 font-sans text-[10px] uppercase tracking-wide text-neutral-400">
                  Status
                </p>
                <Toggle on />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}