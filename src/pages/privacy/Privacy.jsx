// import React, { useState } from "react";
// import { Anchor, Tag, ConfigProvider } from "antd";
// import {
//   FiShield,
//   FiDatabase,
//   FiActivity,
//   FiLock,
//   FiClock,
//   FiUserCheck,
//   FiUsers,
//   FiMail,
//   FiRefreshCw,
//   FiMousePointer,
//   FiCheckSquare,
//   FiPause,
//   FiLayers,
//   FiFileText,
//   FiExternalLink,
// } from "react-icons/fi";
// import { TbCookie } from "react-icons/tb";

// /**
//  * DistalFlo — Privacy Policy & Data Protection Statement
//  * Palette: Aubergine #1E0F22 · Gold #C8A96E · Parchment #FBF9F5 · Ink #2D2A26
//  * Type: 'Fraunces' (display serif) + 'Inter' (body/UI) + 'IBM Plex Mono' (meta/labels)
//  * Signature element: the "chain of custody" deletion ledger — the 5-step erasure
//  * workflow rendered as a stamped, numbered dossier rather than a generic timeline,
//  * because the one thing this document has to prove is that deletion is provable.
//  */

// const SECTIONS = [
//   { id: "s1", label: "About This Policy", icon: FiShield },
//   { id: "s2", label: "Data We Process", icon: FiDatabase },
//   { id: "s3", label: "How We Use Data", icon: FiActivity },
//   { id: "s4", label: "Storage & Security", icon: FiLock },
//   { id: "s5", label: "Data Retention", icon: FiClock },
//   { id: "s6", label: "Erasure & GDPR Rights", icon: FiUserCheck },
//   { id: "s7", label: "Third-Party Processors", icon: FiUsers },
//   { id: "s8", label: "Cookies", icon: TbCookie },
//   { id: "s9", label: "Contact & Complaints", icon: FiMail },
//   { id: "s10", label: "Policy Updates", icon: FiRefreshCw },
// ];

// const DELETION_STEPS = [
//   {
//     n: "01",
//     icon: FiMousePointer,
//     title: "Initiation",
//     text: "The clinic admin clicks Data Deletion Request on the patient card.",
//   },
//   {
//     n: "02",
//     icon: FiCheckSquare,
//     title: "Confirmation",
//     text: "A confirmation screen states plainly that deletion is permanent. The admin must type the patient\u2019s full name or the word DELETE to proceed.",
//   },
//   {
//     n: "03",
//     icon: FiPause,
//     title: "24-hour hold",
//     text: "A hold period applies before deletion becomes permanent — cancellable by the admin until it lapses.",
//   },
//   {
//     n: "04",
//     icon: FiLayers,
//     title: "Cascade deletion",
//     text: "Every table is purged — record, call recordings & transcripts, SMS/email/WhatsApp history, documents, campaign data. Never partial.",
//   },
//   {
//     n: "05",
//     icon: FiFileText,
//     title: "PDF audit record",
//     text: "A signed confirmation document is generated and emailed to the clinic admin and the DistalFlo super-admin inbox.",
//   },
// ];

// function SectionShell({ id, index, icon: Icon, title, children }) {
//   return (
//     <section
//       id={id}
//       className="scroll-mt-28 border-t border-[#e7e0d4] pt-10 mt-10 first:mt-0 first:border-0 first:pt-0"
//     >
//       <div className="flex items-start gap-4 mb-5">
//         <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1E0F22] text-[#C8A96E]">
//           <Icon size={17} />
//         </span>
//         <div>
//           <div className="font-mono text-[10px] tracking-[0.2em] text-[#B79A63] uppercase mb-1">
//             Section {index}
//           </div>
//           <h2 className="font-serif text-2xl md:text-[26px] text-[#1E0F22] leading-tight">
//             {title}
//           </h2>
//         </div>
//       </div>
//       <div className="pl-14 text-[15px] leading-relaxed text-[#3A362F] space-y-4">
//         {children}
//       </div>
//     </section>
//   );
// }

// function List({ items }) {
//   return (
//     <ul className="space-y-2.5">
//       {items.map((it, i) => (
//         <li key={i} className="flex gap-3">
//           <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#C8A96E]" />
//           <span>{it}</span>
//         </li>
//       ))}
//     </ul>
//   );
// }

