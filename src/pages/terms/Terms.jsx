import React, { useState } from "react";
import { Anchor, Tag, ConfigProvider } from "antd";
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
} from "react-icons/fi";
import { FaBalanceScale } from "react-icons/fa";

/**
 * DistalFlo — Platform Terms and Conditions
 * Same design system as the Privacy Policy: Aubergine #1E0F22 · Gold #C8A96E ·
 * Parchment #FBF9F5 · Ink #2D2A26 · 'Fraunces' / 'Inter' / 'IBM Plex Mono'.
 * Signature element reused: the deletion ledger, referenced here in condensed
 * form under GDPR Data Deletion so the two documents visibly share one spine.
 */

const SECTIONS = [
  { id: "s1", label: "Introduction & Agreement", icon: FiFileText },
  { id: "s2", label: "Definitions", icon: FiBookOpen },
  { id: "s3", label: "Subscriptions & Access", icon: FiCreditCard },
  { id: "s4", label: "Geographic Exclusivity", icon: FiMapPin },
  { id: "s5", label: "Clinic Obligations", icon: FiUserCheck },
  { id: "s6", label: "Acceptable Use", icon: FiSlash },
  { id: "s7", label: "AI & Campaign Automation", icon: FiCpu },
  { id: "s8", label: "Intellectual Property", icon: FiAward },
  { id: "s9", label: "Data Protection", icon: FiDatabase },
  { id: "s10", label: "GDPR Data Deletion", icon: FiTrash2 },
  { id: "s11", label: "Limitation of Liability", icon: FiShield },
  { id: "s12", label: "Confidentiality", icon: FiLock },
  { id: "s13", label: "Termination", icon: FiXCircle },
  { id: "s14", label: "Governing Law", icon: FaBalanceScale },
  { id: "s15", label: "General", icon: FiList },
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

function Term({ term, def }) {
  return (
    <div className="flex flex-col gap-1 border-b border-[#eee7d9] pb-3 last:border-0 sm:flex-row sm:gap-4">
      <dt className="shrink-0 sm:w-40 font-serif text-[15px] text-[#1E0F22]">
        {term}
      </dt>
      <dd className="text-[14.5px] text-[#5B5648]">{def}</dd>
    </div>
  );
}

export default function Terms() {
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
              <FiFileText size={18} />
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase">
                DistalFlo AI Ltd
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-white mt-3">
              Platform Terms and Conditions
            </h1>
            <div className="mt-4 flex flex-wrap gap-2">
              <Tag className="!bg-transparent !border-[#C8A96E]/50 !text-[#C8A96E] !font-mono !text-[10px] tracking-wider">
                VERSION 1.0
              </Tag>
              <Tag className="!bg-transparent !border-[#C8A96E]/50 !text-[#C8A96E] !font-mono !text-[10px] tracking-wider">
                ENGLAND &amp; WALES
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
              icon={FiFileText}
              title="Introduction and Agreement"
            >
              <p>
                These Terms and Conditions ("Terms") govern access to and use of
                the DistalFlo platform ("Platform"), a software-as-a-service
                patient acquisition and marketing automation product operated by
                DistalFlo AI Ltd, a company incorporated in England and Wales
                ("DistalFlo", "we", "us", "our").
              </p>
              <p>
                By completing the sign-up process and ticking the acceptance
                checkbox, the clinic owner or authorised representative
                ("Clinic", "you", "your") agrees to be bound by these Terms in
                full. If you do not agree to these Terms, you must not access or
                use the Platform.
              </p>
              <p>
                These Terms form a legally binding contract between DistalFlo AI
                Ltd and the Clinic. They should be read alongside the DistalFlo
                Privacy Policy and Data Processing Agreement, which are
                incorporated into these Terms by reference.
              </p>
            </SectionShell>

            <SectionShell
              id="s2"
              index="02"
              icon={FiBookOpen}
              title="Definitions"
            >
              <dl className="space-y-3">
                <Term
                  term="Platform"
                  def="The DistalFlo software-as-a-service application, including all features, modules, integrations, dashboards, APIs, and associated services."
                />
                <Term
                  term="Clinic"
                  def="The private healthcare, dental, aesthetics, fitness, or wellness business that has subscribed to the Platform."
                />
                <Term
                  term="Clinic Admin"
                  def="The individual authorised by the Clinic to manage the Platform account."
                />
                <Term
                  term="Patient Data"
                  def="Any personally identifiable information relating to patients, leads, or prospective patients processed through the Platform."
                />
                <Term
                  term="Subscription"
                  def="The monthly recurring licence to access the Platform at the agreed tier."
                />
                <Term
                  term="Campaign"
                  def="An AI-generated or clinic-configured marketing campaign created and managed through the Platform."
                />
                <Term
                  term="Territory"
                  def="The geographic area assigned to the Clinic under the DistalFlo regional exclusivity model."
                />
              </dl>
            </SectionShell>

            <SectionShell
              id="s3"
              index="03"
              icon={FiCreditCard}
              title="Subscriptions and Access"
            >
              <h3 className="font-serif text-lg text-[#1E0F22]">
                3.1 Subscription tiers
              </h3>
              <p>
                The Platform is available on three tiers: Growth (2 active
                campaigns), Growth (5 active campaigns), and Full (unlimited
                campaigns with all modules). Features and campaign limits for
                each tier are as described on the DistalFlo website and in the
                Clinic's onboarding documentation at the time of sign-up.
              </p>
              <h3 className="font-serif text-lg text-[#1E0F22] pt-2">
                3.2 Billing
              </h3>
              <p>
                Subscriptions are billed monthly in advance via Stripe. The
                monthly fee, any setup fee, and any module add-on fees are as
                agreed at sign-up. All fees are exclusive of VAT, charged where
                applicable at the prevailing rate.
              </p>
              <h3 className="font-serif text-lg text-[#1E0F22] pt-2">
                3.3 Payment failure
              </h3>
              <p>
                If a payment fails, DistalFlo notifies the Clinic by email and
                retries on days 1, 3, and 7. If payment is not received within 7
                days, the account enters a restricted read-only state. If not
                received within 14 days, the account is suspended. Clinic data
                is retained for 30 days following suspension, after which it may
                be permanently deleted.
              </p>
              <h3 className="font-serif text-lg text-[#1E0F22] pt-2">
                3.4 Cancellation
              </h3>
              <p>
                The Clinic may cancel at any time via the DistalFlo billing
                portal. Cancellation takes effect at the end of the current
                billing period. No refunds are provided for unused portions of a
                billing period.
              </p>
              <h3 className="font-serif text-lg text-[#1E0F22] pt-2">
                3.5 Upgrades and downgrades
              </h3>
              <p>
                Upgrades take effect immediately with prorated billing.
                Downgrades take effect at the next renewal. Where a downgrade
                puts the Clinic over the new tier's campaign limit, excess
                campaigns are paused automatically.
              </p>
            </SectionShell>

            <SectionShell
              id="s4"
              index="04"
              icon={FiMapPin}
              title="Geographic Exclusivity"
            >
              <p>
                Each Clinic is assigned a Territory at sign-up. DistalFlo will
                not onboard another clinic in the same specialty within the same
                Territory while the Clinic's subscription remains active. The
                Territory is defined by postcode area and treatment specialty as
                agreed at onboarding.
              </p>
              <p>
                Exclusivity applies to the Clinic's primary specialty and
                Territory only — DistalFlo may onboard clinics offering
                different specialties in the same geographic area.
              </p>
              <Callout>
                Exclusivity lapses immediately on cancellation or suspension of
                the subscription. DistalFlo accepts no liability for loss of
                revenue or competitive disadvantage arising from that lapse.
              </Callout>
            </SectionShell>

            <SectionShell
              id="s5"
              index="05"
              icon={FiUserCheck}
              title="Clinic Obligations"
            >
              <List
                items={[
                  "Ensure all information provided to DistalFlo at sign-up and during use of the Platform is accurate, complete, and up to date.",
                  "Take responsibility for the accuracy and legality of all campaign content it approves for publication.",
                  "Comply with all applicable advertising regulations, including ASA, CAP Code, and FCA regulations where finance promotions are involved.",
                  "Obtain and maintain all necessary consents from patients and leads for processing their personal data through the Platform.",
                  "Not use the Platform to send unsolicited communications to individuals without consent under PECR or UK GDPR.",
                  "Not share login credentials with unauthorised individuals or permit access by anyone outside its own organisation.",
                  "Notify DistalFlo immediately on becoming aware of any unauthorised access to its Platform account.",
                ]}
              />
            </SectionShell>

            <SectionShell
              id="s6"
              index="06"
              icon={FiSlash}
              title="Platform Usage and Acceptable Use"
            >
              <p>
                The Clinic is granted a non-exclusive, non-transferable licence
                to access and use the Platform during the subscription period
                for its own internal business purposes. This licence does not
                permit the Clinic to:
              </p>
              <List
                items={[
                  "Resell, sublicence, or provide access to the Platform to any third party.",
                  "Copy, modify, adapt, or create derivative works from the Platform or its source code.",
                  "Reverse-engineer, decompile, or disassemble any part of the Platform.",
                  "Use the Platform in any way that is unlawful, fraudulent, or harmful to DistalFlo or any third party.",
                  "Transmit content that is defamatory, discriminatory, offensive, or in breach of any applicable law.",
                  "Attempt to gain unauthorised access to any part of the Platform or its underlying infrastructure.",
                ]}
              />
            </SectionShell>

            <SectionShell
              id="s7"
              index="07"
              icon={FiCpu}
              title="AI Features and Campaign Automation"
            >
              <p>
                The Platform incorporates AI features including competitor
                analysis, AI-generated campaign content, automated ad
                optimisation, AI outbound calling, and lead scoring. The Clinic
                acknowledges and agrees that:
              </p>
              <List
                items={[
                  "AI-generated content is produced algorithmically and should be reviewed before approval — DistalFlo does not guarantee its accuracy, legality, or suitability for the Clinic's regulatory environment.",
                  "The Clinic is solely responsible for reviewing and approving all AI-generated campaign content before publication.",
                  "Competitor analysis data is sourced from public advertising intelligence tools and third-party APIs; DistalFlo does not warrant its accuracy or completeness.",
                  "Budget suggestions and ROI projections are estimates only and do not constitute financial advice — actual results may vary significantly.",
                  "AI outbound calling operates on behalf of the Clinic under the Clinic's name; the Clinic is responsible for ensuring this complies with telecoms and data protection law, including PECR.",
                  "The automation on/off toggle switches between fully automated campaign changes and manual sign-off — the Clinic is responsible for monitoring performance in manual mode.",
                ]}
              />
            </SectionShell>

            <SectionShell
              id="s8"
              index="08"
              icon={FiAward}
              title="Intellectual Property"
            >
              <p>
                All intellectual property rights in the Platform — including its
                source code, design, AI models, algorithms, and documentation —
                are owned by DistalFlo AI Ltd. Nothing in these Terms grants the
                Clinic any rights beyond the limited licence set out in clause
                6.
              </p>
              <p>
                Patient Data, campaign assets uploaded by the Clinic, and
                branding materials provided by the Clinic remain the property of
                the Clinic. The Clinic grants DistalFlo a limited licence to
                process such data and materials solely to deliver the Platform
                services during the subscription period.
              </p>
              <Callout>
                DistalFlo may use anonymised, aggregated, non-identifiable data
                derived from Platform usage to improve the Platform and its AI
                features. No Patient Data or Clinic-identifiable data is used
                for this purpose without explicit consent.
              </Callout>
            </SectionShell>

            <SectionShell
              id="s9"
              index="09"
              icon={FiDatabase}
              title="Data Protection"
            >
              <p>
                Both parties acknowledge their respective obligations under UK
                GDPR and the Data Protection Act 2018. The Clinic acts as Data
                Controller in respect of Patient Data; DistalFlo acts as Data
                Processor, processing Patient Data on behalf of the Clinic.
              </p>
              <p>
                Processing of Patient Data by DistalFlo is governed by the
                DistalFlo Data Processing Agreement, incorporated into these
                Terms by reference and accepted alongside these Terms at
                sign-up.
              </p>
              <p>
                All Patient Data is stored on Amazon Web Services infrastructure
                hosted within the United Kingdom (AWS London Region, eu-west-2).
                No Patient Data is transferred outside the UK without the
                Clinic's prior written consent.
              </p>
            </SectionShell>

            <SectionShell
              id="s10"
              index="10"
              icon={FiTrash2}
              title="GDPR Data Deletion"
            >
              <p>
                DistalFlo provides a built-in data deletion workflow to support
                the Right to Erasure under UK GDPR Article 17. Clinic admins may
                process deletion requests directly within the Platform via the
                Data Deletion Request button on each patient card.
              </p>
              <List
                items={[
                  "The clinic admin initiates the request.",
                  "A confirmation screen requires the admin to type the patient name or the word DELETE before the deletion can proceed.",
                  "A 24-hour hold period applies before deletion becomes permanent, and can be cancelled within that window.",
                  "On execution, all data associated with the patient record is deleted from all Platform tables.",
                  "A PDF audit record is automatically generated and emailed to the clinic admin and to the DistalFlo super-admin inbox.",
                ]}
              />
              <Callout>
                The PDF audit record includes: patient name, deletion request
                date, deletion execution date, list of data fields deleted, name
                of the admin who actioned the deletion, and the clinic name.
                This record is retained in the DistalFlo audit log for
                compliance purposes. The full step-by-step ledger is set out in
                the Privacy Policy, section 6.
              </Callout>
            </SectionShell>

            <SectionShell
              id="s11"
              index="11"
              icon={FiShield}
              title="Limitation of Liability"
            >
              <p>
                Nothing in these Terms excludes or limits DistalFlo's liability
                for death or personal injury caused by negligence, fraud or
                fraudulent misrepresentation, or any other liability that cannot
                lawfully be excluded.
              </p>
              <p>
                Subject to the above, DistalFlo's total aggregate liability to
                the Clinic under or in connection with these Terms shall not
                exceed the total subscription fees paid by the Clinic in the 12
                months immediately preceding the event giving rise to the claim.
              </p>
              <p>
                DistalFlo shall not be liable for any indirect, consequential,
                special, or punitive loss or damage, loss of profits, loss of
                revenue, loss of anticipated savings, loss of business, or loss
                of data.
              </p>
              <p>
                DistalFlo does not warrant that the Platform will be
                uninterrupted or error-free. The Platform is provided on an "as
                is" basis.
              </p>
            </SectionShell>

            <SectionShell
              id="s12"
              index="12"
              icon={FiLock}
              title="Confidentiality"
            >
              <p>
                Each party agrees to keep the other party's confidential
                information strictly confidential and not to disclose it to any
                third party without prior written consent. Confidential
                information includes, without limitation, pricing, business
                strategies, technical specifications, and Patient Data.
              </p>
            </SectionShell>

            <SectionShell
              id="s13"
              index="13"
              icon={FiXCircle}
              title="Termination"
            >
              <p>
                DistalFlo may suspend or terminate the Clinic's access to the
                Platform immediately on written notice if the Clinic materially
                breaches these Terms and fails to remedy the breach within 14
                days of written notice, becomes insolvent or enters
                administration, or uses the Platform in a manner that poses a
                legal, regulatory, or reputational risk.
              </p>
              <p>
                On termination for any reason, all Clinic and Patient Data will
                be retained for 30 days, during which the Clinic may request a
                data export. After 30 days, all data will be permanently
                deleted.
              </p>
            </SectionShell>

            <SectionShell
              id="s14"
              index="14"
              icon={FaBalanceScale}
              title="Governing Law"
            >
              <p>
                These Terms are governed by and construed in accordance with the
                laws of England and Wales. Any dispute arising out of or in
                connection with these Terms is subject to the exclusive
                jurisdiction of the courts of England and Wales.
              </p>
              <p>
                Before initiating legal proceedings, both parties agree to
                attempt to resolve any dispute through good faith negotiation
                for a period of 30 days following written notice of the dispute.
              </p>
            </SectionShell>

            <SectionShell id="s15" index="15" icon={FiList} title="General">
              <dl className="space-y-3">
                <Term
                  term="Entire agreement"
                  def="These Terms, together with the Privacy Policy and Data Processing Agreement, constitute the entire agreement between the parties."
                />
                <Term
                  term="Variation"
                  def="DistalFlo may update these Terms from time to time. The Clinic will be notified of material changes by email at least 30 days before they take effect. Continued use after the effective date constitutes acceptance."
                />
                <Term
                  term="Severability"
                  def="If any provision is found invalid or unenforceable, the remaining provisions continue in full force and effect."
                />
                <Term
                  term="Assignment"
                  def="The Clinic may not assign or transfer any rights or obligations under these Terms without DistalFlo's prior written consent."
                />
                <Term
                  term="Notices"
                  def="All legal notices must be sent to hello@distalflo.co.uk (DistalFlo) or to the email address registered on the Clinic's account."
                />
              </dl>
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
