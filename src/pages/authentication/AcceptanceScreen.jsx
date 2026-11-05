import React, { useState, useRef, useEffect } from "react";
import { Checkbox, Button, ConfigProvider, message, Spin, Alert } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  FiShield,
  FiDatabase,
  FiActivity,
  FiLock,
  FiClock,
  FiUserCheck,
  FiUsers,
  FiMail,
  FiExternalLink,
  FiFileText,
  FiCheckCircle,
  FiArrowDown,
  FiCheck,
} from "react-icons/fi";
import {
  useActiveDocument,
  useAcceptanceStatus,
  acceptLegalAgreementsApi,
} from "../../api/legalApi";

/**
 * DistalFlo — Login Acceptance Screen (Onboarding Gate)
 * Design: Aubergine #1E0F22 · Gold #C8A96E · Parchment #FBF9F5 · Ink #2D2A26
 *
 * Requirements:
 * - Locks clinic to the exact version accepted here at first login.
 * - Enforces review of active Terms of Service & Privacy Policy before account activation.
 * - 4 mandatory acknowledgements required before proceeding.
 */

const DELETION_STEPS = [
  {
    n: "01",
    title: "Initiation",
    text: "The clinic admin clicks Data Deletion Request on the patient card.",
  },
  {
    n: "02",
    title: "Confirmation",
    text: "A confirmation screen states plainly that deletion is permanent. The admin must type the patient's full name or the word DELETE to proceed.",
  },
  {
    n: "03",
    title: "24-hour hold",
    text: "A hold period applies before deletion becomes permanent — cancellable by the admin until it lapses.",
  },
  {
    n: "04",
    title: "Cascade deletion",
    text: "Every table is purged — record, call recordings & transcripts, SMS/email/WhatsApp history, documents, campaign data. Never partial.",
  },
  {
    n: "05",
    title: "PDF audit record",
    text: "A signed confirmation document is generated and emailed to the clinic admin and the DistalFlo super-admin inbox.",
  },
];

function StatementSection({ icon: Icon = FiShield, index, title, children }) {
  return (
    <section className="border-t border-[#e7e0d4] pt-6 mt-6 first:mt-0 first:border-0 first:pt-0">
      <div className="flex items-start gap-3 mb-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1E0F22] text-[#C8A96E]">
          <Icon size={14} />
        </span>
        <div>
          <div className="font-mono text-[9px] tracking-[0.2em] text-[#B79A63] uppercase mb-0.5">
            Section {index}
          </div>
          <h3 className="font-serif text-[18px] text-[#1E0F22] leading-tight">
            {title}
          </h3>
        </div>
      </div>
      <div className="pl-11 text-[13.5px] leading-relaxed text-[#3A362F] space-y-3">
        {children}
      </div>
    </section>
  );
}

