import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCampaignsApi } from "../../api/campaignApi";
import { Switch, Spin } from "antd";
import { FiPlus, FiEye, FiEdit2, FiCopy, FiPlay, FiInfo } from "react-icons/fi";
import { FaMeta } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import EditCampainModal from "./EditCampainModal";

// ---------- Fake data ----------
const campaigns = [
  {
    id: 1,
    name: "Dental Implants",
    slug: "/dental-implants",
    channels: "Meta + Google",
    status: "Live",
    leads: 86,
    perLead: "£41",
    booked: 22,
    links: [
      {
        platform: "meta",
        url: "https://distalflo.co.uk/JOHNS26uag.com/a/JOHNS26uag.com/a/JOHNS",
      },
      {
        platform: "google",
        url: "https://distalflo.co.uk/JOHNS26uag.com/a/JOHNS26uag.com/a/JOHNS",
      },
    ],
    primaryAction: "View page",
  },
  {
    id: 2,
    name: "Invisalign",
    slug: "/invisalign",
    channels: "Google+Meta",
    status: "Live",
    leads: 44,
    perLead: "£33",
    booked: 13,
    links: [
      {
        platform: "meta",
        url: "https://distalflo.co.uk/JOHNS26uag.com/a/JOHNS26uag.com/a/JOHNS",
      },
      {
        platform: "google",
        url: "https://distalflo.co.uk/JOHNS26uag.com/a/JOHNS26uag.com/a/JOHNS",
      },
    ],
    primaryAction: "View page",
  },
  {
    id: 3,
    name: "Facial Aesthetics",
    slug: "/facial-aesthetics",
    channels: "Meta+Google",
    status: "Paused",
    leads: 18,
    perLead: "£52",
    booked: 4,
    links: [
      {
        platform: "meta",
        url: "https://distalflo.co.uk/JOHNS26uag.com/a/JOHNS26uag.com/a/JOHNS",
      },
      {
        platform: "google",
        url: "https://distalflo.co.uk/JOHNS26uag.com/a/JOHNS26uag.com/a/JOHNS",
      },
    ],
    primaryAction: "Resume",
  },
];

// ---------- Sub components ----------
function PlatformIcon({ platform }) {
  if (platform === "meta") {
    return (
      <span className="w-5 h-5 rounded-md flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 text-white shrink-0">
        <FaMeta size={11} />
      </span>
    );
  }
  return (
    <span className="w-5 h-5 rounded-md flex items-center justify-center bg-white border border-gray-200 shrink-0">
      <FaGoogle size={10} className="text-[#4285F4]" />
    </span>
  );
}

function LinkRow({ link }) {
  return (
    <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-2">
      <PlatformIcon platform={link.platform} />
      <span className="text-xs text-gray-400 font-mono truncate flex-1">
        {link.url}
      </span>
      <button
        type="button"
        className="text-gray-400 hover:text-gray-700 transition-colors shrink-0"
        title="Copy link"
      >
        <FiCopy size={13} />
      </button>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <div className="font-serif text-2xl text-gray-900 leading-none">
        {value}
      </div>
      <div className="font-mono text-[10px] uppercase tracking-wider text-gray-400 mt-1.5">
        {label}
      </div>
    </div>
  );
}

function CampaignCard({ campaign }) {
  const isLive = campaign.status === "Live";

  return (
    <div className="bg-white rounded-2xl border border-black/5 p-6 flex flex-col">
      {/* Status + toggle */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
            isLive
              ? "bg-emerald-50 text-emerald-600"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isLive ? "bg-emerald-500" : "bg-gray-400"
            }`}
          />
          {campaign.status}
        </span>
        <Switch size="small" checked={isLive} />
      </div>

      {/* Title */}
      <h3 className="font-serif text-xl text-gray-900 mb-1">{campaign.name}</h3>
      <p className="text-xs text-gray-400 mb-5">
        {campaign.slug} · {campaign.channels}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        <Stat value={campaign.leads} label="Leads" />
        <Stat value={campaign.perLead} label="Per lead" />
        <Stat value={campaign.booked} label="Booked" />
      </div>

      {/* Links */}
      <div className="flex flex-col gap-2 mb-5">
        {campaign.links.map((link, i) => (
          <LinkRow key={i} link={link} />
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-auto">
        <button
          type="button"
          onClick={() => window.open(`/campaign${campaign.slug}`, "_blank")}
          className="flex-1 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition-colors"
        >
          {campaign.primaryAction === "Resume" ? (
            <FiPlay size={13} />
          ) : (
            <FiEye size={14} />
          )}
          {campaign.primaryAction}
        </button>

        <EditCampainModal />
      </div>
    </div>
  );
}

// ---------- Main component ----------
function Campaigns() {
  const navigate = useNavigate();
  const {
    data: dbCampaigns,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["campaigns"],
    queryFn: fetchCampaignsApi,
  });

  // Combine DB campaigns with template fallbacks if none created yet
  const displayedCampaigns =
    dbCampaigns && dbCampaigns.length > 0
      ? dbCampaigns.map((c) => ({
          id: c.id,
          name: c.name,
          slug: `/${c.id}`,
          channels: "Meta + Google",
          status: "Live",
          leads: c.patientCount || 0,
          perLead: "£38",
          booked: 12,
          links: [
            {
              platform: "meta",
              url: `https://distalflo.co.uk/campaign/${c.id}`,
            },
            {
              platform: "google",
              url: `https://distalflo.co.uk/campaign/${c.id}`,
            },
          ],
          primaryAction: "View page",
          isDb: true,
        }))
      : campaigns;
  return (
    <div>
      <div>
        {/* Header */}
        <div className="lg:flex items-start justify-between mb-6">
          <div>
            <h1 className="font-serif text-3xl text-gray-900 mb-2">
              Campaigns
            </h1>
            <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
              Each campaign is a treatment offer with its own landing page, AI
              call script, and nurture sequence.
            </p>
          </div>

          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            <button
              type="button"
              onClick={() => navigate("/campaigns/new")}
              className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-gray-800 transition-colors shrink-0 shadow-sm"
            >
              <FiPlus size={14} />
              New Campaign
            </button>
          </div>
        </div>

        {/* Info banner */}
        <div className="flex items-center gap-2.5 bg-blue-50 border border-blue-100 text-sm text-blue-900 rounded-xl px-4 py-3 mb-6">
          <FiInfo className="text-blue-500 shrink-0" size={16} />
          <span>
            <span className="font-semibold">2 of 5 active campaigns used.</span>{" "}
            Your Growth plan allows up to 5 running at once. Paused campaigns
            don't count.
          </span>
        </div>

        {/* Campaign cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {displayedCampaigns.map((c) => (
            <CampaignCard key={c.id} campaign={c} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Campaigns;
