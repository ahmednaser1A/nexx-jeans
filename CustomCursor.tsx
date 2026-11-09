"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let hovering = false;
    let label = "";

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest(
        "a, button, input, select, textarea, [data-cursor]"
      );
      hovering = !!interactive;
      label = t.closest("[data-cursor]")?.getAttribute("data-cursor") || "";
      if (labelRef.current) {
        labelRef.current.textContent = label;
        labelRef.current.style.opacity = label ? "1" : "0";
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);

    let raf: number;
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%) scale(${hovering ? 0.4 : 1})`;
      }
      if (ringRef.current) {
        const scale = label ? 2.6 : hovering ? 1.9 : 1;
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%) scale(${scale})`;
        ringRef.current.style.borderColor = hovering
          ? "rgba(212,175,55,0.95)"
          : "rgba(212,175,55,0.5)";
        ringRef.current.style.backgroundColor = label
          ? "rgba(212,175,55,0.12)"
          : "transparent";
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[199] w-10 h-10 rounded-full border-2 border-[#d4af37]/50 pointer-events-none hidden md:flex items-center justify-center transition-[border-color,background-color] duration-200"
      />
      <div
        ref={labelRef}
        className="fixed top-0 left-0 z-[200] text-[10px] font-bold text-[#d4af37] pointer-events-none hidden md:block opacity-0 transition-opacity duration-200"
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[201] w-2 h-2 rounded-full bg-[#d4af37] pointer-events-none hidden md:block shadow-[0_0_10px_rgba(212,175,55,0.8)]"
      />
    </>
  );
}
