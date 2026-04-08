"use client";

import Tilt from "react-parallax-tilt";
import { ReactNode } from "react";

type HoverTiltProps = {
  children: ReactNode;
  className?: string;
};

export default function HoverTilt({ children, className }: HoverTiltProps) {
  return (
    <Tilt
      glareEnable
      glareMaxOpacity={0.22}
      glareColor="#34f5ff"
      glarePosition="all"
      tiltMaxAngleX={12}
      tiltMaxAngleY={12}
      perspective={1100}
      scale={1.02}
      transitionSpeed={600}
      className={className}
    >
      {children}
    </Tilt>
  );
}
