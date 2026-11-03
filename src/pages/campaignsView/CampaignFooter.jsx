import React from "react";
import { motion } from "framer-motion";

export default function CampaignFooter({ clinicName = "Oxford Smile Clinic" }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1c1826] px-4 pt-4 pb-2">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center text-gray-400 text-sm"
      >
        © {year} {clinicName}. All rights reserved.
      </motion.p>
    </footer>
  );
}