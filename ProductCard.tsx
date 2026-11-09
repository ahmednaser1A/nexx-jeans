"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Star, Eye } from "lucide-react";
import { useCart } from "@/lib/cart";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number | null;
  image: string;
  description: string;
  sizes: string[];
  colors: string[];
  stock: number;
  featured: boolean;
  rating: number;
}

interface Props {
  product: Product;
  onView: (p: Product) => void;
  index?: number;
}

export default function ProductCard({ product, onView, index = 0 }: Props) {
  const { addItem, setOpen } = useCart();
  const tiltRef = useRef<HTMLDivElement>(null);
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  const quickAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.sizes?.[0] || "",
      color: product.colors?.[0] || "",
    });
    setOpen(true);
  };

  const onMove = (e: React.MouseEvent) => {
    const el = tiltRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * -11}deg) rotateX(${y * 11}deg) translateY(-6px)`;
  };

  const onLeave = () => {
    if (tiltRef.current) tiltRef.current.style.transform = "";
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08 }}
      style={{ perspective: 900 }}
    >
      <div
        ref={tiltRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative bg-[#101013] border border-white/8 rounded-2xl overflow-hidden hover:border-[#d4af37]/50 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:shadow-[0_25px_60px_rgba(0,0,0,0.65),0_0_35px_rgba(212,175,55,0.1)] will-change-transform"
      >
        {/* Image */}
        <div
          className="relative aspect-[4/5] overflow-hidden cursor-pointer"
          onClick={() => onView(product)}
          data-cursor="عرض"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {/* Shine sweep */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/15 to-transparent -translate-x-[130%] group-hover:translate-x-[130%] transition-transform duration-1000 pointer-events-none" />

          {discount > 0 && (
            <span className="absolute top-3 right-3 bg-[#c0392b] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
              خصم {discount}%
            </span>
          )}
          {product.featured && (
            <span className="absolute top-3 left-3 bg-[#d4af37] text-black text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
              مميز
            </span>
          )}
          {product.stock <= 0 && (
            <span className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-lg">
              نفدت الكمية
            </span>
          )}

          {/* Hover actions */}
          <div className="absolute bottom-3 inset-x-3 flex gap-2 translate-y-14 group-hover:translate-y-0 transition-transform duration-500">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onView(product);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 bg-white/10 backdrop-blur border border-white/20 text-white text-sm py-2.5 rounded-xl hover:bg-white/20 transition-all"
            >
              <Eye className="w-4 h-4" /> عرض
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                quickAdd();
              }}
              disabled={product.stock <= 0}
              className="flex-1 flex items-center justify-center gap-1.5 bg-[#d4af37] text-black text-sm font-bold py-2.5 rounded-xl hover:bg-[#e8c84a] transition-all disabled:opacity-40"
            >
              <ShoppingBag className="w-4 h-4" /> أضف للسلة
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-[#d4af37] bg-[#d4af37]/10 px-2 py-0.5 rounded-full">
              {product.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-white/50">
              <Star className="w-3.5 h-3.5 text-[#d4af37] fill-[#d4af37]" />
              {Number(product.rating).toFixed(1)}
            </span>
          </div>
          <h3
            className="font-semibold text-white/90 mb-2 cursor-pointer hover:text-[#d4af37] transition-colors line-clamp-1"
            onClick={() => onView(product)}
          >
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-[#d4af37]">
              {product.price.toLocaleString("ar-EG")}
            </span>
            <span className="text-xs text-white/40">جنيه</span>
            {product.oldPrice && (
              <span className="text-sm text-white/35 line-through">
                {product.oldPrice.toLocaleString("ar-EG")}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
