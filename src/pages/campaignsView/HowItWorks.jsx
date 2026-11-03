import React from "react";
import { motion } from "framer-motion";

const defaultSteps = [
  {
    number: 1,
    title: "Free Smile Consultation",
    description:
      "Tell us about your smile and what you'd like to change. Our dental team reviews your case and recommends a plan — completely free, no pressure.",
  },
  {
    number: 2,
    title: "3D Scan & Treatment Plan",
    description:
      "Visit us in Oxford or Didcot for a full oral health check and a precision 3D scan. We design your aligners and show you a digital preview of your result before you commit.",
  },
  {
    number: 3,
    title: "Wear & Transform",
    description:
      "Your custom aligners are delivered to the clinic. Wear them 22 hours a day, swapping to a new set every 1–2 weeks. Your dentist checks your progress throughout.",
  },
];

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
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stepContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.3,
    },
  },
};

const circlePop = {
  hidden: { opacity: 0, scale: 0, rotate: -180 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 200, damping: 14 },
  },
};

const stepText = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HowItWorks({
  steps = defaultSteps,
  title = "Three steps to your\nnew smile.",
  subtitle = "The whole process is straightforward, dentist-led, and at your own pace.",
  badge = "How It Works",
}) {
  return (
    <section className="bg-[#1c1826] py-16 sm:py-20 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={container}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-3 mb-4 text-[#d9b46a] text-xs tracking-[0.2em] font-semibold uppercase"
          >
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 24 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="h-px bg-[#d9b46a] inline-block"
            />
            How It Works
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-serif text-4xl sm:text-5xl font-bold text-white leading-[1.15] mb-5"
          >
            Three steps to your
            <br />
            new smile.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-gray-400 text-[15px] max-w-md mx-auto leading-relaxed"
          >
            The whole process is straightforward, dentist-led, and at your
            own pace.
          </motion.p>
        </motion.div>

        {/* STEPS */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stepContainer}
          className="relative grid grid-cols-1 sm:grid-cols-3 gap-y-14 gap-x-6"
        >
          {/* CONNECTING LINE (desktop only) */}
          <div className="hidden sm:block absolute top-8 left-0 right-0 px-[16.66%] z-0">
            <div className="relative h-px w-full bg-[#3a3444]">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ originX: 0 }}
                className="absolute inset-0 h-px bg-gradient-to-r from-[#d9b46a] via-[#d9b46a] to-[#d9b46a]"
              />
            </div>
          </div>

          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={stepText}
              className="relative flex flex-col items-center text-center px-2"
            >
              {/* NUMBER CIRCLE (with solid backing to mask the line behind it) */}
              <motion.div
                variants={circlePop}
                whileHover={{
                  scale: 1.15,
                  boxShadow: "0 0 0 6px rgba(217,180,106,0.15)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="relative z-10 w-16 h-16 rounded-full bg-[#1c1826] flex items-center justify-center mb-5 cursor-default"
              >
                <div className="absolute inset-0 rounded-full bg-[#d9b46a]/20 border-2 border-[#d9b46a]" />
                <span className="relative font-serif text-xl font-bold text-[#d9b46a]">
                  {step.number}
                </span>
              </motion.div>

              <motion.h3
                variants={stepText}
                className="text-white font-bold text-[15px] mb-3"
              >
                {step.title}
              </motion.h3>

              <motion.p
                variants={stepText}
                className="text-gray-400 text-[14px] leading-relaxed max-w-xs"
              >
                {step.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}