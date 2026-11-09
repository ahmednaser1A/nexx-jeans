"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  ShieldCheck,
  Lock,
} from "lucide-react";
import Link from "next/link";

export default function Footer({
  settings,
}: {
  settings: Record<string, string>;
}) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = () => {
    if (!email.includes("@")) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  const whatsappUrl = `https://wa.me/${(settings.whatsapp || "").replace(
    /[^0-9]/g,
    ""
  )}`;

  return (
    <footer className="relative bg-[#050506] border-t border-[#d4af37]/15">
      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 border-b border-white/8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black mb-1">
              اشترك في نشرتنا البريدية
            </h3>
            <p className="text-white/50 text-sm">
              كن أول من يعرف عن التشكيلات الجديدة والعروض الحصرية
            </p>
          </div>
          <div className="flex w-full lg:w-auto gap-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && subscribe()}
              placeholder="بريدك الإلكتروني"
              className="flex-1 lg:w-80 bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm focus:border-[#d4af37] focus:outline-none transition-colors placeholder:text-white/30"
            />
            <button
              onClick={subscribe}
              className="flex items-center gap-2 bg-[#d4af37] text-black font-bold px-5 py-3 rounded-xl hover:bg-[#e8c84a] transition-colors whitespace-nowrap"
            >
              <Send className="w-4 h-4" />
              اشترك
            </button>
          </div>
        </div>
        {subscribed && (
          <p className="text-green-400 text-sm mt-3">
            تم الاشتراك بنجاح! أهلاً بك في عائلة NEXX JEANS
          </p>
        )}
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="text-4xl font-black bg-gradient-to-b from-[#f5e6b8] to-[#d4af37] bg-clip-text text-transparent mb-3">
            {settings.store_name || "NEXX JEANS"}
          </div>
          <p className="text-white/50 text-sm leading-relaxed mb-5">
            {settings.store_tagline || "دار الأزياء الفاخرة"} — وجهتك الأولى
            لتشكيلة الدنيم والستريت وير وتجربة تسوق سهلة وواضحة.
          </p>
          <div className="flex gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full border border-white/15 hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
              aria-label="واتساب"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href={settings.email ? `mailto:${settings.email}` : "#contact"}
              className="p-2.5 rounded-full border border-white/15 hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
              aria-label="البريد الإلكتروني"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href={`tel:${settings.phone || ""}`}
              className="p-2.5 rounded-full border border-white/15 hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
              aria-label="الهاتف"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-4 text-[#d4af37]">روابط سريعة</h4>
          <ul className="space-y-2.5 text-white/55 text-sm">
            {[
              ["الرئيسية", "#home"],
              ["الأقسام", "#categories"],
              ["المنتجات", "#products"],
              ["الاستوديو 3D", "#studio"],
              ["معرض 3D", "#gallery3d"],
              ["عنّا", "#about"],
            ].map(([label, href]) => (
              <li key={href}>
                <a href={href} className="hover:text-[#d4af37] transition-colors">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-4 text-[#d4af37]">الأقسام</h4>
          <ul className="space-y-2.5 text-white/55 text-sm">
            {["جينز رجالي", "جينز نسائي", "جاكيتات جينز", "تيشيرتات", "بناطيل", "هوديز"].map(
              (c) => (
                <li key={c}>
                  <a href="#products" className="hover:text-[#d4af37] transition-colors">
                    {c}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-4 text-[#d4af37]">تواصل معنا</h4>
          <ul className="space-y-3.5 text-white/55 text-sm">
            <li className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#d4af37] shrink-0" />
              {settings.address}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span dir="ltr">{settings.phone}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
              {settings.email}
            </li>
          </ul>
          <div className="mt-5 flex items-center gap-2 text-white/40 text-xs">
            <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
            دفع آمن عند الاستلام
          </div>
        </div>
      </div>

      <div className="border-t border-white/8 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <span>
            © {new Date().getFullYear()} {settings.store_name || "NEXX JEANS"} — جميع الحقوق محفوظة
          </span>
          <Link
            href="/admin/login"
            className="flex items-center gap-1.5 hover:text-[#d4af37] transition-colors"
          >
            <Lock className="w-3.5 h-3.5" /> لوحة الإدارة
          </Link>
        </div>
      </div>
    </footer>
  );
}
