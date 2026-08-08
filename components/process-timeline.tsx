"use client";

import type { ProcessStep } from "@/content/site";
import { LottieVisual } from "./lottie-visual";

export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="process-stage">
      <LottieVisual
        src="/lottie/process-route.lottie"
        posterSrc="/lottie/process-poster.svg"
        label="A route connects the four project stages"
        playWhenVisible
        className="process-lottie"
      />
      <div className="process-steps">
        {steps.map((step, index) => (
          <article className="process-step" key={step.id} style={{ "--step-index": index } as React.CSSProperties}>
            <span className="process-step-shape" aria-hidden="true" />
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
