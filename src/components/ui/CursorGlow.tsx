"use client";

import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[60] hidden h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-3xl md:block"
      style={{ left: position.x, top: position.y }}
    />
  );
}
