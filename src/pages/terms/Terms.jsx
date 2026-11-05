import React, { useState, useMemo } from "react";
import { Anchor, Tag, ConfigProvider, Alert, Spin } from "antd";
import {
  FiFileText,
  FiBookOpen,
  FiCreditCard,
  FiMapPin,
  FiUserCheck,
  FiSlash,
  FiCpu,
  FiAward,
  FiDatabase,
  FiTrash2,
  FiShield,
  FiLock,
  FiXCircle,
  FiList,
  FiCheckCircle,
} from "react-icons/fi";
import { FaBalanceScale } from "react-icons/fa";
import { useActiveDocument, useMyAgreements } from "../../api/legalApi";

/**
 * DistalFlo — Platform Terms and Conditions
 * Dual-Mode:
 * 1. Logged-in Clinic Admin: Renders the EXACT version accepted by this clinic at onboarding.
 * 2. Public / Guest: Renders the current ACTIVE platform version.
 */

const DEFAULT_SECTIONS = [
  { id: "s1", label: "Introduction & Agreement", icon: FiFileText, title: "1. Introduction and Agreement", content: "These Platform Terms and Conditions govern access to and use of the DistalFlo AI platform. By accessing or using the Platform, the Clinic agrees to be legally bound by these Terms. The Platform is provided solely for commercial and professional use by registered dental and healthcare clinics." },
  { id: "s2", label: "Definitions", icon: FiBookOpen, title: "2. Definitions & Interpretations", content: "'Platform' refers to the DistalFlo web application, AI agents, reporting suites, and integrations. 'Clinic' means the legal entity subscribing to the service. 'Patient Data' refers to all personal, clinical, or contact details submitted by or captured from prospective and active patients." },
  { id: "s3", label: "Subscriptions & Access", icon: FiCreditCard, title: "3. Subscriptions, Fees & Billing", content: "Subscription tiers (Solo, Growth, Pro, Enterprise) define campaign limits, included locations, and platform features. All recurring fees are billed in advance on a monthly basis via Stripe. Setup fees are one-off and non-refundable once campaign onboarding begins." },
  { id: "s4", label: "Geographic Exclusivity", icon: FiMapPin, title: "4. Postcode Exclusivity Guarantee", content: "Subject to maintaining an active subscription, DistalFlo grants the Clinic exclusive marketing rights within agreed outward postcode sectors (e.g., OX1–OX4). DistalFlo shall not onboard or run competing patient acquisition campaigns for another dental clinic within the reserved sectors." },
  { id: "s5", label: "Clinic Obligations", icon: FiUserCheck, title: "5. Clinic Warranties & Compliance", content: "The Clinic warrants that all clinical treatments promoted via the Platform comply with General Dental Council (GDC) standards and relevant advertising codes (ASA/CAP). The Clinic maintains professional indemnity insurance and is solely responsible for patient treatment decisions." },
  { id: "s6", label: "Acceptable Use", icon: FiSlash, title: "6. Acceptable Use Policy", content: "The Clinic agrees not to reverse engineer the Platform, send unsolicited bulk communications outside permitted nurture workflows, or upload malicious code. Breaches of this section result in immediate suspension." },
  { id: "s7", label: "AI & Campaign Automation", icon: FiCpu, title: "7. AI Agents & Automated Communications", content: "The Platform utilizes automated AI models to conduct patient triage, qualifying calls, and nurture messaging. All AI interactions state clearly that communication is automated. The Clinic retains oversight of patient interactions." },
  { id: "s8", label: "Intellectual Property", icon: FiAward, title: "8. Intellectual Property Rights", content: "All intellectual property in the Platform, including proprietary algorithms, prompt engineering, designs, and workflows, remains the exclusive property of DistalFlo AI Ltd. The Clinic retains all rights to its trademarks, clinic logos, and patient records." },
  { id: "s9", label: "Data Protection", icon: FiDatabase, title: "9. Data Protection & GDPR", content: "The Clinic acts as Data Controller and DistalFlo acts as Data Processor. Both parties agree to abide by the UK GDPR, Data Protection Act 2018, and the terms of the Data Processing Agreement incorporated herein." },
  { id: "s10", label: "GDPR Data Deletion", icon: FiTrash2, title: "10. Right of Erasure & Deletion Ledger", content: "Upon request from a patient or clinic admin, patient records and associated call transcripts, recordings, and message histories undergo permanent cascade deletion across all databases, followed by generation of a cryptographically signed deletion certificate." },
  { id: "s11", label: "Limitation of Liability", icon: FiShield, title: "11. Limitation of Liability", content: "Except in cases of death or personal injury caused by negligence or fraud, DistalFlo's maximum aggregate liability arising out of or related to these Terms shall not exceed the total fees paid by the Clinic in the 12 months preceding the claim." },
  { id: "s12", label: "Confidentiality", icon: FiLock, title: "12. Confidentiality", content: "Each party agrees to maintain strict confidentiality of all commercial, technical, and operational secrets disclosed by the other party for the duration of the agreement and for a period of five (5) years thereafter." },
  { id: "s13", label: "Termination", icon: FiXCircle, title: "13. Term & Termination", content: "Either party may terminate the subscription with thirty (30) days written notice prior to the end of any billing cycle. Upon termination, access ceases and postcodes are released back to the general pool." },
  { id: "s14", label: "Governing Law", icon: FaBalanceScale, title: "14. Governing Law & Jurisdiction", content: "These Terms and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with the laws of England and Wales, and the courts of England shall have exclusive jurisdiction." },
  { id: "s15", label: "General", icon: FiList, title: "15. General Provisions", content: "If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions shall remain in full force and effect. No failure or delay by either party in exercising any right shall constitute a waiver." },
];

function SectionShell({ id, index, icon: Icon = FiFileText, title, children }) {
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
            Clause {index}
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

export default function Terms() {
  const [active, setActive] = useState("s1");
  const token = localStorage.getItem("token");

  // Fetch clinic's accepted agreements if logged in
  const { myAgreements, isLoading: myLoading } = useMyAgreements("TERMS_OF_SERVICE");
  // Fetch active document if guest or fallback
  const { activeDoc, isLoading: activeLoading } = useActiveDocument("TERMS_OF_SERVICE");

  const doc = useMemo(() => {
    if (token && myAgreements?.terms) {
      return myAgreements.terms;
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
        title: sec.title || `Clause ${idx + 1}`,
        icon: DEFAULT_SECTIONS[idx]?.icon || FiFileText,
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
              <FiFileText size={18} />
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase">
                DistalFlo AI Ltd
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-white mt-3">
              {doc?.title || "Platform Terms and Conditions"}
            </h1>
            <div className="mt-4 flex flex-wrap gap-2">
              <Tag className="!bg-transparent !border-[#C8A96E]/50 !text-[#C8A96E] !font-mono !text-[10px] tracking-wider">
                VERSION {versionText}
              </Tag>
              <Tag className="!bg-transparent !border-[#C8A96E]/50 !text-[#C8A96E] !font-mono !text-[10px] tracking-wider">
                ENGLAND &amp; WALES
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
                  <strong>Locked Agreement:</strong> Your clinic accepted this legal agreement (<strong>{versionText}</strong>) on {acceptedDate}. This version governs your subscription.
                </span>
              </div>
              {myAgreements?.currentActiveVersion?.terms &&
                myAgreements.currentActiveVersion.terms !== versionText && (
                  <span className="text-white/60 font-mono text-[11px]">
                    Current platform version for new sign-ups: {myAgreements.currentActiveVersion.terms}
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
