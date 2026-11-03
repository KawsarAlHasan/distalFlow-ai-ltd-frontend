import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi";

const faqs = [
  {
    q: "How does the AI Call Agent sound?",
    a: "Our AI uses native British voices trained specifically for healthcare. Most patients can't tell the difference — and that's exactly the point. You can listen to a demo on our website.",
  },
  {
    q: "Does it integrate with my existing PMS?",
    a: "Yes. DistalFlo integrates natively with CareStack for two-way syncing of appointments, patient records, and treatment history. Additional PMS integrations are on the roadmap.",
  },
  {
    q: "Is patient data secure and compliant?",
    a: "Absolutely. We are fully GDPR-compliant and follow strict NHS data standards. All patient data is encrypted at rest and in transit. We never sell or share patient data with third parties.",
  },
  {
    q: "How long does it take to set up?",
    a: "Most clinics are live within 5–7 business days. Our dedicated onboarding team handles all the technical setup, so you don't need any technical knowledge.",
  },
  {
    q: "Can I use it for multiple clinic locations?",
    a: "Yes. Multi-location support is available on the Enterprise tier only, by contacting us directly.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section id="faq" className="bg-[#170e21] py-16">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={container}
        >
          <motion.h2
            variants={fadeUp}
            className="cormorantFont text-[38px] font-semibold secondColor mb-2"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p variants={fadeUp} className="subTitleText text-[18px]">
            Got questions? We've got answers.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col bg-[#251636] border border-[#3A2750] rounded-2xl p-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
        >
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className="border-b border-[#3A2750] last:border-b-0">
                <button
                  className="cursor-pointer w-full flex items-center justify-between py-5 text-left gap-4 bg-transparent border-none"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                >
                  <span className="secondColor text-[16px] font-normal">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-shrink-0"
                  >
                    <HiChevronDown size={18} className="secondColor" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-white/60 text-[14px] leading-relaxed pb-5">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}