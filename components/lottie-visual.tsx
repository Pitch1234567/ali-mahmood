"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const DotLottieReact = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then((module) => {
      module.setWasmUrl("/wasm/dotlottie-player.wasm");
      return module.DotLottieReact;
    }),
  { ssr: false },
);

type DotLottieInstance = {
  addEventListener: (name: string, handler: () => void) => void;
  removeEventListener: (name: string, handler: () => void) => void;
  pause: () => void;
  play: () => void;
  setFrame: (frame: number) => void;
  setLoop: (loop: boolean) => void;
};

export function LottieVisual({
  src,
  posterSrc,
  label,
  playWhenVisible = false,
  playToken = 0,
  className,
}: {
  src: string;
  posterSrc: string;
  label: string;
  playWhenVisible?: boolean;
  playToken?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<DotLottieInstance | null>(null);
  const playedRef = useRef(false);
  const inView = useInView(containerRef, { amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const [instance, setInstance] = useState<DotLottieInstance | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!instance) return;

    const handleLoad = () => setLoaded(true);
    const handleError = () => setFailed(true);
    instance.setLoop(false);
    instance.addEventListener("load", handleLoad);
    instance.addEventListener("loadError", handleError);

    return () => {
      instance.removeEventListener("load", handleLoad);
      instance.removeEventListener("loadError", handleError);
    };
  }, [instance]);

  useEffect(() => {
    const instance = instanceRef.current;
    if (!instance || reduceMotion || failed) return;

    if (playToken > 0) {
      instance.setFrame(0);
      instance.play();
      return;
    }

    if (playWhenVisible && inView && !playedRef.current) {
      playedRef.current = true;
      instance.setFrame(0);
      instance.play();
    } else if (!inView) {
      instance.pause();
    }
  }, [failed, inView, playToken, playWhenVisible, reduceMotion]);

  useEffect(() => {
    const handleVisibility = () => {
      const instance = instanceRef.current;
      if (!instance) return;
      if (document.hidden) instance.pause();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`lottie-visual ${className ?? ""}`}
      role="img"
      aria-label={label}
    >
      <Image
        className="lottie-poster"
        src={posterSrc}
        width={480}
        height={180}
        alt=""
        aria-hidden="true"
      />
      {!reduceMotion && !failed && (
        <div className="lottie-canvas" data-loaded={loaded} aria-hidden="true">
          <DotLottieReact
            src={src}
            autoplay={false}
            loop={false}
            renderConfig={{ autoResize: true }}
            dotLottieRefCallback={(instance) => {
              const typedInstance = instance as DotLottieInstance | null;
              instanceRef.current = typedInstance;
              setInstance(typedInstance);
            }}
          />
        </div>
      )}
    </div>
  );
}
