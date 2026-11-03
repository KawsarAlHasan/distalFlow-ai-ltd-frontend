import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const defaultFaqs = [
  {
    question: "Am I a suitable candidate for clear aligners?",
    answer:
      "Most people with mild to moderate crowding, gaps, or bite issues are suitable. The best way to know for sure is a free consultation and 3D scan — our team will assess your case and let you know honestly whether aligners are right for you.",
  },
  {
    question: "How long will treatment take?",
    answer:
      "Treatment typically takes between 4 and 12 months depending on the complexity of your case. Simpler cases involving minor spacing can be as quick as a few months, while more complex cases may take closer to a year.",
  },
  {
    question: "Will people be able to see them?",
    answer:
      "Clear aligners are virtually invisible in everyday wear. They're made from clear medical-grade plastic that sits closely over your teeth, so most people won't notice you're wearing them at all.",
  },
  {
    question: "What is 0% finance — and do I qualify?",
    answer:
      "0% finance lets you spread the cost of treatment over several months with no added interest. Most patients qualify subject to a simple affordability check — we'll talk you through the options at your consultation.",
  },
  {
    question: "Why are whitening and retainers included?",
    answer:
      "We include teeth whitening and a set of retainers as standard because a great smile doesn't stop once your teeth are straight — retainers protect your result, and whitening helps you finish treatment with a smile you're proud to show off.",
  },
  {
    question: "What's the difference between OSTC and Invisalign®?",
    answer:
      "Invisalign® is one specific brand of clear aligner system. OSTC (Orthodontic Short Term Cosmetic treatment) refers to a broader approach focused on cosmetic alignment of the front teeth. Which one suits you best depends on your case — we'll recommend the right option at your consultation.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
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

const itemVariant = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function TreatmentFAQ({
  phone = "01235 643729",
  faqs = defaultFaqs,
  title = "Common questions.",
  subtitle,
  badge = "FAQ",
}) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section className="bg-white py-16 sm:py-20 px-4 overflow-hidden">
      <div className="max-w-3xl mx-auto">
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
            FAQ
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-serif text-4xl sm:text-5xl font-bold text-[#1c1826] leading-[1.15] mb-4"
          >
            Common questions.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-gray-500 text-[15px]"
          >
            Still unsure? Call{" "}
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="text-[#c08a2e] font-bold underline underline-offset-2 hover:text-[#a8721f] transition-colors"
            >
              {phone}
            </a>{" "}
            — we're happy to chat.
          </motion.p>
        </motion.div>

        {/* ACCORDION */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={container}
          className="border border-gray-200 rounded-lg overflow-hidden bg-white"
        >
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                variants={itemVariant}
                className={i !== 0 ? "border-t border-gray-200" : ""}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left group"
                >
                  <span className="font-bold text-[#1c1826] text-[14px] sm:text-[15px]">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-shrink-0 text-[#d9b46a]"
                  >
                    <FaChevronDown size={13} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: 0.25 },
                      }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 sm:px-6 pb-4 sm:pb-5 text-gray-500 text-[14px] leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}