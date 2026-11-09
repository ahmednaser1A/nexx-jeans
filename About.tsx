"use client";

import { motion } from "framer-motion";
import { Award, Users, Package, Star } from "lucide-react";

const STATS = [
  { icon: Users, label: "ستايل يناسبك" },
  { icon: Package, label: "اختيارات دنيم" },
  { icon: Award, label: "تفاصيل مميزة" },
  { icon: Star, label: "هوية NEXX" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 bg-[#070708] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,175,55,0.06),transparent_55%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-14 items-center">
        {/* Image collage */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="rounded-3xl overflow-hidden border border-[#d4af37]/20 aspect-[4/5] max-w-md mx-auto">
            <img
              src="https://images.pexels.com/photos/31840923/pexels-photo-31840923.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
              alt="ستايل دنيم من NEXX JEANS"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="absolute -bottom-6 right-4 sm:right-10 bg-[#101013] border border-[#d4af37]/30 rounded-2xl px-6 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          >
            <div className="text-3xl font-black text-[#d4af37]">NEXX</div>
            <div className="text-white/50 text-sm">DENIM CULTURE · EVERYDAY ICONS</div>
          </motion.div>
          <div className="absolute -top-4 left-4 w-24 h-24 border-t-2 border-r-2 border-[#d4af37]/40 rounded-tr-3xl" />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#d4af37] tracking-[0.4em] text-xs">قصتنا</span>
          <h2 className="text-4xl sm:text-5xl font-black mt-3 mb-5 leading-tight">
            عالم{" "}
            <span className="bg-gradient-to-l from-[#f5e6b8] to-[#d4af37] bg-clip-text text-transparent">
              NEXX JEANS
            </span>{" "}
            للدنيم والستريت وير
          </h2>
          <p className="text-white/60 leading-loose mb-5">
            في NEXX JEANS بنركز على الدنيم والستريت وير والقطع اليومية اللي تديك
            مساحة تعبّر عن ستايلك. اختياراتنا بتجمع بين القصّات العصرية والتفاصيل
            العملية عشان تكوّن لوكك بطريقتك.
          </p>
          <p className="text-white/60 leading-loose mb-8">
            تقدر تتصفح الأقسام، تشوف تفاصيل المنتجات، تختار المقاس واللون، وتضيف
            القطع لسلة التسوق قبل إرسال طلبك بسهولة.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#d4af37]/40 transition-colors"
              >
                <s.icon className="w-6 h-6 text-[#d4af37] mb-2" />
                <div className="text-2xl font-black text-[#d4af37]">NEXX</div>
                <div className="text-white/50 text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
