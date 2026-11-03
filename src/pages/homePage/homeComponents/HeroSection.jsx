import { useRef, useEffect } from "react";
import {
  CheckCircleOutlined,
  PlayCircleOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Image, Tooltip } from "antd";
import { motion } from "framer-motion";

const checks = [
  "Private clinics only",
  "No agencies",
  "No guesswork",
];

function MiniLineChart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    const points = [
      [0, 70],
      [22, 65],
      [37, 52],
      [55, 38],
      [75, 22],
      [88, 8],
      [100, 6],
      [115, 4],
      [122, 28],
      [137, 50],
      [152, 68],
      [163, 72],
      [178, 52],
      [188, 42],
      [193, 28],
      [212, 16],
      [222, 12],
      [240, 13],
    ].map(([x, y]) => [(x / 240) * w, (y / 80) * h]);

    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "rgba(201,168,76,0.22)");
    grad.addColorStop(1, "rgba(201,168,76,0)");

    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      const [px, py] = points[i - 1];
      const [cx, cy] = points[i];
      ctx.bezierCurveTo(px + (cx - px) / 2, py, px + (cx - px) / 2, cy, cx, cy);
    }
    ctx.strokeStyle = "#c9a84c";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.stroke();

    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // dashed vertical line
    ctx.beginPath();
    ctx.setLineDash([3, 3]);
    ctx.moveTo(w * 0.855, 0);
    ctx.lineTo(w * 0.855, h);
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }, []);

  return <canvas ref={canvasRef} width={300} height={80} className="w-full" />;
}

function DonutChart() {
  const r = 36;
  const circ = 2 * Math.PI * r;
  return (
    <div className="relative w-[90px] h-[90px]">
      <svg viewBox="0 0 90 90" width="90" height="90">
        <circle
          cx="45"
          cy="45"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="10"
        />
        <motion.circle
          cx="45"
          cy="45"
          r={r}
          fill="none"
          stroke="#c9a84c"
          strokeWidth="10"
          strokeDasharray={`${circ * 0.8} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 45 45)"
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ * 0.25 }}
          transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}
        />
        <motion.circle
          cx="45"
          cy="45"
          r={r}
          fill="none"
          stroke="#4ade80"
          strokeWidth="10"
          strokeDasharray={`${circ * 0.31} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 45 45)"
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: -circ * 0.55 }}
          transition={{ duration: 1.2, delay: 1.1, ease: "easeOut" }}
        />
      </svg>
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="text-white text-lg font-bold leading-none">1.2k</span>
        <span className="text-white/40 text-[10px]">Total</span>
      </motion.div>
    </div>
  );
}

