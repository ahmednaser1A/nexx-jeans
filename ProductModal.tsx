"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Star, Minus, Plus, Check } from "lucide-react";
import type { Product } from "./ProductCard";
import { useCart } from "@/lib/cart";

export default function ProductModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [qty, setQty] = useState(1);
  const { addItem, setOpen } = useCart();

  useEffect(() => {
    if (product) {
      setSize(product.sizes?.[0] || "");
      setColor(product.colors?.[0] || "");
      setQty(1);
    }
  }, [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleAdd = () => {
    if (!product) return;
    addItem(
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size,
        color,
      },
      qty
    );
    onClose();
    setOpen(true);
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-[#101013] border border-[#d4af37]/25 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 left-4 z-10 p-2 rounded-full bg-black/60 border border-white/15 hover:border-[#d4af37] transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2">
              <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[480px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover md:rounded-r-3xl"
                />
                {product.oldPrice && (
                  <span className="absolute top-4 right-4 bg-[#c0392b] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    خصم {Math.round((1 - product.price / product.oldPrice) * 100)}%
                  </span>
                )}
              </div>

              <div className="p-6 sm:p-8 flex flex-col">
                <span className="text-xs text-[#d4af37] bg-[#d4af37]/10 px-3 py-1 rounded-full w-fit mb-3">
                  {product.category}
                </span>
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <div className="flex items-center gap-1.5 text-sm text-white/50 mb-4">
                  <Star className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" />
                  {Number(product.rating).toFixed(1)} · متوفر: {product.stock} قطعة
                </div>
                <p className="text-white/60 leading-relaxed mb-6 text-sm">
                  {product.description}
                </p>

                {product.sizes?.length > 0 && (
                  <div className="mb-4">
                    <div className="text-sm text-white/70 mb-2">المقاس</div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSize(s)}
                          className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                            size === s
                              ? "bg-[#d4af37] text-black border-[#d4af37] font-bold"
                              : "border-white/20 text-white/70 hover:border-[#d4af37]/50"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.colors?.length > 0 && (
                  <div className="mb-6">
                    <div className="text-sm text-white/70 mb-2">
                      اللون: <span className="text-[#d4af37]">{color}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((c) => (
                        <button
                          key={c}
                          onClick={() => setColor(c)}
                          className={`px-4 py-2 rounded-lg border text-sm transition-all flex items-center gap-1.5 ${
                            color === c
                              ? "bg-[#d4af37] text-black border-[#d4af37] font-bold"
                              : "border-white/20 text-white/70 hover:border-[#d4af37]/50"
                          }`}
                        >
                          {color === c && <Check className="w-3.5 h-3.5" />}
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center border border-white/20 rounded-xl">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="p-2.5 hover:text-[#d4af37] transition-colors"
                      aria-label="تقليل الكمية"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold">{qty}</span>
                    <button
                      onClick={() => setQty(Math.min(product.stock, qty + 1))}
                      className="p-2.5 hover:text-[#d4af37] transition-colors"
                      aria-label="زيادة الكمية"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#d4af37]">
                      {(product.price * qty).toLocaleString("ar-EG")}
                    </span>
                    <span className="text-sm text-white/40">جنيه</span>
                    {product.oldPrice && (
                      <span className="text-white/35 line-through text-sm">
                        {(product.oldPrice * qty).toLocaleString("ar-EG")}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={product.stock <= 0}
                  className="mt-auto flex items-center justify-center gap-2 bg-gradient-to-l from-[#d4af37] to-[#b8912a] text-black font-bold py-4 rounded-xl hover:shadow-[0_0_35px_rgba(212,175,55,0.45)] transition-all hover:scale-[1.02] disabled:opacity-40"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {product.stock <= 0 ? "نفدت الكمية" : "أضف إلى السلة"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
