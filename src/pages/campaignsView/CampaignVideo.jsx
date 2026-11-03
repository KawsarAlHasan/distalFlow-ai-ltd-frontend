import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

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
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function CampaignVideo({
  label = "See It For Yourself",
  title = "Watch how it works.",
  subtitle = "A quick look inside the clinic, the process, and the results our patients love — straight from the team who deliver them.",
  videoSrc = "/demo-video.mp4",
  posterSrc = "",
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <section className="bg-white py-16 sm:py-20 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto">
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
            {label}
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-serif text-4xl sm:text-5xl font-bold text-[#1c1826] leading-[1.15] mb-4"
          >
            {title}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-gray-500 text-[15px] leading-relaxed max-w-xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* VIDEO */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            type: "spring",
            stiffness: 90,
            damping: 16,
          }}
          className="relative rounded-lg overflow-hidden shadow-2xl border border-gray-200"
        >
          <div className="relative aspect-video bg-black">
            <video
              ref={videoRef}
              src={videoSrc}
              poster={posterSrc}
              className="w-full h-full object-cover cursor-pointer"
              playsInline
              controls
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />

            {/* PLAY BUTTON OVERLAY */}
            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 16,
                }}
                className="absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/35 transition pointer-events-none"
              >
                <button
                  onClick={togglePlay}
                  className="pointer-events-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#d9b46a] flex items-center justify-center shadow-xl"
                >
                  <FaPlay className="text-[#1c1826] ml-1" size={22} />
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}