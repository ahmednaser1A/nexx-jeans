"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Sparkles } from "lucide-react";
import { useCart } from "@/lib/cart";
import { scrollToId } from "@/lib/scroll";

const LINKS = [
  { href: "#home", label: "الرئيسية" },
  { href: "#categories", label: "الأقسام" },
  { href: "#products", label: "المنتجات" },
  { href: "#studio", label: "الاستوديو 3D" },
  { href: "#gallery3d", label: "معرض 3D" },
  { href: "#features", label: "المميزات" },
  { href: "#about", label: "عنّا" },
];

export default function Navbar({
  storeName,
  announcement,
}: {
  storeName: string;
  announcement: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [curtain, setCurtain] = useState(false);
  const { count, setOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (href: string) => {
    setMobileOpen(false);
    setCurtain(true);
    setTimeout(() => {
      scrollToId(href);
      setTimeout(() => setCurtain(false), 550);
    }, 480);
  };

  return (
    <>
      {/* Cinematic curtain transition */}
      <AnimatePresence>
        {curtain && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[95] origin-bottom bg-gradient-to-b from-[#0a0a0c] via-[#14100a] to-[#d4af37]/20 flex items-center justify-center pointer-events-none"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-black bg-gradient-to-b from-[#f5e6b8] to-[#d4af37] bg-clip-text text-transparent"
            >
              {storeName}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Announcement bar */}
      <div className="fixed top-0 inset-x-0 z-50 bg-gradient-to-l from-[#8a6d1f] via-[#d4af37] to-[#8a6d1f] text-black text-center text-xs sm:text-sm font-semibold py-2 px-4">
        <span className="inline-flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          {announcement}
        </span>
      </div>

      <header
        className={`fixed top-[33px] inset-x-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-[#d4af37]/20 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => goTo("#home")}
            className="flex items-center gap-2 group"
          >
            <span className="text-3xl font-black bg-gradient-to-b from-[#f5e6b8] to-[#d4af37] bg-clip-text text-transparent group-hover:drop-shadow-[0_0_12px_rgba(212,175,55,0.6)] transition-all">
              {storeName}
            </span>
            <span className="hidden sm:block text-[10px] tracking-[0.3em] text-white/40 border-r border-white/20 pr-2">
              LUXURY
            </span>
          </button>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-7">
            {LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => goTo(l.href)}
                className="relative text-sm text-white/70 hover:text-[#d4af37] transition-colors py-2 after:absolute after:bottom-0 after:right-0 after:h-[2px] after:w-0 after:bg-[#d4af37] after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="relative p-2.5 rounded-full border border-[#d4af37]/30 hover:border-[#d4af37] hover:bg-[#d4af37]/10 transition-all group"
              aria-label="سلة التسوق"
            >
              <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-[#d4af37] text-black text-[11px] font-bold flex items-center justify-center"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-full border border-white/20"
              aria-label="القائمة"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-t border-[#d4af37]/20"
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {LINKS.map((l) => (
                  <button
                    key={l.href}
                    onClick={() => goTo(l.href)}
                    className="text-right py-3 text-white/80 hover:text-[#d4af37] border-b border-white/5 transition-colors"
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
