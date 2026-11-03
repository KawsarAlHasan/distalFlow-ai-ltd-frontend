import React from "react";
import { Card } from "antd";
import { motion } from "framer-motion";
import {
  RiPhoneLine,
  RiBarChartBoxLine,
  RiCalendarCheckLine,
  RiFilterLine,
  RiLineChartLine,
  RiRefreshLine,
  RiSearchLine,
  RiMessage2Line,
  RiShieldCheckLine,
  RiMedalLine,
} from "react-icons/ri";

const GOLD = "#B8960C";
const CREAM = "#F0EDE6";
const DARK = "#1C1A14";

const features = [
  {
    icon: <RiPhoneLine size={22} />,
    title: "AI Lead Nurturing",
    desc: "Calls, SMS, email & WhatsApp automated follow-up.",
  },
  {
    icon: <RiBarChartBoxLine size={22} />,
    title: "Smart Campaigns",
    desc: "AI-optimised campaigns that convert.",
  },
  {
    icon: <RiCalendarCheckLine size={22} />,
    title: "Appointment Booking",
    desc: "Fill your diary with qualified patients.",
  },
  {
    icon: <RiFilterLine size={22} />,
    title: "Pipeline Management",
    desc: "Full visibility from lead to loyal patient.",
  },
  {
    icon: <RiLineChartLine size={22} />,
    title: "Revenue Analytics",
    desc: "Track ROI and grow profitably.",
  },
  {
    icon: <RiRefreshLine size={22} />,
    title: "Automated Workflows",
    desc: "Save hours every day with no manual follow-up.",
  },
];

const pipeline = [
  {
    icon: <RiSearchLine size={20} />,
    label: "Find",
    desc: "AI-powered campaigns attract the right patients",
  },
  {
    icon: <RiMessage2Line size={20} />,
    label: "Nurture",
    desc: "Automated follow-up builds trust and engagement",
  },
  {
    icon: <RiFilterLine size={20} />,
    label: "Qualify",
    desc: "AI qualifies intent and identifies high-value leads",
  },
  {
    icon: <RiCalendarCheckLine size={20} />,
    label: "Convert",
    desc: "Seamless booking fills your appointment book",
  },
  {
    icon: <RiMedalLine size={20} />,
    label: "Retain",
    desc: "Ongoing automation turns patients into loyal advocates",
  },
];

const clinics = [
  { name: "THE OXFORD", sub: "SMILE CLINICS" },
  // { name: "HARLEY STREET", sub: "DENTAL CLINIC" },
  // { name: "THE COSMETIC", sub: "CLINIC" },
  // { name: "PURE SMILE", sub: "DENTAL" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -70 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 70 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85, y: 40 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

export default function FeaturesSection() {
  return (
    <div
      id="features"
      className="min-h-screen w-full font-sans"
      style={{ backgroundColor: CREAM, color: DARK }}
    >
      {/* Top nav bar */}
      <motion.div
        className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 px-5 sm:px-8 lg:px-10 pt-6 sm:pt-7 pb-5 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <p className="cormorantFont font-semibold text-[#5A4F63] text-[12px] sm:text-[14px] tracking-widest uppercase">
          Trusted by leading private clinics
        </p>
        <motion.div
          className="flex flex-wrap gap-6 sm:gap-10"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {clinics.map((c) => (
            <motion.div variants={scaleIn} key={c.name} className="text-center">
              <p
                className="text-xs font-semibold tracking-widest"
                style={{ color: DARK, letterSpacing: "0.13em" }}
              >
                {c.name}
              </p>
              <p
                className="text-xs tracking-widest mt-2 sm:mt-3"
                style={{ color: "#7A7060", letterSpacing: "0.11em" }}
              >
                {c.sub}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <div className="border-t border-[#E5DDCD]"></div>

      {/* Main content */}
      <div className="w-full px-5 sm:px-8 lg:px-10 py-10 sm:py-14 lg:py-16 flex flex-col lg:flex-row gap-10 lg:gap-10 items-start max-w-7xl mx-auto">
        {/* Left column */}
        <motion.div
          className="flex-1 min-w-0 w-full"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={container}
        >
          <motion.h1
            variants={fadeLeft}
            className="leading-tight mb-4 sm:mb-5 text-[30px] sm:text-[38px] lg:text-[48px] cormorantFont font-semibold text-[#1F1330]"
            style={{ maxWidth: 520 }}
          >
            Everything You Need to Grow Your Clinic
          </motion.h1>
          <motion.p
            variants={fadeLeft}
            className="text-[15px] sm:text-[17px] lg:text-[18px] leading-relaxed mb-8 sm:mb-10"
            style={{ color: "#5C5546", maxWidth: 520 }}
          >
            DistalFlo automates your entire patient acquisition journey — from
            first ad click to booked appointment and beyond.
          </motion.p>

          {/* Feature list */}
          <div className="flex flex-col gap-5 sm:gap-6">
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeLeft}
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-3 sm:gap-4"
              >
                {/* Icon circle */}
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "#E8E3D9",
                    color: GOLD,
                    border: `1px solid #D4CCBF`,
                  }}
                >
                  {f.icon}
                </div>
                <div>
                  <p className="text-[16px] sm:text-[17px] lg:text-[18px] font-semibold mb-0.5 text-[#1F1330]">
                    {f.title}
                  </p>
                  <p className="text-[13px] sm:text-[14px] text-[#5A4F63]">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right column — DistalFlo System card */}
        <motion.div
          className="flex flex-col gap-5 w-full lg:w-[560px] lg:flex-shrink-0 lg:mt-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={container}
        >
          <motion.div variants={fadeRight}>
            <Card
              variant="borderless"
              className="rounded-2xl"
              style={{
                backgroundColor: "#FFFFFF",
                boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
              }}
              styles={{ body: { padding: "24px 20px" } }}
              // Larger padding on bigger screens via CSS below
            >
              <div className="sm:hidden">
                {/* mobile padding handled by Card body inline style above */}
              </div>
              <h2 className="text-[24px] sm:text-[27px] lg:text-[30px] mb-1 cormorantFont font-semibold text-[#1F1330]">
                The DistalFlo System
              </h2>
              <p className="text-[13px] sm:text-[14px] mb-6 sm:mb-8 text-[#5A4F63]">
                Find. Nurture. Convert. — Automatically.
              </p>

              <motion.div
                className="relative flex flex-col"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
              >
                {pipeline.map((p, i) => (
                  <motion.div
                    variants={scaleIn}
                    whileHover={{ x: 6 }}
                    key={p.label}
                    className="relative flex items-start gap-3 sm:gap-4 pb-7 sm:pb-8 last:pb-0"
                  >
                    {/* connecting line */}
                    {i < pipeline.length - 1 && (
                      <span
                        className="absolute left-[21px] sm:left-[25px] top-[46px] sm:top-[52px] w-[2px] bottom-0"
                        style={{ backgroundColor: "#E8E3D9" }}
                        aria-hidden="true"
                      />
                    )}

                    {/* Dark circle icon */}
                    <div className="relative z-10 flex items-center justify-center w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] rounded-full flex-shrink-0 text-[#B8884A] bg-[#1F1330] border-2 border-[#B8884A]">
                      {p.icon}
                    </div>
                    <div className="flex-1 min-w-0 pt-1 sm:pt-2">
                      <p className="text-[15px] sm:text-[16px] font-semibold mb-1 text-[#1F1330]">
                        {p.label}
                      </p>
                      <p className="text-[12px] sm:text-[13px] leading-snug text-[#5A4F63]">
                        {p.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}