// function Callout({ children }) {
//   return (
//     <div className="rounded-r-md border-l-[3px] border-[#C8A96E] bg-[#F8F5EE] px-5 py-4 text-[14px] text-[#5B5648]">
//       {children}
//     </div>
//   );
// }

// export default function Privacy() {
//   const [active, setActive] = useState("s1");

//   return (
//     <ConfigProvider
//       theme={{
//         token: { colorPrimary: "#1E0F22", fontFamily: "Inter, sans-serif" },
//       }}
//     >
//       <div className="min-h-screen bg-[#FBF9F5] text-[#2D2A26]">
//         <style>{`
//           @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
//           .font-serif { font-family: 'Fraunces', serif; }
//           .font-mono { font-family: 'IBM Plex Mono', monospace; }
//           body, .font-sans { font-family: 'Inter', sans-serif; }
//         `}</style>

//         {/* Masthead */}
//         <header className="border-b-[3px] border-[#C8A96E] bg-[#1E0F22] pt-20">
//           <div className="mx-auto max-w-7xl px-6 md:px-10 py-10">
//             <div className="flex items-center gap-2 text-[#C8A96E]">
//               <FiShield size={18} />
//               <span className="font-mono text-[11px] tracking-[0.25em] uppercase">
//                 DistalFlo AI Ltd
//               </span>
//             </div>
//             <h1 className="font-serif text-3xl md:text-4xl text-white mt-3">
//               Privacy Policy &amp; Data Protection Statement
//             </h1>
//             <div className="mt-4 flex flex-wrap gap-2">
//               <Tag className="!bg-transparent !border-[#C8A96E]/50 !text-[#C8A96E] !font-mono !text-[10px] tracking-wider">
//                 VERSION 1.0
//               </Tag>
//               <Tag className="!bg-transparent !border-[#C8A96E]/50 !text-[#C8A96E] !font-mono !text-[10px] tracking-wider">
//                 UK GDPR COMPLIANT
//               </Tag>
//               <Tag className="!bg-transparent !border-[#C8A96E]/50 !text-[#C8A96E] !font-mono !text-[10px] tracking-wider">
//                 EFFECTIVE: 23 July 2026
//               </Tag>
//             </div>
//           </div>
//         </header>

//         <div className="mx-auto max-w-7xl px-6 md:px-10 py-12 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10">
//           {/* TOC / Anchor nav */}
//           <aside className="hidden md:block">
//             <div className="sticky top-28">
//               <div className="font-mono text-[10px] tracking-[0.2em] text-[#B79A63] uppercase mb-3">
//                 Contents
//               </div>
//               <Anchor
//                 affix={false}
//                 onChange={(link) => setActive(link?.replace("#", "") || "s1")}
//                 items={SECTIONS.map((s) => ({
//                   key: s.id,
//                   href: `#${s.id}`,
//                   title: (
//                     <span className="flex items-center gap-2 text-[13px] py-0.5">
//                       <s.icon
//                         size={13}
//                         className={
//                           active === s.id ? "text-[#C8A96E]" : "text-[#B0A996]"
//                         }
//                       />
//                       {s.label}
//                     </span>
//                   ),
//                 }))}
//               />
//             </div>
//           </aside>

//           {/* Body */}
//           <main className="min-w-0">
//             <SectionShell
//               id="s1"
//               index="01"
//               icon={FiShield}
//               title="About This Policy"
//             >
//               <p>
//                 This Privacy Policy explains how DistalFlo AI Ltd ("DistalFlo",
//                 "we", "us") collects, uses, stores, and protects information in
//                 connection with the DistalFlo platform. It applies to:
//               </p>
//               <List
//                 items={[
//                   "Clinic administrators and staff who access the Platform.",
//                   "Patients and leads whose data is processed through the Platform on behalf of subscribing clinics.",
//                   "Visitors to the DistalFlo website.",
//                 ]}
//               />
//               <p>
//                 DistalFlo AI Ltd is registered in England and Wales. Our
//                 registered office address is [REGISTERED ADDRESS]. We are
//                 registered as a Data Controller with the Information
//                 Commissioner's Office (ICO), registration number [ICO NUMBER].
//               </p>
//             </SectionShell>

