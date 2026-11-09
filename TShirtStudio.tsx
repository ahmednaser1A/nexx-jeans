"use client";

import { useRef, useState } from "react";
import * as THREE from "three";
import Scene3D, { type SceneApi } from "./Scene3D";
import { buildTShirt } from "./models-fashion";
import { makePedestal, makeParticles, tickParticles } from "./three-utils";
import { useCart } from "@/lib/cart";
import { ShoppingBag, RotateCcw, Palette } from "lucide-react";

const COLORS = [
  { name: "أسود ملكي", hex: "#1a1a1e", three: 0x1a1a1e },
  { name: "أبيض نقي", hex: "#f2f0ea", three: 0xf2f0ea },
  { name: "ذهبي فاخر", hex: "#d4af37", three: 0xd4af37 },
  { name: "عنابي", hex: "#7a1f2b", three: 0x7a1f2b },
  { name: "كحلي", hex: "#1e2a4a", three: 0x1e2a4a },
  { name: "زيتي", hex: "#4a5230", three: 0x4a5230 },
  { name: "وردي", hex: "#d48a9e", three: 0xd48a9e },
  { name: "رمادي", hex: "#6b6b72", three: 0x6b6b72 },
];

const SIZES = ["S", "M", "L", "XL", "XXL"];
const PRICE = 899;

export default function TShirtStudio() {
  const [color, setColor] = useState(COLORS[0]);
  const [size, setSize] = useState("M");
  const apiRef = useRef<SceneApi | null>(null);
  const { addItem, setOpen } = useCart();

  const applyColor = (c: (typeof COLORS)[number]) => {
    setColor(c);
    const api = apiRef.current;
    if (api) {
      api.group.traverse((o) => {
        if (o instanceof THREE.Mesh && o.name === "shirtBody") {
          (o.material as THREE.MeshStandardMaterial).color.setHex(c.three);
        }
      });
    }
  };

  const handleAdd = () => {
    addItem({
      productId: 9999,
      name: `تيشيرت NEXX JEANS المخصص — ${color.name}`,
      price: PRICE,
      image:
        "https://images.pexels.com/photos/1521574/pexels-photo-1521574.jpeg?auto=compress&cs=tinysrgb&w=800",
      size,
      color: color.name,
    });
    setOpen(true);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-10 items-center">
      {/* 3D Canvas */}
      <div className="relative h-[420px] sm:h-[520px] rounded-3xl overflow-hidden border border-[#d4af37]/20 bg-gradient-to-b from-[#141418] to-[#0a0a0c]">
        <Scene3D
          interactive
          cameraPosition={[0, 1.2, 3.4]}
          target={[0, 0.9, 0]}
          onReady={(api) => {
            apiRef.current = api;
          }}
          build={({ group }) => {
            const pedestal = makePedestal(0.95, 0.14);
            pedestal.position.y = 0.07;
            group.add(pedestal);
            const shirt = buildTShirt(group, color.three);
            shirt.position.y = 1.05;
            shirt.rotation.x = 0.08;
            const particles = makeParticles(160, 7, 3.6);
            group.add(particles);
            return (_t: number, dt: number) => {
              tickParticles(particles, dt);
              shirt.position.y = 1.05 + Math.sin(_t * 1.2) * 0.03;
            };
          }}
        />
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 backdrop-blur px-3 py-1.5 rounded-full border border-[#d4af37]/30 text-xs text-[#d4af37]">
          <RotateCcw className="w-3.5 h-3.5" />
          اسحب للتدوير
        </div>
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur px-3 py-1.5 rounded-full border border-white/10 text-xs text-white/70">
          مجسم ثلاثي الأبعاد تفاعلي
        </div>
      </div>

      {/* Controls */}
      <div>
        <div className="flex items-center gap-2 text-[#d4af37] mb-3">
          <Palette className="w-5 h-5" />
          <span className="text-sm tracking-widest">استوديو التصميم ثلاثي الأبعاد</span>
        </div>
        <h3 className="text-3xl sm:text-4xl font-bold mb-3">
          صمّم تيشيرتك الخاص
        </h3>
        <p className="text-white/60 leading-relaxed mb-6">
          اختر اللون والمقاس وشاهد النتيجة مباشرة في مجسم ثلاثي الأبعاد واقعي
          بإضاءة سينمائية. قطن فاخر 100% بطبعة ذهبية حصرية.
        </p>

        <div className="mb-5">
          <div className="text-sm text-white/70 mb-2">
            اللون: <span className="text-[#d4af37] font-semibold">{color.name}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {COLORS.map((c) => (
              <button
                key={c.name}
                onClick={() => applyColor(c)}
                className={`w-10 h-10 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
                  color.name === c.name
                    ? "border-[#d4af37] scale-110 shadow-[0_0_16px_rgba(212,175,55,0.5)]"
                    : "border-white/20"
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="text-sm text-white/70 mb-2">
            المقاس: <span className="text-[#d4af37] font-semibold">{size}</span>
          </div>
          <div className="flex gap-2">
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
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

        <div className="flex items-center gap-4">
          <div className="text-3xl font-bold text-[#d4af37]">
            {PRICE} <span className="text-base text-white/50">جنيه</span>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-gradient-to-l from-[#d4af37] to-[#b8912a] text-black font-bold px-7 py-3.5 rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.45)] transition-all duration-300 hover:scale-[1.03]"
          >
            <ShoppingBag className="w-5 h-5" />
            أضف إلى السلة
          </button>
        </div>
      </div>
    </div>
  );
}
