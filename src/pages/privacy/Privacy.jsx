import React, { useState, useMemo } from "react";
import { Anchor, Tag, ConfigProvider } from "antd";
import {
  FiShield,
  FiDatabase,
  FiActivity,
  FiLock,
  FiClock,
  FiUserCheck,
  FiUsers,
  FiMail,
  FiRefreshCw,
  FiFileText,
  FiCheckCircle,
} from "react-icons/fi";
import { TbCookie } from "react-icons/tb";
import { useActiveDocument, useMyAgreements } from "../../api/legalApi";

/**
 * DistalFlo — Privacy Policy & Data Protection Statement
 * Dual-Mode:
 * 1. Logged-in Clinic Admin: Renders the EXACT version accepted by this clinic at onboarding.
 * 2. Public / Guest: Renders the current ACTIVE platform version.
 */

const DEFAULT_SECTIONS = [
  { id: "s1", label: "About This Policy", icon: FiShield, title: "1. About This Policy", content: "This Privacy Policy outlines how DistalFlo AI Ltd collects, stores, processes, and protects personal and sensitive data. We are committed to transparency, security, and full compliance with the UK GDPR and Data Protection Act 2018." },
  { id: "s2", label: "Data We Process", icon: FiDatabase, title: "2. Categories of Personal Data We Process", content: "We collect and process: (a) Clinic Admin contact and billing data; (b) Patient prospect data including names, phone numbers, treatment interests, and appointment slots; (c) Telephony call recordings and AI audio transcripts." },
  { id: "s3", label: "How We Use Data", icon: FiActivity, title: "3. How We Use Patient and Clinic Data", content: "Data is utilized strictly to provide AI lead qualification, book clinic consultations, prevent advertising fraud, and provide analytics. Patient data is never sold or used to train public foundational AI models." },
  { id: "s4", label: "Storage & Security", icon: FiLock, title: "4. Storage, Encryption & Security", content: "We implement TLS 1.3 encryption in transit, AES-256 encryption at rest, role-based access control (RBAC), multi-factor authentication, regular third-party penetration testing, and continuous security auditing across our UK/EU cloud infrastructure." },
  { id: "s5", label: "Data Retention", icon: FiClock, title: "5. Data Retention & Erasure Protocols", content: "Patient data is retained only for as long as necessary to fulfill clinic appointments. Erasure requests trigger automated cascade deletion across databases within 24 hours, recording an immutable cryptographic audit record." },
  { id: "s6", label: "Erasure & GDPR Rights", icon: FiUserCheck, title: "6. Data Subject Rights & GDPR", content: "Under UK GDPR, individuals have rights to: (a) Access their data; (b) Rectification of errors; (c) Erasure ('Right to be forgotten'); (d) Restriction of processing; (e) Data portability; and (f) Objection to processing." },
  { id: "s7", label: "Third-Party Processors", icon: FiUsers, title: "7. Approved Sub-processors", content: "We engage vetted sub-processors under strict Article 28 data processing agreements: Amazon Web Services (UK/EU hosting), Twilio/WhatsApp (messaging delivery), Stripe (payment processing), and Google Cloud (AI transcription)." },
  { id: "s8", label: "Cookies", icon: TbCookie, title: "8. Cookies & Local Storage", content: "The Platform uses essential session cookies for authentication security, along with privacy-preserving telemetry. We do not use third-party tracking pixels or advertising cookies inside the clinic dashboard." },
  { id: "s9", label: "Contact & Complaints", icon: FiMail, title: "9. Contact, DPO & Complaints", content: "For data inquiries, contact privacy@distalflo.co.uk. If unsatisfied, you have the right to lodge a complaint with the UK Information Commissioner's Office (ICO) at ico.org.uk or 0303 123 1113." },
  { id: "s10", label: "Policy Updates", icon: FiRefreshCw, title: "10. Policy Updates & Versioning", content: "We update this Privacy Policy periodically. Historical versions are archived and each Clinic remains bound to the version agreed at onboarding until affirmative acceptance of updated terms." },
];