//             <SectionShell
//               id="s2"
//               index="02"
//               icon={FiDatabase}
//               title="Data We Process"
//             >
//               <h3 className="font-serif text-lg text-[#1E0F22]">
//                 2.1 Clinic &amp; Staff Data
//               </h3>
//               <List
//                 items={[
//                   "Clinic name, address, contact details, and specialty.",
//                   "Administrator and staff names, email addresses, phone numbers, and role within the clinic.",
//                   "Subscription and billing information (processed by Stripe — we do not store card details).",
//                   "Platform usage data, login activity, and audit logs.",
//                 ]}
//               />
//               <h3 className="font-serif text-lg text-[#1E0F22] pt-2">
//                 2.2 Patient &amp; Lead Data
//               </h3>
//               <List
//                 items={[
//                   "Name, phone number, and email address of leads and prospective patients.",
//                   "Treatment enquiry details and campaign attribution data.",
//                   "Call recordings and transcripts from AI outbound calling.",
//                   "Conversation history across SMS, email, and WhatsApp.",
//                   "Appointment status and revenue data imported from connected practice management systems.",
//                   "Consent records and marketing preference data.",
//                 ]}
//               />
//               <Callout>
//                 DistalFlo processes Patient Data as a{" "}
//                 <strong>Data Processor</strong> acting on behalf of the clinic (
//                 <strong>Data Controller</strong>). The clinic is responsible for
//                 the lawful basis for processing Patient Data and for ensuring
//                 appropriate consents are in place.
//               </Callout>
//             </SectionShell>

//             <SectionShell
//               id="s3"
//               index="03"
//               icon={FiActivity}
//               title="How We Use Data"
//             >
//               {[
//                 [
//                   "Platform Operation",
//                   "We use clinic and patient data to deliver the Platform services — running campaigns, managing leads, facilitating AI calling, sending nurture sequences, and providing reporting and analytics.",
//                 ],
//                 [
//                   "Billing & Account Management",
//                   "We use clinic billing and contact data to manage subscriptions, process payments, and communicate about account matters.",
//                 ],
//                 [
//                   "Platform Improvement",
//                   "We may use anonymised, aggregated data derived from Platform usage to improve our AI models and features. No personally or clinic-identifiable data is used for this purpose.",
//                 ],
//                 [
//                   "Legal & Compliance",
//                   "We retain certain data to comply with our legal obligations, including tax records, audit logs, and data deletion records.",
//                 ],
//               ].map(([t, d]) => (
//                 <div key={t}>
//                   <h3 className="font-serif text-lg text-[#1E0F22]">{t}</h3>
//                   <p>{d}</p>
//                 </div>
//               ))}
//             </SectionShell>

//             <SectionShell
//               id="s4"
//               index="04"
//               icon={FiLock}
//               title="Storage & Security"
//             >
//               <h3 className="font-serif text-lg text-[#1E0F22]">
//                 4.1 Server Location
//               </h3>
//               <p>
//                 All Patient Data and clinic data is stored on{" "}
//                 <strong>
//                   AWS infrastructure hosted within the United Kingdom (AWS
//                   London Region, eu-west-2)
//                 </strong>
//                 . No data is transferred outside the UK without the clinic's
//                 prior written consent.
//               </p>
//               <h3 className="font-serif text-lg text-[#1E0F22] pt-2">
//                 4.2 Encryption
//               </h3>
//               <List
//                 items={[
//                   "Data at rest: PostgreSQL databases use AWS-managed AES-256 encryption. All backups and volumes are encrypted at rest.",
//                   "Data in transit: HTTPS with TLS 1.2+ (TLS 1.3 where supported) across the platform.",
//                   "Credentials and sensitive configuration are stored via AWS security services, encrypted.",
//                 ]}
//               />
//               <h3 className="font-serif text-lg text-[#1E0F22] pt-2">
//                 4.3 Access Controls
//               </h3>
//               <p>
//                 Access is restricted by role-based controls. Clinic staff can
//                 only access data within their own clinic — cross-tenant access
//                 is technically prevented by the multi-tenant architecture. All
//                 access is logged in the audit trail.
//               </p>
//               <h3 className="font-serif text-lg text-[#1E0F22] pt-2">
//                 4.4 Backups
//               </h3>
//               <p>
//                 Data is backed up daily, encrypted at rest, and retained for
//                 [RETENTION PERIOD] before automatic deletion.
//               </p>
//             </SectionShell>