function List({ items }) {
  return (
    <ul className="space-y-1.5">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2.5">
          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#C8A96E]" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Callout({ children }) {
  return (
    <div className="rounded-r-md border-l-[3px] border-[#C8A96E] bg-[#F8F5EE] px-4 py-3 text-[13px] text-[#5B5648]">
      {children}
    </div>
  );
}

const AcceptanceScreen = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const scrollRef = useRef(null);
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  const [checks, setChecks] = useState({
    terms: false,
    privacy: false,
    controller: false,
    dpa: false,
  });
  const [submitting, setSubmitting] = useState(false);

  // Authentication check
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Load acceptance status & active documents
  const { statusData, isLoading: statusLoading } = useAcceptanceStatus();
  const { activeDoc: activeTerms, isLoading: termsLoading } = useActiveDocument("TERMS_OF_SERVICE");
  const { activeDoc: activePrivacy, isLoading: privacyLoading } = useActiveDocument("PRIVACY_POLICY");

  // If already accepted, redirect directly to dashboard
  useEffect(() => {
    if (statusData && statusData.hasAccepted) {
      navigate("/dashboard");
    }
  }, [statusData, navigate]);

  const allChecked = Object.values(checks).every(Boolean);

  const handleCheck = (key) => (e) => {
    setChecks((prev) => ({ ...prev, [key]: e.target.checked }));
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const reachedEnd = el.scrollTop + el.clientHeight >= el.scrollHeight - 24;
    if (reachedEnd) setHasScrolledToEnd(true);
  };

  const handleProceed = async () => {
    if (!allChecked) return;

    if (!activeTerms?.id || !activePrivacy?.id) {
      message.error("Unable to load legal document version metadata. Please refresh.");
      return;
    }

    setSubmitting(true);
    try {
      await acceptLegalAgreementsApi({
        termsDocumentId: activeTerms.id,
        privacyDocumentId: activePrivacy.id,
      });

      // Invalidate queries so status is immediately updated across app
      await queryClient.invalidateQueries({ queryKey: ["legalAcceptanceStatus"] });
      await queryClient.invalidateQueries({ queryKey: ["myLegalAgreements"] });

      message.success("Legal agreements accepted! Welcome to DistalFlo.");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      message.error(
        error?.response?.data?.message ||
          "Failed to record legal acceptance. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const isPageLoading = statusLoading || termsLoading || privacyLoading;

  if (isPageLoading) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] flex flex-col items-center justify-center">
        <Spin size="large" />
        <p className="mt-4 font-mono text-[13px] text-[#8a8060] uppercase tracking-wider">
          Loading legal onboarding agreements...
        </p>
      </div>
    );
  }

  const termsVersion = activeTerms?.version || "1.0";
  const privacyVersion = activePrivacy?.version || "1.0";

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
          .df-scrollbar::-webkit-scrollbar { width: 8px; }
          .df-scrollbar::-webkit-scrollbar-track { background: #F8F5EE; }
          .df-scrollbar::-webkit-scrollbar-thumb { background: #C8A96E; border-radius: 4px; }
        `}</style>

        {/* Masthead */}
        <header className="border-b-[3px] border-[#C8A96E] bg-[#1E0F22]">
          <div className="mx-auto max-w-4xl px-6 md:px-10 py-8 md:py-10">
            <div className="flex items-center gap-2 text-[#C8A96E]">
              <FiShield size={17} />
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase">
                DistalFlo AI Ltd • Clinic Onboarding Gate
              </span>
            </div>
            <h1 className="font-serif text-[26px] md:text-4xl text-white mt-3">
              Before you continue
            </h1>
            <p className="text-[#C8A96E]/80 text-[14px] md:text-[15px] mt-2 max-w-2xl">
              Please review the active Data Protection Statement and platform terms below.
              Confirming these agreements binds your clinic to version{" "}
              <strong className="text-white">v{termsVersion} (Terms)</strong> and{" "}
              <strong className="text-white">v{privacyVersion} (Privacy)</strong>.
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-6 md:px-10 py-8 md:py-12">
          {/* Active Version Info Card */}
          <div className="mb-6 rounded-lg border border-[#e7e0d4] bg-[#F8F5EE] p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] text-[#B79A63] uppercase">
                Agreement Version Snapshot
              </div>
              <div className="text-[13.5px] text-[#2D2A26] mt-0.5 font-medium">
                Terms of Service <span className="font-mono font-bold text-[#1E0F22]">v{termsVersion}</span> &bull; Privacy Policy <span className="font-mono font-bold text-[#1E0F22]">v{privacyVersion}</span>
              </div>
            </div>
            <div className="text-[12px] text-[#5B5648] bg-white px-3 py-1.5 rounded border border-[#e7e0d4]">
              Status: <span className="text-emerald-700 font-semibold">Active for new signups</span>
            </div>
          </div>

          {/* Full Data Protection Statement */}
          <div className="rounded-lg border border-[#e7e0d4] bg-white overflow-hidden shadow-sm">
            <div className="flex items-center justify-between bg-[#1E0F22] px-5 py-3">
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#C8A96E] uppercase">
                Data Protection Statement
              </span>
              <span className="font-mono text-[11px] text-[#C8A96E] font-bold">
                v{privacyVersion}
              </span>
            </div>

            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="df-scrollbar max-h-[520px] overflow-y-auto px-5 md:px-7 py-6"
            >
              <p className="text-[13.5px] text-[#5B5648] mb-1">
                This statement explains how DistalFlo AI Ltd collects, uses,
                stores, and protects information in connection with the
                DistalFlo platform, and applies to clinic administrators and
                staff, patients and leads whose data is processed on behalf
                of the clinic, and website visitors.
              </p>

              {activePrivacy?.content && Array.isArray(activePrivacy.content) && activePrivacy.content.length > 0 ? (
                // Dynamically render sections configured by Super Admin
                activePrivacy.content.map((sec, idx) => (
                  <StatementSection
                    key={sec.id || idx}
                    index={String(idx + 1).padStart(2, "0")}
                    title={sec.title || sec.label}
                  >
                    <p>{sec.content}</p>
                  </StatementSection>
                ))
              ) : (
                // Default compliance standard sections
                <>
                  <StatementSection icon={FiShield} index="01" title="About This Policy">
                    <p>
                      DistalFlo AI Ltd is registered in England and Wales. Registered office: [REGISTERED ADDRESS]. We are registered as a Data Controller with the Information Commissioner's Office (ICO), registration number [ICO NUMBER].
                    </p>
                  </StatementSection>

                  <StatementSection icon={FiDatabase} index="02" title="Data We Process">
                    <p className="font-medium text-[#1E0F22]">Clinic & Staff Data</p>
                    <List
                      items={[
                        "Clinic name, address, contact details, and specialty.",
                        "Administrator and staff names, emails, phone numbers, and role.",
                        "Subscription and billing information (processed by Stripe — card details are never stored by DistalFlo).",
                        "Platform usage data, login activity, and audit logs.",
                      ]}
                    />
                    <p className="font-medium text-[#1E0F22] pt-1">Patient & Lead Data</p>
                    <List
                      items={[
                        "Name, phone number, and email address of leads and prospective patients.",
                        "Treatment enquiry details and campaign attribution data.",
                        "Call recordings and transcripts from AI outbound calling.",
                        "Conversation history across SMS, email, and WhatsApp.",
                        "Appointment status and revenue data imported from connected practice management systems.",
                        "Consent records and marketing preference data.",
                      ]}
                    />
                    <Callout>
                      DistalFlo processes Patient Data as a{" "}
                      <strong>Data Processor</strong> acting on behalf of the
                      clinic (<strong>Data Controller</strong>). The clinic is
                      responsible for the lawful basis for processing Patient
                      Data and for ensuring appropriate consents are in place.
                    </Callout>
                  </StatementSection>

                  <StatementSection icon={FiActivity} index="03" title="How We Use Data">
                    <List
                      items={[
                        "Platform operation — running campaigns, managing leads, AI calling, nurture sequences, reporting and analytics.",
                        "Billing and account management — subscriptions, payments, account communications.",
                        "Platform improvement using anonymised, aggregated data only — never personally or clinic-identifiable data.",
                        "Legal and compliance — tax records, audit logs, and data deletion records.",
                      ]}
                    />
                  </StatementSection>

                  <StatementSection icon={FiLock} index="04" title="Storage & Security">
                    <p>
                      All Patient Data and clinic data is stored on{" "}
                      <strong>
                        AWS infrastructure hosted within the United Kingdom (AWS
                        London Region, eu-west-2)
                      </strong>
                      . No data is transferred outside the UK without the
                      clinic's prior written consent.
                    </p>
                    <List
                      items={[
                        "Data at rest: PostgreSQL databases use AWS-managed AES-256 encryption; backups and volumes are encrypted at rest.",
                        "Data in transit: HTTPS with TLS 1.2+ (TLS 1.3 where supported).",
                        "Credentials and sensitive configuration are stored via AWS security services, encrypted.",
                        "Role-based access control — clinic staff can only access data within their own clinic; all access is logged.",
                        "Backups run daily, encrypted at rest, retained for 30 days before automatic deletion.",
                      ]}
                    />
                  </StatementSection>

                  <StatementSection icon={FiClock} index="05" title="Data Retention">
                    <List
                      items={[
                        "Active subscription: retained for the duration of the active subscription.",
                        "Post-cancellation: retained 30 days for export, then permanently deleted.",
                        "Audit logs: deletion audit logs retained for legal and compliance obligations.",
                        "Billing records: retained 7 years per HMRC requirements.",
                      ]}
                    />
                  </StatementSection>

                  <StatementSection icon={FiUserCheck} index="06" title="Erasure & GDPR Rights">
                    <p>Under UK GDPR, individuals have the right to:</p>
                    <List
                      items={[
                        "Access — obtain a copy of personal data held about them.",
                        "Rectification — correct inaccurate personal data.",
                        "Erasure — request deletion of personal data.",
                        "Restriction — restrict processing in certain circumstances.",
                        "Portability — receive data in a structured, machine-readable format.",
                        "Object — object to processing based on legitimate interests.",
                      ]}
                    />

                    <div className="mt-4 rounded-md border border-[#1E0F22]/10 bg-[#FBF9F5] overflow-hidden">
                      <div className="flex items-center justify-between bg-[#1E0F22] px-4 py-2.5">
                        <span className="font-mono text-[9px] tracking-[0.2em] text-[#C8A96E] uppercase">
                          Right to Erasure — Deletion Ledger
                        </span>
                        <span className="font-mono text-[9px] text-[#C8A96E]/60">
                          ART. 17
                        </span>
                      </div>
                      <div className="divide-y divide-[#eee7d9]">
                        {DELETION_STEPS.map((s) => (
                          <div key={s.n} className="flex gap-3 px-4 py-3">
                            <span className="font-mono text-[10px] text-[#C8A96E] shrink-0 pt-0.5">
                              {s.n}
                            </span>
                            <div>
                              <div className="font-medium text-[13px] text-[#1E0F22]">
                                {s.title}
                              </div>
                              <p className="text-[12.5px] text-[#5B5648] mt-0.5 leading-relaxed">
                                {s.text}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </StatementSection>

                  <StatementSection icon={FiUsers} index="07" title="Third-Party Processors">
                    <p>
                      DistalFlo uses verified sub-processors bound by data processing agreements: Amazon Web Services (UK eu-west-2), Stripe (payment processing), Twilio (SMS/WhatsApp), and voice AI providers.
                    </p>
                  </StatementSection>

                  <StatementSection icon={FiMail} index="08" title="Contact & Complaints">
                    <p>
                      For queries, contact hello@distalflo.co.uk. You also have the right to lodge a complaint with the ICO (ico.org.uk, 0303 123 1113).
                    </p>
                  </StatementSection>
                </>
              )}

              <div className="border-t border-[#e7e0d4] pt-4 mt-6 flex items-center gap-2 text-[#B0A996] font-mono text-[10px] tracking-[0.15em] uppercase">
                <FiCheckCircle className="text-[#C8A96E]" />
                End of statement
              </div>
            </div>

            {!hasScrolledToEnd && (
              <div className="flex items-center justify-center gap-2 border-t border-[#eee7d9] bg-[#F8F5EE] px-5 py-2 font-mono text-[10px] tracking-[0.15em] text-[#8a8060] uppercase">
                <FiArrowDown size={11} />
                Scroll down to review the full statement
              </div>
            )}
          </div>

          {/* Acknowledgement checkboxes */}
          <div className="mt-8 rounded-lg border border-[#e7e0d4] bg-white p-5 md:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <FiFileText className="text-[#C8A96E]" size={16} />
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#B79A63] uppercase">
                Required clinic acknowledgements (All 4 mandatory)
              </span>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  checked={checks.terms}
                  onChange={handleCheck("terms")}
                  className="mt-0.5"
                />
                <span className="text-[14px] text-[#3A362F] leading-relaxed">
                  I have read and agree to the{" "}
                  <Link
                    to="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1E0F22] font-semibold underline decoration-[#C8A96E] decoration-2 underline-offset-2 inline-flex items-center gap-1"
                  >
                    Platform Terms and Conditions (v{termsVersion})
                    <FiExternalLink size={11} />
                  </Link>
                  .
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  checked={checks.privacy}
                  onChange={handleCheck("privacy")}
                  className="mt-0.5"
                />
                <span className="text-[14px] text-[#3A362F] leading-relaxed">
                  I accept the{" "}
                  <Link
                    to="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1E0F22] font-semibold underline decoration-[#C8A96E] decoration-2 underline-offset-2 inline-flex items-center gap-1"
                  >
                    Privacy Policy (v{privacyVersion})
                    <FiExternalLink size={11} />
                  </Link>
                  , including how patient and lead data is collected, used,
                  and stored.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  checked={checks.controller}
                  onChange={handleCheck("controller")}
                  className="mt-0.5"
                />
                <span className="text-[14px] text-[#3A362F] leading-relaxed">
                  I acknowledge that my clinic acts as the{" "}
                  <strong>Data Controller</strong> for all Patient Data
                  processed through the Platform, and that DistalFlo AI Ltd
                  acts solely as a Data Processor on the clinic's behalf.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  checked={checks.dpa}
                  onChange={handleCheck("dpa")}
                  className="mt-0.5"
                />
                <span className="text-[14px] text-[#3A362F] leading-relaxed">
                  I agree to the{" "}
                  <span className="font-semibold text-[#1E0F22]">
                    Data Processing Agreement
                  </span>{" "}
                  governing DistalFlo's processing of Patient Data on behalf
                  of the clinic.
                </span>
              </label>
            </div>
          </div>

          {/* Proceed Button */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <Button
              onClick={handleProceed}
              disabled={!allChecked}
              loading={submitting}
              className="w-full md:w-auto md:min-w-[320px] h-[52px] rounded-xl text-[16px] font-semibold shadow-md transition-all"
              style={{
                background: allChecked ? "#1E0F22" : "#E5E0D5",
                color: allChecked ? "#C8A96E" : "#9A9585",
                border: "none",
              }}
            >
              {submitting ? "Confirming & Locking Agreement..." : "Accept & Proceed to Dashboard"}
            </Button>
            {!allChecked && (
              <p className="font-mono text-[10px] tracking-[0.1em] text-[#B0A996] uppercase text-center">
                All four acknowledgements are required to activate your clinic access
              </p>
            )}
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default AcceptanceScreen;