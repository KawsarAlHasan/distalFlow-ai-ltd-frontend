import React from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

const defaultCredentials = [
  "PhD & Masters in Clinical Oral Surgery (with distinction) — UCL Eastman",
  "Diploma in Implant Dentistry — Harley Street & University of Warwick",
  "Member of the Royal College of Surgeons of England",
  "Higher surgical training: Barts & the Royal London Hospitals",
  "Dentistry Awards 2024 Finalist",
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
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

const listItem = {
  hidden: { opacity: 0, x: -30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function DoctorSection({
  name = "Mr Alaa Aldaadaa",
  title = "Consultant Oral Surgeon & Implant Specialist · GDC Registered",
  photoSrc = "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg",
  badgeTitle = "PhD",
  badgeSubtitle = "UCL Eastman\nDental Institute",
  description,
  credentials = defaultCredentials,
}) {
  return (
    <section className="bg-[#1c1826] py-16 sm:py-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* PHOTO */}
        <motion.div
          initial={{ opacity: 0, x: -70, scale: 0.9, rotate: -3 }}
          whileInView={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 80, damping: 14 }}
          className="relative w-full max-w-sm mx-auto lg:mx-0"
        >
          <div className="rounded-lg overflow-hidden border border-white/10">
            <img
              src={photoSrc}
              alt={name}
              className="w-full h-auto object-cover aspect-[4/5]"
            />
          </div>

          {/* CREDENTIAL BADGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 30, rotate: 6 }}
            whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 12,
              delay: 0.6,
            }}
            whileHover={{ scale: 1.06, rotate: -2 }}
            className="absolute -bottom-6 -right-4 sm:-right-8 bg-[#d9b46a] rounded-lg px-5 py-3 shadow-xl cursor-default"
          >
            <div className="font-serif text-2xl font-bold text-[#1c1826] leading-none">
              {badgeTitle}
            </div>
            <div className="text-[10px] font-bold text-[#1c1826]/80 tracking-wide uppercase mt-1.5 whitespace-pre-line leading-tight">
              {badgeSubtitle}
            </div>
          </motion.div>
        </motion.div>

        {/* CONTENT */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3 mb-4 text-[#d9b46a] text-xs tracking-[0.2em] font-semibold uppercase"
          >
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 24 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="h-px bg-[#d9b46a] inline-block"
            />
            Your Surgeon
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-serif text-4xl sm:text-5xl font-bold text-white leading-[1.15] mb-3"
          >
            {name}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-[#d9b46a] font-semibold text-[15px] mb-6"
          >
            {title}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-gray-300 text-[15px] leading-relaxed mb-4"
          >
            Alaa — or "Al" as his patients know him — is a multi-award-winning
            oral surgeon and one of a handful of surgeons in the UK with
            triple higher training: a PhD, a Master's in Clinical Oral
            Surgery (with distinction), and a Diploma in Implant Dentistry.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-gray-300 text-[15px] leading-relaxed mb-7"
          >
            He trained at Barts & the Royal London Hospitals, completed
            higher surgical training at the UCL Eastman Dental Institute, and
            has trained in implant dentistry at Harley Street and in
            Germany. His research includes 3D craniofacial reconstruction
            and bone regeneration — so even complex cases are well within
            his expertise.
          </motion.p>

          <motion.ul
            variants={container}
            className="space-y-3"
          >
            {credentials.map((item, i) => (
              <motion.li
                key={i}
                variants={listItem}
                className="flex items-start gap-3 text-gray-200 text-[14px]"
              >
                <motion.span
                  initial={{ scale: 0, rotate: -90 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 12,
                    delay: 0.3 + i * 0.1,
                  }}
                  className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-[#d9b46a]/20 flex items-center justify-center"
                >
                  <FaCheck className="text-[#d9b46a]" size={9} />
                </motion.span>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}