// Sample/illustrative figures — clearly labeled in the UI, not presented as real client results
const metrics = [
  { label: "New Leads", value: "1,248", change: "↑ 28.4% vs Apr" },
  { label: "Appointments", value: "386", change: "↑ 32.7% vs Apr" },
  { label: "Conversion", value: "30.9%", change: "↑ 22.1% vs Apr" },
  { label: "Revenue", value: "£124k", change: "↑ 37.6% vs Apr" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85, y: 30 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-20 pb-16 bg-[#14091C] overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="w-full h-full"
        >
          <Image
            src="/images/home/bg-hero.png"
            alt=""
            className="w-full h-full object-cover"
            preview={false}
          />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* ── Left ── */}
          <motion.div
            className="flex-1 min-w-0"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Badge */}
            <motion.div
              custom={0}
              variants={fadeUp}
              className="mainColor inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7 text-[13px]"
              style={{
                background: "rgba(201,168,76,0.12)",
                border: "1px solid rgba(201,168,76,0.3)",
              }}
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                ✦
              </motion.span>
              Now with native British AI voice agents
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              className="cormorantFont text-[64px] lg:text-[76px] font-[500] leading-[1.05] text-white m-0"
            >
              Your Clinic.
            </motion.h1>
            <motion.span
              custom={2}
              variants={fadeUp}
              className="mainColor cormorantFontItalic text-[64px] lg:text-[76px] italic font-normal leading-[1.1] block mb-7"
            >
              On Autopilot.
            </motion.span>

            {/* Description */}
            <motion.p
              custom={3}
              variants={fadeUp}
              className="text-[17px] leading-relaxed max-w-[480px] mb-7"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              DistalFlo finds the patients your clinic wants, nurtures them
              automatically, and fills your appointment book — without you
              lifting a finger.
            </motion.p>

            {/* Checkmarks */}
            <motion.div
              custom={4}
              variants={fadeUp}
              className="flex flex-wrap gap-x-6 gap-y-2 mb-10"
            >
              {checks.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-2 text-[13px]"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  <CheckCircleOutlined
                    style={{ color: "#c9a84c", fontSize: 15 }}
                  />
                  {item}
                </motion.div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div
              custom={5}
              variants={fadeUp}
              className="flex flex-wrap gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="mainBtn flex items-center gap-2 text-sm font-bold px-6 py-3.5 rounded-lg transition-colors hover:opacity-90"
                style={{ border: "none" }}
              >
                Request Access <ArrowRightOutlined />
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.06)",
                }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 text-sm font-medium px-6 py-3.5 rounded-lg transition-colors"
                style={{
                  background: "transparent",
                  color: "#fff",
                  border: "1.5px solid rgba(255,255,255,0.25)",
                  cursor: "pointer",
                }}
              >
                <PlayCircleOutlined style={{ fontSize: 16 }} />
                Watch Video
              </motion.button>
            </motion.div>
          </motion.div>

          {/* ── Right: Dashboard ── */}
          <motion.div
            className="flex-[1.1] min-w-0 w-full"
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-2xl border border-purple-800/40 bg-[#1a1230] p-6 shadow-[0_0_40px_rgba(255,236,179,0.10)] hover:shadow-[0_0_60px_rgba(255,236,179,0.15)]">
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ border: "1.5px solid #c9a84c" }}
                  >
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                      <circle
                        cx="7"
                        cy="7"
                        r="5.5"
                        stroke="#c9a84c"
                        strokeWidth="1.2"
                      />
                      <circle cx="7" cy="7" r="2" fill="#c9a84c" />
                    </svg>
                  </div>
                  <span
                    className="text-xs font-bold tracking-widest"
                    style={{ color: "#c9a84c" }}
                  >
                    DistalFlo
                  </span>
                </div>
                <div
                  className="rounded-md px-3 py-1.5 text-[11px]"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  May 1 – May 31, 2026 ▾
                </div>
              </div>

              {/* Illustrative-data disclaimer */}
              <Tooltip title="These figures are sample projections for demonstration purposes and do not represent actual client results.">
                <div
                  className="mb-4 text-[10px] tracking-wide uppercase cursor-help inline-block"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  Illustrative data — sample projection, not actual results
                </div>
              </Tooltip>

              {/* Metrics */}
              <motion.div
                className="grid grid-cols-4 gap-2.5 mb-3"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    custom={i}
                    variants={scaleIn}
                    whileHover={{ y: -3 }}
                    className="rounded-xl p-3.5"
                    style={{ background: "#231a3a" }}
                  >
                    <div
                      className="text-[11px] mb-1.5"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      {m.label}
                    </div>
                    <div className="text-[22px] font-bold text-white mb-1">
                      {m.value}
                    </div>
                    <div className="text-[11px]" style={{ color: "#4ade80" }}>
                      {m.change}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Bottom row */}
              <div className="grid grid-cols-[1fr_0.55fr] gap-2.5">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-xl p-3.5"
                  style={{ background: "#231a3a" }}
                >
                  <div
                    className="flex items-center justify-between text-[12px] mb-2"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    Leads Over Time
                    <span
                      className="px-2 py-0.5 rounded text-[11px]"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.4)",
                      }}
                    >
                      This Month
                    </span>
                  </div>
                  <MiniLineChart />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-xl p-3.5 flex flex-col items-center justify-center"
                  style={{ background: "#231a3a" }}
                >
                  <div
                    className="text-[12px] self-start mb-3"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    Pipeline
                  </div>
                  <DonutChart />
                </motion.div>
              </div>

              <div
                className="mt-3 text-[12px] text-center text-white/50"
                // style={{ color: "rgba(255,255,255,0.3)" }}
              >
                * Sample dashboard for illustration only
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}