//             <SectionShell
//               id="s5"
//               index="05"
//               icon={FiClock}
//               title="Data Retention"
//             >
//               <List
//                 items={[
//                   "Active subscription: retained for the duration of the active subscription.",
//                   "Post-cancellation: retained 30 days for export, then permanently deleted.",
//                   "Audit logs: deletion audit logs retained for [PERIOD] for legal/compliance obligations.",
//                   "Billing records: retained 7 years per HMRC requirements.",
//                 ]}
//               />
//             </SectionShell>

//             <SectionShell
//               id="s6"
//               index="06"
//               icon={FiUserCheck}
//               title="Erasure & GDPR Rights"
//             >
//               <p>Under UK GDPR, individuals have the right to:</p>
//               <List
//                 items={[
//                   "Access — obtain a copy of personal data held about them.",
//                   "Rectification — correct inaccurate personal data.",
//                   "Erasure — request deletion of personal data.",
//                   "Restriction — restrict processing in certain circumstances.",
//                   "Portability — receive data in a structured, machine-readable format.",
//                   "Object — object to processing based on legitimate interests.",
//                 ]}
//               />
//               <p>
//                 Patients should contact their clinic directly — the clinic is
//                 the Data Controller for patient data. Clinics should contact
//                 DistalFlo at{" "}
//                 <a
//                   href="mailto:hello@distalflo.co.uk"
//                   className="text-[#1E0F22] underline decoration-[#C8A96E] decoration-2 underline-offset-2"
//                 >
//                   hello@distalflo.co.uk
//                 </a>
//                 .
//               </p>

//               {/* Signature element: deletion ledger */}
//               <div className="mt-8 rounded-lg border border-[#1E0F22]/10 bg-white overflow-hidden">
//                 <div className="flex items-center justify-between bg-[#1E0F22] px-5 py-3">
//                   <span className="font-mono text-[10px] tracking-[0.2em] text-[#C8A96E] uppercase">
//                     Right to Erasure — Deletion Ledger
//                   </span>
//                   <span className="font-mono text-[10px] text-[#C8A96E]/60">
//                     ART. 17
//                   </span>
//                 </div>
//                 <div className="divide-y divide-[#eee7d9]">
//                   {DELETION_STEPS.map((s) => (
//                     <div key={s.n} className="flex gap-4 px-5 py-4">
//                       <div className="flex flex-col items-center shrink-0">
//                         <span className="font-mono text-[11px] text-[#C8A96E]">
//                           {s.n}
//                         </span>
//                         <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#F8F5EE] text-[#1E0F22]">
//                           <s.icon size={14} />
//                         </span>
//                       </div>
//                       <div className="pt-0.5">
//                         <div className="font-medium text-[14px] text-[#1E0F22]">
//                           {s.title}
//                         </div>
//                         <p className="text-[13.5px] text-[#5B5648] mt-0.5 leading-relaxed">
//                           {s.text}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <Callout>
//                 This workflow is designed to comply with the UK GDPR Right to
//                 Erasure (Article 17). The deletion event and PDF confirmation
//                 are stored permanently in the DistalFlo audit log as the
//                 compliance record of the deletion.
//               </Callout>
//             </SectionShell>

//             <SectionShell
//               id="s7"
//               index="07"
//               icon={FiUsers}
//               title="Third-Party Processors"
//             >
//               <p>
//                 DistalFlo uses the following sub-processors, each bound by
//                 appropriate data processing agreements:
//               </p>
//               <div className="grid sm:grid-cols-2 gap-3">
//                 {[
//                   [
//                     "Amazon Web Services",
//                     "Cloud hosting & infrastructure (UK, eu-west-2)",
//                   ],
//                   [
//                     "Stripe",
//                     "Payment processing — card data never touches DistalFlo",
//                   ],
//                   ["Twilio", "SMS and WhatsApp message delivery"],
//                   ["Bland AI / Retell AI", "AI outbound calling services"],
//                   ["SendGrid / Mailgun", "Email delivery"],
//                 ].map(([n, d]) => (
//                   <div
//                     key={n}
//                     className="rounded-md border border-[#eee7d9] bg-white px-4 py-3"
//                   >
//                     <div className="text-[13.5px] font-medium text-[#1E0F22]">
//                       {n}
//                     </div>
//                     <div className="text-[12.5px] text-[#7a7466] mt-0.5">
//                       {d}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <p className="pt-2">
//                 A full sub-processor list is available on request. Clinics
//                 receive at least 30 days' notice of material changes.
//               </p>
//             </SectionShell>

