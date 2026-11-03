import React from "react";
import { Input, Select, Button, Image } from "antd";
import { motion } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt, FaArrowRight, FaStar } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";

const { Option } = Select;

/**
 * CampaignHero
 *
 * New props for Part 3 requirements:
 * - rating: number            e.g. 4.9
 * - reviewCount: number       e.g. 340
 * - treatmentOptions: [{ value, label }]  — list shown in the dropdown
 * - lockedTreatment: string | null        — if set, dropdown is pre-selected + disabled
 * - hideTreatmentSelect: boolean          — if true, dropdown is not rendered at all
 */
export default function CampaignHero({
  container,
  fadeUp,
  campaignName,
  rating = 4.9,
  reviewCount = 340,
  treatmentOptions = [
    { value: "botox", label: "Anti-wrinkle injections" },
    { value: "fillers", label: "Dermal fillers" },
    { value: "skin", label: "Skin treatments" },
  ],
  lockedTreatment = null,
  hideTreatmentSelect = false,
  heroBadge,
  headline,
  subheadline,
  bodyCopy,
  cta = "Claim my free consultation",
  whatsappCta = "WhatsApp Us",
  heroHighlights,
  formBadge = "FREE CONSULTATION",
  formTitle = "Book Your Free Consultation",
  formSubtitle = "No charge. No obligation. Tell us what you'd like to achieve and we'll guide you through your options.",
  formButtonText = "Claim my free consultation",
  formCallbackText = "We'll call you within 5 minutes — Mon to Sat, 8am–8pm.",
  formGuarantees,
  phone = "01235 643729",
}) {
  const showTreatmentSelect = !hideTreatmentSelect && treatmentOptions.length > 0;

  return (
    <main className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 py-12 sm:py-16 max-w-7xl mx-auto px-2">
      {/* LEFT CONTENT */}
      <motion.div
        className="flex flex-col justify-center order-2 lg:order-1"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.div
          custom={0}
          variants={fadeUp}
          className="flex items-center gap-3 mb-4 text-[#d9b46a] text-xs tracking-[0.2em] font-semibold uppercase"
        >
          <span className="w-6 h-px bg-[#d9b46a]" />
          {heroBadge || campaignName}
          <span className="w-6 h-px bg-[#d9b46a]" />
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-3"
        >
          {heroBadge || campaignName} in
          <br />
          Oxford &amp; Didcot —
          <br />
          <span className="italic font-normal text-[#e8c98a]">
            done properly.
          </span>
        </motion.h1>

        {/* SOCIAL PROOF — rating + patient count, above the fold, next to headline */}
        <motion.div
          custom={1.5}
          variants={fadeUp}
          className="flex items-center gap-2 mb-5 text-sm sm:text-[15px] text-gray-200"
        >
          <span className="flex items-center gap-0.5 text-[#d9b46a]">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < Math.round(rating) ? "text-[#d9b46a]" : "text-gray-600"
                }
                size={14}
              />
            ))}
          </span>
          <span className="font-semibold text-white">
            {rating.toFixed(1)} ★
          </span>
          <span className="text-gray-400">
            from {reviewCount.toLocaleString()} patients
          </span>
        </motion.div>

        <motion.p
          custom={2}
          variants={fadeUp}
          className="text-gray-300 max-w-md mb-8 leading-relaxed text-[15px] sm:text-base"
        >
          {bodyCopy || "A CQC-regulated clinic with medically-trained practitioners, Harley Street standards and a full range of non-surgical treatments. Your free consultation is waiting."}
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          className="flex flex-wrap gap-3 sm:gap-4 mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto"
          >
            <Button className="!bg-[#d9b46a] !border-none !text-[#1c1826] !font-bold !h-12 !px-6 !w-full sm:!w-auto hover:!brightness-110 !transition-all">
              {cta}{" "}
              <FaArrowRight className="inline ml-1" />
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto"
          >
            <Button className="!bg-transparent !border !border-gray-500 !text-white !font-semibold !h-12 !px-6 !w-full sm:!w-auto hover:!border-[#d9b46a] hover:!text-[#d9b46a] !transition-all">
              <FaWhatsapp className="inline mr-2 text-base" />
              {whatsappCta}
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          custom={4}
          variants={fadeUp}
          className="flex flex-wrap gap-x-6 sm:gap-x-8 gap-y-2.5 text-gray-400 text-sm"
        >
          <span className="flex items-center gap-2">
            <HiOutlineSparkles className="text-[#d9b46a] flex-shrink-0" />
            Free consultation, no obligation
          </span>
          <span className="flex items-center gap-2">
            <HiOutlineSparkles className="text-[#d9b46a] flex-shrink-0" />
            Medically-trained practitioners
          </span>
          <span className="flex items-center gap-2">
            <HiOutlineSparkles className="text-[#d9b46a] flex-shrink-0" />
            No surgery, no downtime
          </span>
          <span className="flex items-center gap-2">
            <HiOutlineSparkles className="text-[#d9b46a] flex-shrink-0" />
            Results in days
          </span>
        </motion.div>
      </motion.div>

      {/* RIGHT FORM CARD */}
      <motion.div
        className="flex justify-center lg:justify-end items-start order-1 lg:order-2"
        initial={{ opacity: 0, x: 70, scale: 0.96 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-full max-w-md bg-white text-gray-800 rounded-lg overflow-hidden shadow-2xl border-t-4 border-[#d9b46a]">
          <div className="bg-[#241f30] px-5 sm:px-6 py-5 sm:py-6">
            <span className="inline-block bg-[#d9b46a] text-[#1c1826] text-[11px] sm:text-xs font-bold px-3 py-1 rounded mb-3 tracking-wide">
              FREE CONSULTATION
            </span>
            <h2 className="text-white text-xl sm:text-2xl font-bold mb-2 leading-snug">
              Book Your Free Consultation
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              No charge. No obligation. Tell us what you'd like to achieve and
              we'll guide you through your options.
            </p>
          </div>

          <motion.div
            className="p-5 sm:p-6 space-y-4 font-sans"
            initial="hidden"
            animate="show"
            variants={container}
          >
            <motion.div
              custom={0}
              variants={fadeUp}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 tracking-wide">
                  FIRST NAME
                </label>
                <Input placeholder="Emma" size="large" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 tracking-wide">
                  LAST NAME
                </label>
                <Input placeholder="Jones" size="large" />
              </div>
            </motion.div>

            <motion.div custom={1} variants={fadeUp}>
              <label className="block text-xs font-bold text-gray-600 mb-1 tracking-wide">
                PHONE NUMBER
              </label>
              <Input placeholder="07700 900000" size="large" />
            </motion.div>

            <motion.div custom={2} variants={fadeUp}>
              <label className="block text-xs font-bold text-gray-600 mb-1 tracking-wide">
                EMAIL ADDRESS
              </label>
              <Input placeholder="emma@email.com" size="large" />
            </motion.div>

            {/* TREATMENT DROPDOWN — pre-selected & locked, or hidden, per campaign */}
            {/* {showTreatmentSelect && (
              <motion.div custom={3} variants={fadeUp}>
                <label className="block text-xs font-bold text-gray-600 mb-1 tracking-wide">
                  I'M INTERESTED IN...
                </label>
                <Select
                  placeholder="Select a treatment..."
                  size="large"
                  className="w-full"
                  value={lockedTreatment || undefined}
                  defaultValue={lockedTreatment || undefined}
                  disabled={!!lockedTreatment}
                >
                  {treatmentOptions.map((opt) => (
                    <Option key={opt.value} value={opt.value}>
                      {opt.label}
                    </Option>
                  ))}
                </Select>
              </motion.div>
            )} */}

            {/* If locked, submit hidden field so the value still posts */}
            {lockedTreatment && (
              <input type="hidden" name="treatment" value={lockedTreatment} />
            )}

            <motion.div custom={4} variants={fadeUp}>
              <label className="block text-xs font-bold text-gray-600 mb-1 tracking-wide">
                PREFERRED CLINIC
              </label>
              <Select defaultValue="none" size="large" className="w-full">
                <Option value="none">No preference</Option>
                <Option value="oxford">Oxford</Option>
                <Option value="didcot">Didcot</Option>
              </Select>
            </motion.div>

            <motion.div custom={5} variants={fadeUp}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="!bg-[#d9b46a] !border-none !text-[#1c1826] !font-bold !w-full !h-12 !mt-2 hover:!brightness-110 !transition-all">
                  {cta}{" "}
                  <FaArrowRight className="inline ml-1" />
                </Button>
              </motion.div>
            </motion.div>

            {/* 5-MINUTE CALLBACK COMMITMENT — directly below submit button */}
            <motion.div
              custom={6}
              variants={fadeUp}
              className="text-center text-xs font-semibold text-[#c08a2e] pt-1"
            >
              We'll call you within 5 minutes — Mon to Sat, 8am–8pm.
            </motion.div>

            <motion.div
              custom={7}
              variants={fadeUp}
              className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-500 pt-2 text-center"
            >
              <span>✓ Completely free</span>
              <span>✓ No hard sell</span>
              <span>✓ We'll reply promptly</span>
            </motion.div>

            <motion.div
              custom={8}
              variants={fadeUp}
              className="text-center text-xs text-gray-500 pt-1"
            >
              Call us:{" "}
              <span className="text-[#c08a2e] font-semibold">01235 643729</span>{" "}
              · <span className="text-[#c08a2e] font-semibold">WhatsApp</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}