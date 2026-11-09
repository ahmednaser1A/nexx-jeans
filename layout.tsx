"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  LogOut,
  Menu,
  X,
  Store,
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "لوحة التحكم", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "المنتجات", icon: Package },
  { href: "/admin/orders", label: "الطلبات", icon: ShoppingCart },
  { href: "/admin/settings", label: "الإعدادات", icon: Settings },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Don't show sidebar on login page
  if (pathname === "/admin/login") return <>{children}</>;

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-[#070708] text-white flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-50 inset-y-0 right-0 w-64 bg-[#0b0b0e] border-l border-[#d4af37]/15 flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-5 border-b border-white/8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black bg-gradient-to-b from-[#f5e6b8] to-[#d4af37] bg-clip-text text-transparent">
              NEXX
            </span>
            <span className="text-[10px] tracking-[0.25em] text-white/40">ADMIN</span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-1.5 rounded-lg border border-white/15"
            aria-label="إغلاق القائمة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                isActive(item.href, item.exact)
                  ? "bg-gradient-to-l from-[#d4af37]/20 to-transparent border border-[#d4af37]/40 text-[#d4af37] font-bold"
                  : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/8 space-y-1.5">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all"
          >
            <Store className="w-5 h-5" />
            عرض المتجر
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400/80 hover:text-red-400 hover:bg-red-400/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main */}
      <main className="flex-1 min-w-0">
        <div className="lg:hidden sticky top-0 z-30 bg-[#070708]/90 backdrop-blur border-b border-white/8 px-4 py-3 flex items-center justify-between">
          <span className="font-bold text-[#d4af37]">لوحة الإدارة</span>
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-lg border border-white/15"
            aria-label="فتح القائمة"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 sm:p-8 max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
