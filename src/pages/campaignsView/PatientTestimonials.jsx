import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const defaultTestimonials = [
  {
    quote:
      "It's exactly what I envisaged — you've restored my smile and my confidence. I can eat anything I want again. I genuinely wish I'd done this years ago.",
    name: "Paul",
    detail: "Dental Implants",
    highlight: false,
  },
  {
    quote:
      "Alaa is exceptional. He explained everything at every stage and I felt completely at ease. The result is incredible — no one can tell they're not my real teeth.",
    name: "Margaret",
    detail: "Single Implant, Didcot",
    highlight: false,
  },
  {
    quote:
      "I'd been living with a gap for three years and was terrified of the procedure. The team were so reassuring, and honestly — it was nothing like I feared. Wish I hadn't waited so long.",
    name: "Richard",
    detail: "Multiple Implants, Oxford",
    highlight: true,
  },
];

// Bigger, more noticeable container stagger
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.1,
    },
  },
};

// Cards now travel further, start smaller, and settle with a visible spring
const cardVariant = {
  hidden: { opacity: 0, y: 70, scale: 0.88, rotate: -1.5 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 14,
      mass: 0.9,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

// Stars pop in one-by-one with a little bounce
const starContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const starVariant = {
  hidden: { opacity: 0, scale: 0, rotate: -90 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 260, damping: 12 },
  },
};

const StarRow = ({ count = 5, size = 12, animated = true }) =>
  animated ? (
    <motion.div
      className="flex items-center gap-1"
      variants={starContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.span key={i} variants={starVariant}>
          <FaStar className="text-[#d9b46a]" size={size} />
        </motion.span>
      ))}
    </motion.div>
  ) : (
    <div className="flex items-center gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <FaStar key={i} className="text-[#d9b46a]" size={size} />
      ))}
    </div>
  );

export default function PatientTestimonials({
  rating = 5.0,
  reviewCount = 200,
  testimonials = defaultTestimonials,
  badge = "Patient Stories",
  title = "Real results from\nreal Oxfordshire patients.",
}) {
  return (
    <section className="bg-white py-16 sm:py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* HEADER ROW */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3, margin: "-80px" }}
            variants={container}
          >
            <motion.div
              custom={0}
              variants={fadeUp}
              className="flex items-center gap-3 mb-4 text-[#c08a2e] text-xs tracking-[0.2em] font-semibold uppercase"
            >
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 24 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="h-px bg-[#c08a2e] inline-block"
              />
              Patient Stories
            </motion.div>

            <motion.h2
              custom={1}
              variants={fadeUp}
              className="font-serif text-4xl sm:text-5xl font-bold text-[#1c1826] leading-[1.15]"
            >
              Real results from
              <br />
              real Oxfordshire patients.
            </motion.h2>
          </motion.div>

          {/* RATING BADGE */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.8, rotate: 4 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 12,
              delay: 0.3,
            }}
            whileHover={{ scale: 1.05, rotate: -1 }}
            className="bg-[#f7f5f2] rounded-lg px-6 py-4 w-full sm:w-56 flex-shrink-0 self-start lg:self-auto cursor-default"
          >
            <StarRow count={5} size={14} />
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
              className="text-2xl font-bold text-[#1c1826] mt-1.5"
            >
              {rating.toFixed(1)}
            </motion.div>
            <div className="text-xs text-gray-500 mt-0.5">
              {reviewCount}+ Google Reviews
            </div>
          </motion.div>
        </div>

        {/* TESTIMONIAL CARDS */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15, margin: "-100px" }}
          variants={container}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={cardVariant}
              whileHover={{
                y: -10,
                scale: 1.03,
                boxShadow: "0 20px 40px -12px rgba(0,0,0,0.18)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`bg-[#f7f5f2] rounded-lg p-6 sm:p-7 flex flex-col ${
                t.highlight
                  ? "border border-[#d9b46a]"
                  : "border border-transparent"
              }`}
            >
              <StarRow count={5} size={13} />

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.15 }}
                className="italic text-[#3a3540] text-[15px] leading-relaxed mt-4 mb-6 flex-1"
              >
                "{t.quote}"
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
                className="text-xs font-bold tracking-wide text-[#1c1826] uppercase"
              >
                {t.name} · {t.detail}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}