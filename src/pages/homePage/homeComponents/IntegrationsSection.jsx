import { motion } from "framer-motion";
import { SiWhatsapp } from "react-icons/si";
import { BsDisplay, BsGoogle, BsMeta } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

const integrations = [
  {
    icon: <BsDisplay size={30} className="text-[#c9a84c]" />,
    name: "CareStack",
    desc: "Two-way PMS sync for real-time scheduling and patient records.",
  },
  {
    icon: <SiWhatsapp size={30} className="text-green-400" />,
    name: "WhatsApp",
    desc: "Automated follow-ups that patients actually reply to.",
  },
  {
    icon: <BsMeta size={30} className="text-blue-400" />,
    name: "Meta Ads",
    desc: "Captures intent and surfaces leads from Facebook & Instagram.",
  },
  {
    icon: <FcGoogle size={30} />,
    name: "Google Ads",
    desc: "Track every click through to booked, completed treatment.",
  },
];

// বড়, চোখে পড়ার মতো entrance animation
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8, y: 40 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

export default function IntegrationsSection() {
  return (
    <section id="integrations" className="bg-[#1D1029] py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={container}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl lg:text-[48px] cormorantFont font-semibold secondColor mb-4"
          >
            Connects with your stack
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="subTitleText text-[18px] max-w-3xl mx-auto leading-relaxed"
          >
            DistalFlo plugs straight into the tools your clinic already uses,
            syncing leads, conversations and appointments in real time.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
        >
          {integrations.map((int) => (
            <motion.div
              key={int.name}
              variants={scaleUp}
              whileHover={{ y: -6 }}
              className="text-center group bg-[#251636] rounded-2xl p-7 border border-[#3A2750] hover:border-[#c9a84c]/35 hover:bg-[#201540] transition-all duration-300 cursor-default"
            >
              <div className="border border-[#C9A06399] rounded-full w-14 h-14 mx-auto flex items-center justify-center mb-5">
                <div className="group-hover:scale-110 transition-transform duration-300 inline-block">
                  {int.icon}
                </div>
              </div>
              <p className="secondColor font-semibold text-[18px] mb-2">
                {int.name}
              </p>
              <p className="subTitleText text-[14px] leading-relaxed">
                {int.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}