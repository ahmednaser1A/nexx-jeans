"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Box } from "lucide-react";
import { Eyebrow, SplitWords } from "./Reveal";

const SneakerScene = dynamic(
  () => import("./three/GalleryScenes").then((m) => m.SneakerScene),
  { ssr: false }
);
const PerfumeScene = dynamic(
  () => import("./three/GalleryScenes").then((m) => m.PerfumeScene),
  { ssr: false }
);
const BagScene = dynamic(
  () => import("./three/GalleryScenes").then((m) => m.BagScene),
  { ssr: false }
);
const WatchScene = dynamic(
  () => import("./three/GalleryScenes").then((m) => m.WatchScene),
  { ssr: false }
);
const SunglassesScene = dynamic(
  () => import("./three/GalleryScenes").then((m) => m.SunglassesScene),
  { ssr: false }
);

const MODELS = [
  { name: "NEXX STREET", desc: "مجسم ثلاثي الأبعاد لستايل الشارع", Scene: SneakerScene, tag: "STREETWEAR" },
  { name: "DENIM EDITION", desc: "تفاصيل خامات وإكسسوارات مستوحاة من عالم الدنيم", Scene: PerfumeScene, tag: "DENIM" },
  { name: "URBAN FORM", desc: "تكوين ثلاثي الأبعاد لروح الأزياء الحضرية", Scene: BagScene, tag: "URBAN" },
  { name: "NEXX DETAILS", desc: "مجسم بتفاصيل دقيقة ولمسات معدنية", Scene: WatchScene, tag: "DETAILS" },
  { name: "DENIM CULTURE", desc: "ستايل جريء مستوحى من ثقافة الدنيم", Scene: SunglassesScene, tag: "CULTURE" },
];

export default function Gallery3D() {
  return (
    <section id="gallery3d" className="relative py-24 bg-[#050506] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.07),transparent_55%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <Eyebrow>تجربة غامرة</Eyebrow>
          <h2 className="text-4xl sm:text-5xl font-black mt-4 mb-4">
            <SplitWords text="معرض المجسمات" />{" "}
            <span className="bg-gradient-to-l from-[#f5e6b8] to-[#d4af37] bg-clip-text text-transparent">
              <SplitWords text="ثلاثية الأبعاد" />
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/50 max-w-xl mx-auto"
          >
            خمسة مجسمات ثلاثية الأبعاد حقيقية بإضاءة واقعية وانعكاسات فيزيائية —
            أدرها بيدك واكتشف كل تفصيلة
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODELS.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.12 }}
              className={`group relative rounded-3xl overflow-hidden border border-[#d4af37]/15 hover:border-[#d4af37]/45 transition-all duration-500 bg-gradient-to-b from-[#121216] to-[#0a0a0c] ${
                i === 0 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="h-[300px] sm:h-[340px] relative">
                <m.Scene />
                <span className="absolute top-4 right-4 bg-black/50 backdrop-blur border border-[#d4af37]/30 text-[#d4af37] text-[11px] px-3 py-1 rounded-full">
                  {m.tag}
                </span>
                <span className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/50 backdrop-blur border border-white/10 text-white/60 text-[11px] px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  3D حي
                </span>
              </div>
              <div className="p-5 border-t border-white/8">
                <h3 className="text-lg font-bold mb-1 group-hover:text-[#d4af37] transition-colors">
                  {m.name}
                </h3>
                <p className="text-white/45 text-sm">{m.desc}</p>
              </div>
            </motion.div>
          ))}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative rounded-3xl overflow-hidden border border-[#d4af37]/30 bg-gradient-to-br from-[#d4af37]/15 via-[#121216] to-[#0a0a0c] flex flex-col items-center justify-center text-center p-8 min-h-[300px]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12),transparent_65%)]" />
            <Box className="w-14 h-14 text-[#d4af37] mb-4 relative" />
            <h3 className="text-2xl font-black mb-2 relative">+ مجسمات أكثر</h3>
            <p className="text-white/50 text-sm mb-5 relative max-w-xs">
              كل منتج في متجرنا يُعرض بمجسم ثلاثي الأبعاد واقعي قبل الشراء
            </p>
            <a
              href="#products"
              className="relative bg-[#d4af37] text-black font-bold px-6 py-3 rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all hover:scale-105"
            >
              تصفح المنتجات
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
