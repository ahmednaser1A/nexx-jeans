"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag, CreditCard } from "lucide-react";
import { useCart } from "@/lib/cart";
import CheckoutModal from "./CheckoutModal";

export default function CartDrawer() {
  const { items, isOpen, setOpen, updateQty, removeItem, total, count } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[85] bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 z-[90] w-full max-w-md bg-[#0d0d10] border-r border-[#d4af37]/25 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
                  سلة التسوق
                  <span className="text-sm text-white/40">({count})</span>
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full border border-white/15 hover:border-[#d4af37] transition-colors"
                  aria-label="إغلاق السلة"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-white/40 gap-3">
                    <ShoppingBag className="w-16 h-16 opacity-30" />
                    <p>سلتك فارغة</p>
                    <button
                      onClick={() => setOpen(false)}
                      className="text-[#d4af37] text-sm hover:underline"
                    >
                      ابدأ التسوق
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      className="flex gap-3 bg-white/5 border border-white/10 rounded-2xl p-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-24 object-cover rounded-xl"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-white/40 mt-0.5">
                          {item.size && `مقاس ${item.size}`}
                          {item.size && item.color && " · "}
                          {item.color}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-white/15 rounded-lg">
                            <button
                              onClick={() => updateQty(item.id, item.quantity - 1)}
                              className="p-1.5 hover:text-[#d4af37]"
                              aria-label="تقليل"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm font-bold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, item.quantity + 1)}
                              className="p-1.5 hover:text-[#d4af37]"
                              aria-label="زيادة"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-[#d4af37] font-bold text-sm">
                            {(item.price * item.quantity).toLocaleString("ar-EG")} جنيه
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="self-start p-1.5 text-white/40 hover:text-red-400 transition-colors"
                        aria-label="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-5 border-t border-white/10 space-y-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>الإجمالي</span>
                    <span className="text-[#d4af37]">
                      {total.toLocaleString("ar-EG")} جنيه
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setOpen(false);
                      setCheckoutOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-l from-[#d4af37] to-[#b8912a] text-black font-bold py-4 rounded-xl hover:shadow-[0_0_35px_rgba(212,175,55,0.45)] transition-all hover:scale-[1.02]"
                  >
                    <CreditCard className="w-5 h-5" />
                    إتمام الطلب
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  );
}
