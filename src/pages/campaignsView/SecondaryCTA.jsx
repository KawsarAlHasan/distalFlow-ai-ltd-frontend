import React from "react";
import { Input, Select, Button } from "antd";
import { motion } from "framer-motion";
import { FaArrowRight, FaWhatsapp, FaCheck } from "react-icons/fa";

const { TextArea } = Input;
const { Option } = Select;

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const fieldFadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SecondaryCTA({
  phone = "01235 643729",
  concernOptions = [
    { value: "crowding", label: "Crowding" },
    { value: "gaps", label: "Gaps / Spacing" },
    { value: "bite", label: "Bite Issues" },
    { value: "other", label: "Something else" },
  ],
}) {
  return (
    <section className="bg-[#f7f5f2] py-16 sm:py-20 px-4 overflow-hidden">
      <div className="max-w-2xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={container}
          className="text-center mb-12"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-3 mb-4 text-[#c08a2e] text-xs tracking-[0.2em] font-semibold uppercase"
          >
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 24 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="h-px bg-[#c08a2e] inline-block"
            />
            Book Now
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-serif text-4xl sm:text-5xl font-bold text-[#1c1826] leading-[1.15] mb-4"
          >
            Ready to see what's possible?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-gray-500 text-[15px] leading-relaxed max-w-xl mx-auto"
          >
            Book your free consultation — we'll assess your smile, answer every
            question, and show you exactly what treatment would look like for
            you. Zero cost, zero obligation.
          </motion.p>
        </motion.div>

        {/* FORM CARD */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ type: "spring", stiffness: 90, damping: 16 }}
          className="bg-white rounded-lg shadow-xl p-6 sm:p-10"
        >
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={container}
            className="space-y-5"
          >
            {/* NAME ROW */}
            <motion.div
              variants={fieldFadeUp}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 tracking-wide">
                  FIRST NAME
                </label>
                <Input placeholder="Alex" size="large" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 tracking-wide">
                  LAST NAME
                </label>
                <Input placeholder="Smith" size="large" />
              </div>
            </motion.div>

            {/* PHONE / EMAIL ROW */}
            <motion.div
              variants={fieldFadeUp}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 tracking-wide">
                  PHONE NUMBER
                </label>
                <Input placeholder="07700 900000" size="large" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 tracking-wide">
                  EMAIL ADDRESS
                </label>
                <Input placeholder="alex@email.com" size="large" />
              </div>
            </motion.div>

            {/* CONCERN / CLINIC ROW */}
            <motion.div
              variants={fieldFadeUp}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 tracking-wide">
                  MAIN CONCERN
                </label>
                <Select placeholder="Select..." size="large" className="w-full">
                  {concernOptions.map((opt) => (
                    <Option key={opt.value} value={opt.value}>
                      {opt.label}
                    </Option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 tracking-wide">
                  PREFERRED CLINIC
                </label>
                <Select defaultValue="none" size="large" className="w-full">
                  <Option value="none">No preference</Option>
                  <Option value="oxford">Oxford</Option>
                  <Option value="didcot">Didcot</Option>
                </Select>
              </div>
            </motion.div>

            {/* TIME / PATIENT TYPE ROW */}
            <motion.div
              variants={fieldFadeUp}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 tracking-wide">
                  PREFERRED TIME
                </label>
                <Select defaultValue="none" size="large" className="w-full">
                  <Option value="none">No preference</Option>
                  <Option value="morning">Morning</Option>
                  <Option value="afternoon">Afternoon</Option>
                  <Option value="evening">Evening</Option>
                </Select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 tracking-wide">
                  NEW OR EXISTING PATIENT?
                </label>
                <Select placeholder="Select..." size="large" className="w-full">
                  <Option value="new">New Patient</Option>
                  <Option value="existing">Existing Patient</Option>
                </Select>
              </div>
            </motion.div>

            {/* MESSAGE */}
            <motion.div variants={fieldFadeUp}>
              <label className="block text-xs font-bold text-gray-600 mb-1.5 tracking-wide">
                ANYTHING ELSE? (OPTIONAL)
              </label>
              <TextArea
                placeholder="Any questions, concerns, or context that would be helpful to know before your consultation..."
                rows={3}
              />
            </motion.div>

            {/* SUBMIT */}
            <motion.div variants={fieldFadeUp}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="!bg-[#d9b46a] !border-none !text-[#1c1826] !font-bold !w-full !h-12 hover:!brightness-110 !transition-all">
                  Claim my free consultation{" "}
                  <FaArrowRight className="inline ml-1" />
                </Button>
              </motion.div>
            </motion.div>

            {/* TRUST ROW */}
            <motion.div
              variants={fieldFadeUp}
              className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-xs text-gray-500 pt-1"
            >
              <span className="flex items-center gap-1.5">
                <FaCheck className="text-[#d9b46a]" size={10} />
                100% free, no obligation
              </span>
              <span className="flex items-center gap-1.5">
                <FaCheck className="text-[#d9b46a]" size={10} />
                We'll reply promptly
              </span>
              <span className="flex items-center gap-1.5">
                <FaCheck className="text-[#d9b46a]" size={10} />
                Data never shared
              </span>
            </motion.div>

            {/* CALL / WHATSAPP */}
            <motion.div
              variants={fieldFadeUp}
              className="text-center text-sm text-gray-500 pt-2"
            >
              Prefer to call?{" "}
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="text-[#1c1826] font-bold hover:text-[#c08a2e] transition-colors"
              >
                {phone}
              </a>{" "}
              ·{" "}
              <a
                href="#"
                className="text-[#1c1826] font-bold hover:text-[#c08a2e] transition-colors inline-flex items-center gap-1"
              >
                <FaWhatsapp className="text-[#25D366]" size={14} />
                WhatsApp us
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
