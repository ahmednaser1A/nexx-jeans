"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Loader2, Truck } from "lucide-react";
import { useCart } from "@/lib/cart";

export default function CheckoutModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, total, clear } = useCart();
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [shippingFee, setShippingFee] = useState(50);
  const [freeOver, setFreeOver] = useState(1000);

  useEffect(() => {
    if (open) {
      setSuccess(null);
      setError("");
      fetch("/api/settings")
        .then((r) => r.json())
        .then((s) => {
          setShippingFee(Number(s.shipping_fee ?? 50));
          setFreeOver(Number(s.free_shipping_over ?? 1000));
        })
        .catch(() => {});
    }
  }, [open]);

  const shipping = total >= freeOver ? 0 : shippingFee;
  const grandTotal = total + shipping;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            size: i.size,
            color: i.color,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "حدث خطأ");
      setSuccess(data.orderId);
      clear();
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-[#101013] border border-[#d4af37]/25 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 left-4 p-2 rounded-full bg-black/60 border border-white/15 hover:border-[#d4af37] transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>

            {success ? (
              <div className="text-center py-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                >
                  <CheckCircle2 className="w-20 h-20 text-[#d4af37] mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">تم استلام طلبك بنجاح</h3>
                <p className="text-white/50 mb-1">
                  رقم الطلب: <span className="text-[#d4af37] font-bold">#{success}</span>
                </p>
                <p className="text-white/50 text-sm mb-6">
                  سنتواصل معك قريباً لتأكيد الطلب وموعد التوصيل
                </p>
                <button
                  onClick={onClose}
                  className="bg-[#d4af37] text-black font-bold px-8 py-3 rounded-xl hover:bg-[#e8c84a] transition-colors"
                >
                  متابعة التسوق
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-1">إتمام الطلب</h3>
                <p className="text-white/50 text-sm mb-6">
                  الدفع عند الاستلام — املأ بياناتك وسنتواصل معك
                </p>

                <form onSubmit={submit} className="space-y-4">
                  <input
                    required
                    value={form.customerName}
                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                    placeholder="الاسم بالكامل"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm focus:border-[#d4af37] focus:outline-none transition-colors placeholder:text-white/30"
                  />
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="رقم الهاتف"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm focus:border-[#d4af37] focus:outline-none transition-colors placeholder:text-white/30"
                  />
                  <input
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="العنوان بالتفصيل"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm focus:border-[#d4af37] focus:outline-none transition-colors placeholder:text-white/30"
                  />
                  <input
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="المدينة / المحافظة"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm focus:border-[#d4af37] focus:outline-none transition-colors placeholder:text-white/30"
                  />
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="ملاحظات إضافية (اختياري)"
                    rows={2}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm focus:border-[#d4af37] focus:outline-none transition-colors placeholder:text-white/30 resize-none"
                  />

                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2 text-sm">
                    <div className="flex justify-between text-white/60">
                      <span>المجموع الفرعي</span>
                      <span>{total.toLocaleString("ar-EG")} جنيه</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span className="flex items-center gap-1.5">
                        <Truck className="w-4 h-4" /> الشحن
                      </span>
                      <span className={shipping === 0 ? "text-green-400 font-bold" : ""}>
                        {shipping === 0 ? "مجاني" : `${shipping.toLocaleString("ar-EG")} جنيه`}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-base border-t border-white/10 pt-2">
                      <span>الإجمالي</span>
                      <span className="text-[#d4af37]">{grandTotal.toLocaleString("ar-EG")} جنيه</span>
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/30 rounded-xl px-4 py-3">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting || items.length === 0}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-l from-[#d4af37] to-[#b8912a] text-black font-bold py-4 rounded-xl hover:shadow-[0_0_35px_rgba(212,175,55,0.45)] transition-all disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> جارٍ إرسال الطلب...
                      </>
                    ) : (
                      "تأكيد الطلب"
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
