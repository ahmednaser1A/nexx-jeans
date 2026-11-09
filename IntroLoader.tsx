"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LETTERS = ["N", "E", "X", "X"];
const TOTAL = 4200;

export default function IntroLoader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0: ring, 1: letters, 2: tagline, 3: exit
  const [gone, setGone] = useState(false);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const start = performance.now();
    let raf: number;
    const step = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / TOTAL);
      const eased = 1 - Math.pow(1 - p, 2.2);
      setProgress(Math.round(eased * 100));
      if (elapsed > 900) setPhase((v) => Math.max(v, 1));
      if (elapsed > 2100) setPhase((v) => Math.max(v, 2));
      if (elapsed > TOTAL) {
        setPhase(3);
        setTimeout(() => setGone(true), 1100);
        document.body.style.overflow = "";
      } else {
        raf = requestAnimationFrame(step);
      }
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  const skip = () => {
    if (skipped) return;
    setSkipped(true);
    setPhase(3);
    setTimeout(() => setGone(true), 900);
    document.body.style.overflow = "";
  };

  if (gone) return null;

  const exiting = phase === 3;

  return (
    <div
      className="fixed inset-0 z-[100] cursor-pointer"
      onClick={skip}
      role="button"
      aria-label="تخطي المقدمة"
    >
      {/* Curtain panels */}
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-[#050506]"
        animate={exiting ? { x: "100%" } : { x: "0%" }}
        transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-[#050506]"
        animate={exiting ? { x: "-100%" } : { x: "0%" }}
        transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Content */}
      <AnimatePresence>
        {!exiting && (
          <motion.div
            exit={{ opacity: 0, scale: 1.15, filter: "blur(8px)" }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Ambient glow */}
            <div className="absolute w-[700px] h-[700px] rounded-full bg-[#d4af37]/10 blur-[150px]" />

            {/* Rotating gold rings (SVG) */}
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 mb-8">
              <motion.svg
                viewBox="0 0 200 200"
                className="absolute inset-0 w-full h-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              >
                <circle
                  cx="100"
                  cy="100"
                  r="92"
                  fill="none"
                  stroke="#d4af37"
                  strokeWidth="1.5"
                  strokeDasharray="6 14"
                  opacity="0.7"
                />
              </motion.svg>
              <motion.svg
                viewBox="0 0 200 200"
                className="absolute inset-0 w-full h-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
              >
                <circle
                  cx="100"
                  cy="100"
                  r="76"
                  fill="none"
                  stroke="#d4af37"
                  strokeWidth="1"
                  strokeDasharray="2 10"
                  opacity="0.45"
                />
              </motion.svg>
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/5 backdrop-blur flex items-center justify-center shadow-[0_0_60px_rgba(212,175,55,0.25)]">
                  <span className="text-4xl sm:text-5xl font-black bg-gradient-to-b from-[#f5e6b8] to-[#d4af37] bg-clip-text text-transparent">
                    N
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Letters reveal */}
            <div className="flex" dir="rtl">
              {LETTERS.map((l, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 60, filter: "blur(12px)", rotateX: 70 }}
                  animate={
                    phase >= 1
                      ? { opacity: 1, y: 0, filter: "blur(0px)", rotateX: 0 }
                      : {}
                  }
                  transition={{
                    duration: 0.8,
                    delay: i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-7xl sm:text-9xl font-black bg-gradient-to-b from-[#f5e6b8] via-[#d4af37] to-[#8a6d1f] bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(212,175,55,0.35)]"
                  style={{ transformPerspective: 600 }}
                >
                  {l}
                </motion.span>
              ))}
            </div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="mt-4 text-center"
            >
              <div className="h-px w-48 mx-auto mb-4 bg-gradient-to-l from-transparent via-[#d4af37] to-transparent" />
              <p className="text-white/60 tracking-[0.45em] text-xs sm:text-sm">
                NEXX JEANS · DENIM CULTURE
              </p>
              <p className="text-[#d4af37]/80 mt-2 text-sm">DENIM · STREETWEAR · ESSENTIALS</p>
            </motion.div>

            {/* Progress */}
            <div className="absolute bottom-14 w-64">
              <div className="flex justify-between text-xs text-white/40 mb-2">
                <span>PREPARING YOUR NEXX EXPERIENCE</span>
                <span className="text-[#d4af37] font-bold">{progress}%</span>
              </div>
              <div className="h-[3px] bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-l from-[#f5e6b8] to-[#d4af37] rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Particles */}
            {[...Array(16)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute w-1 h-1 rounded-full bg-[#d4af37]"
                style={{
                  left: `${6 + ((i * 61) % 88)}%`,
                  top: `${10 + ((i * 37) % 80)}%`,
                }}
                animate={{ y: [0, -22, 0], opacity: [0.15, 0.9, 0.15] }}
                transition={{
                  duration: 2.2 + (i % 5) * 0.4,
                  repeat: Infinity,
                  delay: i * 0.12,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/25 text-[11px] tracking-widest">
        اضغط للتخطي
      </div>
    </div>
  );
}