//             <SectionShell id="s8" index="08" icon={TbCookie} title="Cookies">
//               <p>
//                 The DistalFlo website uses essential cookies required for site
//                 operation. The Platform application uses only essential session
//                 cookies necessary for secure login. Preferences can be managed
//                 via the cookie banner on first visit.
//               </p>
//             </SectionShell>

//             <SectionShell
//               id="s9"
//               index="09"
//               icon={FiMail}
//               title="Contact & Complaints"
//             >
//               <div className="rounded-lg bg-[#1E0F22] px-5 py-4 text-[#C8A96E] text-[14px]">
//                 For any data protection queries, contact{" "}
//                 <a
//                   href="mailto:hello@distalflo.co.uk"
//                   className="underline underline-offset-2"
//                 >
//                   hello@distalflo.co.uk
//                 </a>
//               </div>
//               <p>
//                 If you are not satisfied with our response, you have the right
//                 to lodge a complaint with the Information Commissioner's Office
//                 (ICO) at <strong>ico.org.uk</strong> or by calling{" "}
//                 <strong>0303 123 1113</strong>.
//               </p>
//             </SectionShell>

//             <SectionShell
//               id="s10"
//               index="10"
//               icon={FiRefreshCw}
//               title="Policy Updates"
//             >
//               <p>
//                 We may update this Privacy Policy from time to time. Material
//                 changes will be communicated to clinic administrators by email
//                 at least 30 days before they take effect. The current version is
//                 always available at{" "}
//                 <span className="inline-flex items-center gap-1 text-[#1E0F22] font-medium">
//                   distalflo.co.uk/privacy <FiExternalLink size={12} />
//                 </span>
//                 .
//               </p>
//             </SectionShell>

//             <footer className="mt-16 border-t border-[#e7e0d4] pt-6 text-center font-mono text-[10px] tracking-[0.15em] text-[#B0A996] uppercase">
//               DistalFlo AI Ltd &nbsp;·&nbsp; England &amp; Wales &nbsp;·&nbsp;
//               distalflo.co.uk &nbsp;·&nbsp; Version 1.0
//             </footer>
//           </main>
//         </div>
//       </div>
//     </ConfigProvider>
//   );
// }



import React, { useState } from "react";
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
  FiMousePointer,
  FiCheckSquare,
  FiPause,
  FiLayers,
  FiFileText,
  FiExternalLink,
} from "react-icons/fi";
import { TbCookie } from "react-icons/tb";

/**
 * DistalFlo — Privacy Policy & Data Protection Statement
 * Palette: Aubergine #1E0F22 · Gold #C8A96E · Parchment #FBF9F5 · Ink #2D2A26
 * Type: 'Fraunces' (display serif) + 'Inter' (body/UI) + 'IBM Plex Mono' (meta/labels)
 * Signature element: the "chain of custody" deletion ledger — the 5-step erasure
 * workflow rendered as a stamped, numbered dossier rather than a generic timeline,
 * because the one thing this document has to prove is that deletion is provable.
 */

const SECTIONS = [
  { id: "s1", label: "About This Policy", icon: FiShield },
  { id: "s2", label: "Data We Process", icon: FiDatabase },
  { id: "s3", label: "How We Use Data", icon: FiActivity },
  { id: "s4", label: "Storage & Security", icon: FiLock },
  { id: "s5", label: "Data Retention", icon: FiClock },
  { id: "s6", label: "Erasure & GDPR Rights", icon: FiUserCheck },
  { id: "s7", label: "Third-Party Processors", icon: FiUsers },
  { id: "s8", label: "Cookies", icon: TbCookie },
  { id: "s9", label: "Contact & Complaints", icon: FiMail },
  { id: "s10", label: "Policy Updates", icon: FiRefreshCw },
];

