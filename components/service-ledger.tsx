"use client";

import { CaretDown } from "@phosphor-icons/react";
import { AnimatePresence, m } from "motion/react";
import { useState } from "react";

import type { Service } from "@/content/site";

export function ServiceLedger({ services }: { services: Service[] }) {
  const [activeId, setActiveId] = useState(services[0]?.id ?? "");

  return (
    <div className="service-ledger">
      {services.map((service) => {
        const expanded = activeId === service.id;
        const panelId = `${service.id}-panel`;
        return (
          <div className="service-row" data-active={expanded} key={service.id}>
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => setActiveId(expanded ? "" : service.id)}
              onFocus={() => setActiveId(service.id)}
              onMouseEnter={() => {
                if (window.matchMedia("(pointer: fine)").matches) setActiveId(service.id);
              }}
            >
              <span>{service.title}</span>
              <CaretDown aria-hidden="true" size={22} weight="regular" />
            </button>
            <AnimatePresence initial={false}>
              {expanded && (
                <m.div
                  id={panelId}
                  className="service-outcome"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p>{service.outcome}</p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
