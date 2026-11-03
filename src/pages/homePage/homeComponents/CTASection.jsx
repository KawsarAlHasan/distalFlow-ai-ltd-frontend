import { motion } from "framer-motion";

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
  show: { transition: { staggerChildren: 0.15 } },
};

export default function CTASection() {
  return (
    <section className="bg-[#1d1029]">
      <div className="py-32 overflow-hidden">
        <motion.div
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={container}
        >
          <motion.h2
            variants={fadeUp}
            className="cormorantFont secondColor text-4xl sm:text-5xl lg:text-[60px] font-[500] mb-5 leading-tight"
          >
            Ready to transform your clinic?
          </motion.h2>
          {/* <motion.p
            variants={fadeUp}
            className="subTitleText text-sm sm:text-[20px] mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            Join hundreds of forward-thinking healthcare practices using
            DistalFlo AI to automate growth and improve patient experience.
          </motion.p> */}

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="mainBtn flex items-center gap-2 text-sm font-bold px-6 py-3.5 rounded-lg transition-colors hover:opacity-90"
              style={{
                border: "none",
              }}
            >
              Request Access
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="border border-white/25 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/5 hover:border-white/40 transition-all text-sm"
            >
              Talk to Sales
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
