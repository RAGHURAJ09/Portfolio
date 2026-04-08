"use client";

import { useEffect, useMemo, useState } from "react";

type TypewriterProps = {
  lines: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
};

export default function Typewriter({
  lines,
  typingSpeed = 65,
  deletingSpeed = 35,
  pauseMs = 1200,
}: TypewriterProps) {
  const safeLines = useMemo(() => lines.filter(Boolean), [lines]);
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!safeLines.length) {
      return;
    }

    const current = safeLines[lineIndex % safeLines.length];
    const doneTyping = text === current;
    const doneDeleting = text === "";

    const timer = setTimeout(
      () => {
        if (!isDeleting && doneTyping) {
          setIsDeleting(true);
          return;
        }

        if (isDeleting && doneDeleting) {
          setIsDeleting(false);
          setLineIndex((prev) => (prev + 1) % safeLines.length);
          return;
        }

        setText((prev) => {
          if (isDeleting) {
            return current.slice(0, Math.max(prev.length - 1, 0));
          }
          return current.slice(0, prev.length + 1);
        });
      },
      !isDeleting && doneTyping ? pauseMs : isDeleting ? deletingSpeed : typingSpeed,
    );

    return () => clearTimeout(timer);
  }, [text, lineIndex, isDeleting, safeLines, typingSpeed, deletingSpeed, pauseMs]);

  return (
    <p className="text-lg md:text-xl text-cyan-200/90 min-h-8">
      {text}
      <span className="inline-block w-3 animate-pulse text-fuchsia-300">|</span>
    </p>
  );
}
