"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, Loader2, CheckCircle2, Store, Truck, Megaphone } from "lucide-react";

const FIELDS = [
  { key: "store_name", label: "اسم المتجر", section: "store" },
  { key: "store_tagline", label: "الشعار التعريفي", section: "store" },
  { key: "phone", label: "رقم الهاتف", section: "store", dir: "ltr" },
  { key: "email", label: "البريد الإلكتروني", section: "store", dir: "ltr" },
  { key: "address", label: "العنوان", section: "store" },
  { key: "whatsapp", label: "رقم الواتساب", section: "store", dir: "ltr" },
  { key: "announcement", label: "شريط الإعلانات العلوي", section: "promo" },
  { key: "hero_title", label: "العنوان الرئيسي", section: "promo" },
  { key: "hero_subtitle", label: "الوصف الرئيسي", section: "promo" },
  { key: "shipping_fee", label: "رسوم الشحن (جنيه)", section: "shipping" },
  { key: "free_shipping_over", label: "شحن مجاني فوق (جنيه)", section: "shipping" },
];

const SECTIONS = [
  { id: "store", title: "بيانات المتجر", icon: Store },
  { id: "promo", title: "الواجهة والإعلانات", icon: Megaphone },
  { id: "shipping", title: "الشحن والتوصيل", icon: Truck },
];

export default function AdminSettings() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((d) => {
        setValues(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <Loader2 className="w-10 h-10 text-[#d4af37] animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-1">
          إعدادات{" "}
          <span className="bg-gradient-to-l from-[#f5e6b8] to-[#d4af37] bg-clip-text text-transparent">
            المتجر
          </span>
        </h1>
        <p className="text-white/45 text-sm">
          تحكّم في بيانات المتجر وما يظهر للعملاء في الواجهة
        </p>
      </div>

      <div className="space-y-6 max-w-3xl">
        {SECTIONS.map((section) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#101013] border border-white/10 rounded-2xl p-6"
          >
            <h3 className="font-bold mb-5 flex items-center gap-2 text-[#d4af37]">
              <section.icon className="w-5 h-5" />
              {section.title}
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {FIELDS.filter((f) => f.section === section.id).map((f) => (
                <div
                  key={f.key}
                  className={f.key === "announcement" || f.key === "hero_subtitle" ? "sm:col-span-2" : ""}
                >
                  <label className="block text-sm text-white/60 mb-1.5">{f.label}</label>
                  <input
                    value={values[f.key] ?? ""}
                    onChange={(e) =>
                      setValues({ ...values, [f.key]: e.target.value })
                    }
                    dir={f.dir || "rtl"}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm focus:border-[#d4af37] focus:outline-none transition-colors placeholder:text-white/30"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        <div className="flex items-center gap-4">
          <button
            onClick={save}
            disabled={saving}
            className="flex items-center gap-2 bg-gradient-to-l from-[#d4af37] to-[#b8912a] text-black font-bold px-8 py-4 rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            حفظ الإعدادات
          </button>
          {saved && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-green-400 text-sm"
            >
              <CheckCircle2 className="w-5 h-5" />
              تم الحفظ بنجاح
            </motion.span>
          )}
        </div>
      </div>
    </div>
  );
}
