"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import ProductCard, { type Product } from "./ProductCard";
import ProductModal from "./ProductModal";
import { Eyebrow, SplitWords } from "./Reveal";

const CATEGORIES = ["الكل", "جينز رجالي", "جينز نسائي", "جاكيتات جينز", "تيشيرتات", "بناطيل", "هوديز"];

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("الكل");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [selected, setSelected] = useState<Product | null>(null);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category !== "الكل") params.set("category", category);
    if (search) params.set("search", search);
    if (sort !== "newest") params.set("sort", sort);
    fetch(`/api/products?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [category, search, sort]);

  return (
    <section id="products" className="relative py-24 bg-[#070708]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05),transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Eyebrow>المجموعة الكاملة</Eyebrow>
          <h2 className="text-4xl sm:text-5xl font-black mt-4 mb-4">
            <SplitWords text="منتجاتنا" />{" "}
            <span className="bg-gradient-to-l from-[#f5e6b8] to-[#d4af37] bg-clip-text text-transparent">
              <SplitWords text="المميزة" />
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/50 max-w-xl mx-auto"
          >
            اكتشف قطع الدنيم والستريت وير: جينز، جاكيتات، تيشيرتات وقطع يومية بطابع NEXX.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-10">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full text-sm border transition-all duration-300 ${
                  category === c
                    ? "bg-[#d4af37] text-black border-[#d4af37] font-bold shadow-[0_0_20px_rgba(212,175,55,0.35)]"
                    : "border-white/15 text-white/60 hover:border-[#d4af37]/50 hover:text-[#d4af37]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-56">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث عن منتج..."
                className="w-full bg-white/5 border border-white/15 rounded-xl pr-10 pl-3 py-2.5 text-sm focus:border-[#d4af37] focus:outline-none transition-colors placeholder:text-white/30"
              />
            </div>
            <div className="relative">
              <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none bg-white/5 border border-white/15 rounded-xl pr-10 pl-4 py-2.5 text-sm focus:border-[#d4af37] focus:outline-none cursor-pointer [&>option]:bg-[#141418]"
              >
                <option value="newest">الأحدث</option>
                <option value="price-asc">السعر: من الأقل</option>
                <option value="price-desc">السعر: من الأعلى</option>
                <option value="rating">الأعلى تقييماً</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-10 h-10 text-[#d4af37] animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 text-white/40">
            لا توجد منتجات مطابقة لبحثك
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {products.map((p, i) => (
                <ProductCard key={p.id} product={p} onView={setSelected} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
