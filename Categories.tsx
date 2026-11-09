"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Eyebrow, SplitWords } from "./Reveal";

const CATEGORIES = [
  { name: 'جينز رجالي', image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=1200', desc: 'قصّات دنيم لكل يوم' },
  { name: 'جينز نسائي', image: 'https://images.pexels.com/photos/977586/pexels-photo-977586.jpeg?auto=compress&cs=tinysrgb&w=1200', desc: 'Wide Leg وMom Fit' },
  { name: 'جاكيتات جينز', image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1200', desc: 'طبقات ستريت وير' },
  { name: 'تيشيرتات', image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1200', desc: 'أساسيات اللوك' },
  { name: 'بناطيل', image: 'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=1200', desc: 'Cargo وقطع يومية' },
  { name: 'هوديز', image: 'https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=900', desc: 'راحة بطابع NEXX' }
];

export default function Categories() {
  return (
    <section id="categories" className="relative py-24 bg-[#050506]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <Eyebrow>تسوّق حسب القسم</Eyebrow>
          <h2 className="text-4xl sm:text-5xl font-black mt-4">
            <SplitWords text="أقسام" />{" "}
            <span className="bg-gradient-to-l from-[#f5e6b8] to-[#d4af37] bg-clip-text text-transparent">
              <SplitWords text="المتجر" />
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {CATEGORIES.map((c, i) => (
            <motion.a
              key={c.name}
              href="#products"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.1 }}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/8 hover:border-[#d4af37]/50 transition-all duration-500"
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute inset-0 bg-[#d4af37]/0 group-hover:bg-[#d4af37]/10 transition-colors duration-500" />
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5">
                <h3 className="text-xl sm:text-2xl font-bold mb-1">{c.name}</h3>
                <p className="text-white/60 text-xs sm:text-sm mb-2">{c.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-[#d4af37] text-xs sm:text-sm font-semibold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                  تسوق الآن <ArrowLeft className="w-4 h-4" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