function SectionShell({ id, index, icon: Icon = FiShield, title, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-t border-[#e7e0d4] pt-10 mt-10 first:mt-0 first:border-0 first:pt-0"
    >
      <div className="flex items-start gap-4 mb-5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1E0F22] text-[#C8A96E]">
          <Icon size={17} />
        </span>
        <div>
          <div className="font-mono text-[10px] tracking-[0.2em] text-[#B79A63] uppercase mb-1">
            Section {index}
          </div>
          <h2 className="font-serif text-2xl md:text-[26px] text-[#1E0F22] leading-tight">
            {title}
          </h2>
        </div>
      </div>
      <div className="pl-14 text-[15px] leading-relaxed text-[#3A362F] space-y-4">
        {children}
      </div>
    </section>
  );
}

export default function Privacy() {
  const [active, setActive] = useState("s1");
  const token = localStorage.getItem("token");

  // Fetch clinic's accepted agreements if logged in
  const { myAgreements, isLoading: myLoading } = useMyAgreements("PRIVACY_POLICY");
  // Fetch active document if guest or fallback
  const { activeDoc, isLoading: activeLoading } = useActiveDocument("PRIVACY_POLICY");

  const doc = useMemo(() => {
    if (token && myAgreements?.privacy) {
      return myAgreements.privacy;
    }
    return activeDoc;
  }, [token, myAgreements, activeDoc]);

  const isLockedVersion = !!(token && myAgreements?.isAcceptedVersion);
  const acceptedDate = myAgreements?.acceptedAt
    ? new Date(myAgreements.acceptedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const sections = useMemo(() => {
    if (doc?.content && Array.isArray(doc.content) && doc.content.length > 0) {
      return doc.content.map((sec, idx) => ({
        id: sec.id || `s${idx + 1}`,
        label: sec.label || sec.title,
        title: sec.title || `Section ${idx + 1}`,
        icon: DEFAULT_SECTIONS[idx]?.icon || FiShield,
        content: sec.content,
      }));
    }
    return DEFAULT_SECTIONS;
  }, [doc]);

  const versionText = doc?.version || "v1.0";
  const effectiveDateText = doc?.effectiveDate
    ? new Date(doc.effectiveDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "1 January 2026";

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: "#1E0F22", fontFamily: "Inter, sans-serif" },
      }}
    >
      <div className="min-h-screen bg-[#FBF9F5] text-[#2D2A26]">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
          .font-serif { font-family: 'Fraunces', serif; }
          .font-mono { font-family: 'IBM Plex Mono', monospace; }
          body, .font-sans { font-family: 'Inter', sans-serif; }
          html { scroll-behavior: smooth; }
        `}</style>

        {/* Masthead */}
        <header className="border-b-[3px] border-[#C8A96E] bg-[#1E0F22] pt-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10 py-10">
            <div className="flex items-center gap-2 text-[#C8A96E]">
              <FiShield size={18} />
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase">
                DistalFlo AI Ltd
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-white mt-3">
              {doc?.title || "Platform Privacy Policy"}
            </h1>
            <div className="mt-4 flex flex-wrap gap-2">
              <Tag className="!bg-transparent !border-[#C8A96E]/50 !text-[#C8A96E] !font-mono !text-[10px] tracking-wider">
                VERSION {versionText}
              </Tag>
              <Tag className="!bg-transparent !border-[#C8A96E]/50 !text-[#C8A96E] !font-mono !text-[10px] tracking-wider">
                UK GDPR &amp; DPA 2018
              </Tag>
              <Tag className="!bg-transparent !border-[#C8A96E]/50 !text-[#C8A96E] !font-mono !text-[10px] tracking-wider">
                EFFECTIVE: {effectiveDateText}
              </Tag>
            </div>
          </div>
        </header>

        {/* Locked Agreement Banner for Logged-in Clinic */}
        {isLockedVersion && (
          <div className="bg-[#2D1B33] text-[#F3E7D3] border-b border-[#C8A96E]/40 px-6 py-3">
            <div className="mx-auto max-w-7xl flex items-center justify-between flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-[#C8A96E] shrink-0" size={16} />
                <span>
                  <strong>Locked Agreement:</strong> Your clinic accepted this Privacy Policy (<strong>{versionText}</strong>) on {acceptedDate}. This version is legally locked to your account.
                </span>
              </div>
              {myAgreements?.currentActiveVersion?.privacy &&
                myAgreements.currentActiveVersion.privacy !== versionText && (
                  <span className="text-white/60 font-mono text-[11px]">
                    Current platform version for new sign-ups: {myAgreements.currentActiveVersion.privacy}
                  </span>
                )}
            </div>
          </div>
        )}

        <div className="mx-auto max-w-7xl px-6 md:px-10 py-12 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10">
          {/* TOC / Anchor nav */}
          <aside className="hidden md:block">
            <div className="sticky top-28">
              <div className="font-mono text-[10px] tracking-[0.2em] text-[#B79A63] uppercase mb-3">
                Contents
              </div>
              <Anchor
                affix={false}
                onChange={(link) => setActive(link?.replace("#", "") || "s1")}
                items={sections.map((s) => ({
                  key: s.id,
                  href: `#${s.id}`,
                  title: (
                    <span className="flex items-center gap-2 text-[13px] py-0.5">
                      <s.icon
                        size={13}
                        className={
                          active === s.id ? "text-[#C8A96E]" : "text-[#B0A996]"
                        }
                      />
                      {s.label}
                    </span>
                  ),
                }))}
              />
            </div>
          </aside>

          {/* Main content */}
          <main className="max-w-3xl">
            {sections.map((sec, idx) => (
              <SectionShell
                key={sec.id}
                id={sec.id}
                index={String(idx + 1).padStart(2, "0")}
                icon={sec.icon}
                title={sec.title}
              >
                <p className="whitespace-pre-line">{sec.content}</p>
              </SectionShell>
            ))}

            <footer className="mt-16 border-t border-[#e7e0d4] pt-6 text-center font-mono text-[10px] tracking-[0.15em] text-[#B0A996] uppercase">
              DistalFlo AI Ltd &nbsp;·&nbsp; England &amp; Wales &nbsp;·&nbsp;
              distalflo.co.uk &nbsp;·&nbsp; Version {versionText}
            </footer>
          </main>
        </div>
      </div>
    </ConfigProvider>
  );
}
