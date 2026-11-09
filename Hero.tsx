"use client";

import { motion } from "framer-motion";
import { ArrowDown, Box, ShieldCheck, Truck, Gem, Crown } from "lucide-react";
import dynamic from "next/dynamic";
import { SplitWords } from "./Reveal";
import { scrollToId } from "@/lib/scroll";

const HeroScene = dynamic(() => import("./three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-2 border-[#d4af37]/20 border-t-[#d4af37] animate-spin" />
    </div>
  ),
});

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 4.4 + 0.15 * i,
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Hero({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#050506]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.14),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(212,175,55,0.09),transparent_50%)]" />
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Giant watermark */}
      <motion.div
        initial={{ opacity: 0, scale: 1.15 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 4.2 }}
        className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none select-none"
        aria-hidden
      >
        <span className="text-[26vw] font-black leading-none text-transparent [-webkit-text-stroke:1px_rgba(212,175,55,0.07)] whitespace-nowrap">
          NEXX JEANS
        </span>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-40 pb-20 grid lg:grid-cols-2 gap-8 items-center min-h-screen">
        {/* Text */}
        <div className="text-center lg:text-right relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 border border-[#d4af37]/40 rounded-full px-4 py-1.5 text-xs text-[#d4af37] mb-6 bg-[#d4af37]/5 backdrop-blur"
          >
            <Crown className="w-3.5 h-3.5" />
            تشكيلة 2026 الحصرية وصلت
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-5xl sm:text-7xl xl:text-8xl font-black leading-[1.12] mb-5"
          >
            <SplitWords text={title} />
            <span className="block bg-gradient-to-l from-[#f5e6b8] via-[#d4af37] to-[#8a6d1f] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(212,175,55,0.3)]">
              <SplitWords text="بأسلوب يخطف الأنظار" />
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-white/60 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8"
          >
            {subtitle}. تجربة تسوق استثنائية بمجسمات ثلاثية الأبعاد واقعية
            تتيح لك استكشاف كل قطعة قبل الشراء.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12"
          >
            <button
              onClick={() => scrollToId("#products")}
              className="group relative bg-gradient-to-l from-[#d4af37] to-[#b8912a] text-black font-bold px-8 py-4 rounded-xl hover:shadow-[0_0_45px_rgba(212,175,55,0.55)] transition-all duration-300 hover:scale-[1.04] overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-l from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">تسوق الآن</span>
            </button>
            <button
              onClick={() => scrollToId("#gallery3d")}
              className="flex items-center gap-2 border border-[#d4af37]/50 text-[#d4af37] font-semibold px-8 py-4 rounded-xl hover:bg-[#d4af37]/10 transition-all duration-300 backdrop-blur"
            >
              <Box className="w-5 h-5" />
              استكشف المعرض 3D
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            {[
              { icon: Truck, label: "شحن سريع" },
              { icon: ShieldCheck, label: "دفع آمن" },
              { icon: Gem, label: "جودة فاخرة" },
            ].map((b) => (
              <span
                key={b.label}
                className="flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur px-4 py-2.5 rounded-full text-sm text-white/70 hover:border-[#d4af37]/50 hover:text-[#d4af37] transition-all duration-300"
              >
                <b.icon className="w-4 h-4 text-[#d4af37]" />
                {b.label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* 3D Mannequin */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 4.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[440px] sm:h-[560px] lg:h-[660px]"
        >
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-[#141418]/80 to-transparent border border-[#d4af37]/15" />
          <HeroScene />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 5.4, duration: 0.7 }}
            className="absolute bottom-5 right-1/2 translate-x-1/2 flex items-center gap-2 bg-black/50 backdrop-blur px-4 py-2 rounded-full border border-[#d4af37]/30 text-xs text-[#d4af37] whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
            مجسم ثلاثي الأبعاد حي — حرّك الماوس للاستكشاف
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToId("#categories")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 6 }}
        className="absolute bottom-6 right-1/2 translate-x-1/2 text-[#d4af37]/70 hover:text-[#d4af37] transition-colors z-10"
        aria-label="مرر للأسفل"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}