const DELETION_STEPS = [
  {
    n: "01",
    icon: FiMousePointer,
    title: "Initiation",
    text: "The clinic admin clicks Data Deletion Request on the patient card.",
  },
  {
    n: "02",
    icon: FiCheckSquare,
    title: "Confirmation",
    text: "A confirmation screen states plainly that deletion is permanent. The admin must type the patient\u2019s full name or the word DELETE to proceed.",
  },
  {
    n: "03",
    icon: FiPause,
    title: "24-hour hold",
    text: "A hold period applies before deletion becomes permanent — cancellable by the admin until it lapses.",
  },
  {
    n: "04",
    icon: FiLayers,
    title: "Cascade deletion",
    text: "Every table is purged — record, call recordings & transcripts, SMS/email/WhatsApp history, documents, campaign data. Never partial.",
  },
  {
    n: "05",
    icon: FiFileText,
    title: "PDF audit record",
    text: "A signed confirmation document is generated and emailed to the clinic admin and the DistalFlo super-admin inbox.",
  },
];

function SectionShell({ id, index, icon: Icon, title, children }) {
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

function List({ items }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#C8A96E]" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Callout({ children }) {
  return (
    <div className="rounded-r-md border-l-[3px] border-[#C8A96E] bg-[#F8F5EE] px-5 py-4 text-[14px] text-[#5B5648]">
      {children}
    </div>
  );
}

export default function Privacy() {
  const [active, setActive] = useState("s1");

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
              Privacy Policy &amp; Data Protection Statement
            </h1>
            <div className="mt-4 flex flex-wrap gap-2">
              <Tag className="!bg-transparent !border-[#C8A96E]/50 !text-[#C8A96E] !font-mono !text-[10px] tracking-wider">
                VERSION 1.0
              </Tag>
              <Tag className="!bg-transparent !border-[#C8A96E]/50 !text-[#C8A96E] !font-mono !text-[10px] tracking-wider">
                UK GDPR COMPLIANT
              </Tag>
              <Tag className="!bg-transparent !border-[#C8A96E]/50 !text-[#C8A96E] !font-mono !text-[10px] tracking-wider">
                EFFECTIVE: 23 July 2026
              </Tag>
            </div>
          </div>
        </header>

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
                items={SECTIONS.map((s) => ({
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

          {/* Body */}
          <main className="min-w-0">
            <SectionShell
              id="s1"
              index="01"
              icon={FiShield}
              title="About This Policy"
            >
              <p>
                This Privacy Policy explains how DistalFlo AI Ltd ("DistalFlo",
                "we", "us") collects, uses, stores, and protects information in
                connection with the DistalFlo platform. It applies to:
              </p>
              <List
                items={[
                  "Clinic administrators and staff who access the Platform.",
                  "Patients and leads whose data is processed through the Platform on behalf of subscribing clinics.",
                  "Visitors to the DistalFlo website.",
                ]}
              />
              <p>
                DistalFlo AI Ltd is registered in England and Wales. Our
                registered office address will be published here once company
                incorporation is finalised. We are in the process of
                registering as a Data Controller with the Information
                Commissioner's Office (ICO); our ICO registration number will
                be added to this policy as soon as registration is confirmed.
              </p>
            </SectionShell>

            <SectionShell
              id="s2"
              index="02"
              icon={FiDatabase}
              title="Data We Process"
            >
              <h3 className="font-serif text-lg text-[#1E0F22]">
                2.1 Clinic &amp; Staff Data
              </h3>
              <List
                items={[
                  "Clinic name, address, contact details, and specialty.",
                  "Administrator and staff names, email addresses, phone numbers, and role within the clinic.",
                  "Subscription and billing information (processed by Stripe — we do not store card details).",
                  "Platform usage data, login activity, and audit logs.",
                ]}
              />
              <h3 className="font-serif text-lg text-[#1E0F22] pt-2">
                2.2 Patient &amp; Lead Data
              </h3>
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
                <strong>Data Processor</strong> acting on behalf of the clinic (
                <strong>Data Controller</strong>). The clinic is responsible for
                the lawful basis for processing Patient Data and for ensuring
                appropriate consents are in place.
              </Callout>
            </SectionShell>

            <SectionShell
              id="s3"
              index="03"
              icon={FiActivity}
              title="How We Use Data"
            >
              {[
                [
                  "Platform Operation",
                  "We use clinic and patient data to deliver the Platform services — running campaigns, managing leads, facilitating AI calling, sending nurture sequences, and providing reporting and analytics.",
                ],
                [
                  "Billing & Account Management",
                  "We use clinic billing and contact data to manage subscriptions, process payments, and communicate about account matters.",
                ],
                [
                  "Platform Improvement",
                  "We may use anonymised, aggregated data derived from Platform usage to improve our AI models and features. No personally or clinic-identifiable data is used for this purpose.",
                ],
                [
                  "Legal & Compliance",
                  "We retain certain data to comply with our legal obligations, including tax records, audit logs, and data deletion records.",
                ],
              ].map(([t, d]) => (
                <div key={t}>
                  <h3 className="font-serif text-lg text-[#1E0F22]">{t}</h3>
                  <p>{d}</p>
                </div>
              ))}
            </SectionShell>

            <SectionShell
              id="s4"
              index="04"
              icon={FiLock}
              title="Storage & Security"
            >
              <h3 className="font-serif text-lg text-[#1E0F22]">
                4.1 Server Location
              </h3>
              <p>
                All Patient Data and clinic data is stored on{" "}
                <strong>
                  AWS infrastructure hosted within the United Kingdom (AWS
                  London Region, eu-west-2)
                </strong>
                . No data is transferred outside the UK without the clinic's
                prior written consent.
              </p>
              <h3 className="font-serif text-lg text-[#1E0F22] pt-2">
                4.2 Encryption
              </h3>
              <List
                items={[
                  "Data at rest: PostgreSQL databases use AWS-managed AES-256 encryption. All backups and volumes are encrypted at rest.",
                  "Data in transit: HTTPS with TLS 1.2+ (TLS 1.3 where supported) across the platform.",
                  "Credentials and sensitive configuration are stored via AWS security services, encrypted.",
                ]}
              />
              <h3 className="font-serif text-lg text-[#1E0F22] pt-2">
                4.3 Access Controls
              </h3>
              <p>
                Access is restricted by role-based controls. Clinic staff can
                only access data within their own clinic — cross-tenant access
                is technically prevented by the multi-tenant architecture. All
                access is logged in the audit trail.
              </p>
              <h3 className="font-serif text-lg text-[#1E0F22] pt-2">
                4.4 Backups
              </h3>
              <p>
                Data is backed up daily, encrypted at rest, and retained on a
                rolling basis before automatic deletion. The exact backup
                retention window is under final review and will be confirmed
                in a future update to this policy.
              </p>
            </SectionShell>

            <SectionShell
              id="s5"
              index="05"
              icon={FiClock}
              title="Data Retention"
            >
              <List
                items={[
                  "Active subscription: retained for the duration of the active subscription.",
                  "Post-cancellation: retained 30 days for export, then permanently deleted.",
                  "Audit logs: deletion audit logs are retained for a fixed compliance period, currently under final review, to meet our legal and regulatory obligations.",
                  "Billing records: retained 7 years per HMRC requirements.",
                ]}
              />
            </SectionShell>

            <SectionShell
              id="s6"
              index="06"
              icon={FiUserCheck}
              title="Erasure & GDPR Rights"
            >
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
              <p>
                Patients should contact their clinic directly — the clinic is
                the Data Controller for patient data. Clinics should contact
                DistalFlo at{" "}
                <a
                  href="mailto:hello@distalflo.co.uk"
                  className="text-[#1E0F22] underline decoration-[#C8A96E] decoration-2 underline-offset-2"
                >
                  hello@distalflo.co.uk
                </a>
                .
              </p>

              {/* Signature element: deletion ledger */}
              <div className="mt-8 rounded-lg border border-[#1E0F22]/10 bg-white overflow-hidden">
                <div className="flex items-center justify-between bg-[#1E0F22] px-5 py-3">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#C8A96E] uppercase">
                    Right to Erasure — Deletion Ledger
                  </span>
                  <span className="font-mono text-[10px] text-[#C8A96E]/60">
                    ART. 17
                  </span>
                </div>
                <div className="divide-y divide-[#eee7d9]">
                  {DELETION_STEPS.map((s) => (
                    <div key={s.n} className="flex gap-4 px-5 py-4">
                      <div className="flex flex-col items-center shrink-0">
                        <span className="font-mono text-[11px] text-[#C8A96E]">
                          {s.n}
                        </span>
                        <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#F8F5EE] text-[#1E0F22]">
                          <s.icon size={14} />
                        </span>
                      </div>
                      <div className="pt-0.5">
                        <div className="font-medium text-[14px] text-[#1E0F22]">
                          {s.title}
                        </div>
                        <p className="text-[13.5px] text-[#5B5648] mt-0.5 leading-relaxed">
                          {s.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Callout>
                This workflow is designed to comply with the UK GDPR Right to
                Erasure (Article 17). The deletion event and PDF confirmation
                are stored permanently in the DistalFlo audit log as the
                compliance record of the deletion.
              </Callout>
            </SectionShell>

            <SectionShell
              id="s7"
              index="07"
              icon={FiUsers}
              title="Third-Party Processors"
            >
              <p>
                DistalFlo uses the following sub-processors, each bound by
                appropriate data processing agreements:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  [
                    "Amazon Web Services",
                    "Cloud hosting & infrastructure (UK, eu-west-2)",
                  ],
                  [
                    "Stripe",
                    "Payment processing — card data never touches DistalFlo",
                  ],
                  ["Twilio", "SMS and WhatsApp message delivery"],
                  ["Bland AI / Retell AI", "AI outbound calling services"],
                  ["SendGrid / Mailgun", "Email delivery"],
                ].map(([n, d]) => (
                  <div
                    key={n}
                    className="rounded-md border border-[#eee7d9] bg-white px-4 py-3"
                  >
                    <div className="text-[13.5px] font-medium text-[#1E0F22]">
                      {n}
                    </div>
                    <div className="text-[12.5px] text-[#7a7466] mt-0.5">
                      {d}
                    </div>
                  </div>
                ))}
              </div>
              <p className="pt-2">
                A full sub-processor list is available on request. Clinics
                receive at least 30 days' notice of material changes.
              </p>
            </SectionShell>

            <SectionShell id="s8" index="08" icon={TbCookie} title="Cookies">
              <p>
                The DistalFlo website uses essential cookies required for site
                operation. The Platform application uses only essential session
                cookies necessary for secure login. Preferences can be managed
                via the cookie banner on first visit.
              </p>
            </SectionShell>

            <SectionShell
              id="s9"
              index="09"
              icon={FiMail}
              title="Contact & Complaints"
            >
              <div className="rounded-lg bg-[#1E0F22] px-5 py-4 text-[#C8A96E] text-[14px]">
                For any data protection queries, contact{" "}
                <a
                  href="mailto:hello@distalflo.co.uk"
                  className="underline underline-offset-2"
                >
                  hello@distalflo.co.uk
                </a>
              </div>
              <p>
                If you are not satisfied with our response, you have the right
                to lodge a complaint with the Information Commissioner's Office
                (ICO) at <strong>ico.org.uk</strong> or by calling{" "}
                <strong>0303 123 1113</strong>.
              </p>
            </SectionShell>

            <SectionShell
              id="s10"
              index="10"
              icon={FiRefreshCw}
              title="Policy Updates"
            >
              <p>
                We may update this Privacy Policy from time to time. Material
                changes will be communicated to clinic administrators by email
                at least 30 days before they take effect. The current version is
                always available at{" "}
                <span className="inline-flex items-center gap-1 text-[#1E0F22] font-medium">
                  distalflo.co.uk/privacy <FiExternalLink size={12} />
                </span>
                .
              </p>
            </SectionShell>

            <footer className="mt-16 border-t border-[#e7e0d4] pt-6 text-center font-mono text-[10px] tracking-[0.15em] text-[#B0A996] uppercase">
              DistalFlo AI Ltd &nbsp;·&nbsp; England &amp; Wales &nbsp;·&nbsp;
              distalflo.co.uk &nbsp;·&nbsp; Version 1.0
            </footer>
          </main>
        </div>
      </div>
    </ConfigProvider>
  );
}
