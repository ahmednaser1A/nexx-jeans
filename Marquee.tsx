"use client";

import { Gem } from "lucide-react";

const ITEMS = [
  "تشكيلة 2026 الحصرية",
  "شحن مجاني فوق 1000 جنيه",
  "جودة عالمية مضمونة",
  "مجسمات 3D واقعية",
  "دفع عند الاستلام",
  "خصم 20% على الجديد",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative bg-gradient-to-l from-[#8a6d1f] via-[#d4af37] to-[#8a6d1f] py-3.5 overflow-hidden" dir="ltr">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused]">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 mx-6 text-black font-bold text-sm whitespace-nowrap"
          >
            <Gem className="w-4 h-4" />
            {item}
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}
