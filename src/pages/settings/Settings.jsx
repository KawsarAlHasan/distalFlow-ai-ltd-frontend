import React, { useState } from "react";
import {
  FiUpload,
  FiEye,
  FiPlus,
  FiSettings,
  FiShield,
  FiCalendar,
} from "react-icons/fi";
import { FaMeta } from "react-icons/fa6";
import { FaGoogle, FaWhatsapp, FaTwitter } from "react-icons/fa";
import TeamPanel from "./teamPanel/TeamPanel";
import IntegrationsPanel from "./IntegrationsPanel/IntegrationsPanel";

// ---------- Fake data ----------
const tabs = ["Branding", "Integrations", "Team & roles"];

// ---------- Sub components ----------
function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative pb-3 text-sm font-medium transition-colors ${
        active ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
      }`}
    >
      {label}
      {active && (
        <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-gray-900 rounded-full" />
      )}
    </button>
  );
}

function TextField({ label, value }) {
  return (
    <div>
      <label className="block text-sm text-gray-700 mb-2">{label}</label>
      <input
        type="text"
        readOnly
        defaultValue={value}
        className="w-full text-sm border border-gray-200 rounded-lg px-3.5 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
      />
    </div>
  );
}

function ColorField({ label, swatch, value }) {
  return (
    <div>
      <label className="block text-sm text-gray-700 mb-2">{label}</label>
      <div className="flex items-center gap-3">
        <span
          className="w-9 h-9 rounded-lg border border-black/5 shrink-0"
          style={{ backgroundColor: swatch }}
        />
        <input
          type="text"
          readOnly
          defaultValue={value}
          className="flex-1 text-sm border border-gray-200 rounded-lg px-3.5 py-2.5 text-gray-700 font-mono focus:outline-none focus:ring-2 focus:ring-gray-900/10"
        />
      </div>
    </div>
  );
}

// ---------- Panel: Branding ----------
function BrandingPanel() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-black/5 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-1">
            Clinic identity
          </h2>
          <p className="text-xs text-gray-400 mb-6">
            Applied to every landing page and patient message.
          </p>

          <div className="flex flex-col gap-5">
            <TextField label="Clinic name" value="Bright Smile Dental" />

            <div>
              <label className="block text-sm text-gray-700 mb-2">Logo</label>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-teal-700 text-white flex items-center justify-center font-serif text-lg">
                  B
                </div>
                <button className="inline-flex items-center gap-1.5 text-sm text-gray-700 font-medium border border-gray-200 rounded-lg px-3.5 py-2 hover:border-gray-300 transition-colors">
                  <FiUpload size={14} />
                  Upload new
                </button>
              </div>
            </div>

            <TextField
              label="Contact phone (shown to patients)"
              value="01865 000 000"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-black/5 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-1">
            Brand colors
          </h2>
          <p className="text-xs text-gray-400 mb-6">
            Used on landing pages and email headers.
          </p>

          <div className="flex flex-col gap-5">
            <ColorField
              label="Primary colour"
              swatch="#1C6168"
              value="#1C6168"
            />
            <ColorField
              label="Accent colour"
              swatch="#7BB6BB"
              value="#7BB6BB"
            />
            <TextField
              label="Patient-facing sender name"
              value="Bright Smile Dental"
            />

            <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
              <FiEye className="text-blue-500 shrink-0 mt-0.5" size={15} />
              <p className="text-xs text-blue-900 leading-relaxed">
                Patients never see the DistalFlo name — pages and messages are
                fully white-labelled as your clinic.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button className="bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-colors">
          Save branding
        </button>
      </div>
    </>
  );
}

// ---------- Main component ----------
function Settings() {
  const [tab, setTab] = useState("Branding");

  return (
    <div>
      <div className="">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-serif text-3xl text-gray-900 mb-2">Settings</h1>
          <p className="text-sm text-gray-500">
            Manage your clinic profile, branding, integrations and team.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-7 border-b border-gray-200 mb-6">
          {tabs.map((t) => (
            <TabButton
              key={t}
              label={t}
              active={tab === t}
              onClick={() => setTab(t)}
            />
          ))}
        </div>

        {/* Panels */}
        {tab === "Branding" && <BrandingPanel />}
        {tab === "Integrations" && <IntegrationsPanel />}
        {tab === "Team & roles" && <TeamPanel />}
      </div>
    </div>
  );
}

export default Settings;
