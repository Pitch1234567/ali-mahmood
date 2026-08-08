"use client";

import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

export function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 170, damping: 26 });
  const smoothY = useSpring(y, { stiffness: 170, damping: 26 });
  const rotateY = useTransform(smoothX, [-1, 1], [-1.5, 1.5]);
  const rotateX = useTransform(smoothY, [-1, 1], [1.5, -1.5]);

  return (
    <m.article
      className={className}
      style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}
      onPointerMove={(event) => {
        if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
        y.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </m.article>
  );
}
