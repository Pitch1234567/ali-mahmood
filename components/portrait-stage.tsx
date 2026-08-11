"use client";

import Image from "next/image";
import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

import portrait from "@/public/images/ali-mahmood-portrait.jpeg";

export function PortraitStage() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 150, damping: 24, mass: 0.7 });
  const springY = useSpring(pointerY, { stiffness: 150, damping: 24, mass: 0.7 });
  const rotateY = useTransform(springX, [-1, 1], [-3, 3]);
  const rotateX = useTransform(springY, [-1, 1], [3, -3]);
  const translateX = useTransform(springX, [-1, 1], [-6, 6]);
  const translateY = useTransform(springY, [-1, 1], [-5, 5]);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <figure className="portrait-figure">
      <div className="portrait-perspective" onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
        <m.div
          className="portrait-stage"
          style={
            reduceMotion
              ? undefined
              : { rotateX, rotateY, x: translateX, y: translateY }
          }
        >
          <span className="portrait-atmosphere" aria-hidden="true" />
          <span className="portrait-grid-plane" aria-hidden="true" />
          <span className="portrait-back-plane" aria-hidden="true" />
          <div className="portrait-image-plane">
            <Image
              src={portrait}
              alt="Portrait of Ali Mahmood"
              sizes="(max-width: 767px) 86vw, (max-width: 1099px) 58vw, 38vw"
              fetchPriority="high"
              className="portrait-image"
            />
          </div>
          <span className="portrait-front-plane" aria-hidden="true" />
          <span className="portrait-reflection" aria-hidden="true" />
        </m.div>
      </div>
    </figure>
  );
}
