"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Eyebrow, SplitWords } from "./Reveal";

const TruckIcon3D = dynamic(
  () => import("./three/icons3d").then((m) => m.TruckIcon3D),
  { ssr: false }
);
const ShieldIcon3D = dynamic(
  () => import("./three/icons3d").then((m) => m.ShieldIcon3D),
  { ssr: false }
);
const GemIcon3D = dynamic(
  () => import("./three/icons3d").then((m) => m.GemIcon3D),
  { ssr: false }
);
const CrownIcon3D = dynamic(
  () => import("./three/icons3d").then((m) => m.CrownIcon3D),
  { ssr: false }
);
const BoxIcon3D = dynamic(
  () => import("./three/icons3d").then((m) => m.BoxIcon3D),
  { ssr: false }
);
const StarIcon3D = dynamic(
  () => import("./three/icons3d").then((m) => m.StarIcon3D),
  { ssr: false }
);

const FEATURES = [
  {
    Icon: TruckIcon3D,
    title: "شحن سريع",
    desc: "تفاصيل الشحن والتوصيل بتتأكد معاك عند إتمام الطلب",
  },
  {
    Icon: ShieldIcon3D,
    title: "دفع آمن",
    desc: "تواصل مباشر لتأكيد تفاصيل الطلب وطريقة الدفع المتاحة",
  },
  {
    Icon: GemIcon3D,
    title: "جودة فاخرة",
    desc: "اختيارات دنيم وستريت وير بتفاصيل واضحة ومقاسات متعددة",
  },
  {
    Icon: CrownIcon3D,
    title: "تشكيلات حصرية",
    desc: "تشكيلة من القصّات والألوان تساعدك تكوّن ستايلك الخاص",
  },
  {
    Icon: BoxIcon3D,
    title: "تغليف هدايا",
    desc: "تفاصيل طلبك وملاحظاتك بتكون واضحة قبل تأكيد الشراء",
  },
  {
    Icon: StarIcon3D,
    title: "رضا العملاء",
    desc: "اختار القطعة والمقاس واللون المناسبين ليك بسهولة",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24 bg-[#050506] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06),transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <Eyebrow>لماذا NEXX JEANS؟</Eyebrow>
          <h2 className="text-4xl sm:text-5xl font-black mt-4">
            <SplitWords text="تجربة تسوق" />{" "}
            <span className="bg-gradient-to-l from-[#f5e6b8] to-[#d4af37] bg-clip-text text-transparent">
              <SplitWords text="استثنائية" />
            </span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 50, rotateX: 12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformPerspective: 800 }}
              className="group relative bg-[#101013] border border-white/8 rounded-3xl p-7 text-center hover:border-[#d4af37]/45 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.55),0_0_30px_rgba(212,175,55,0.08)] hover:-translate-y-2"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#d4af37]/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative w-28 h-28 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-[#d4af37]/10 blur-xl group-hover:bg-[#d4af37]/20 transition-colors duration-500" />
                <f.Icon />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-[#d4af37] transition-colors">
                {f.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
