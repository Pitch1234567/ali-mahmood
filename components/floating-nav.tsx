"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { List, X } from "@phosphor-icons/react";
import { m, useScroll } from "motion/react";
import { useEffect, useState } from "react";

import { navigation, type SectionId } from "@/content/site";

const desktopLinks = navigation.filter(
  ({ id }) => id !== "home" && id !== "contact",
);

export function FloatingNav() {
  const [active, setActive] = useState<SectionId>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const sections = navigation
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActive(visible.target.id as SectionId);
      },
      { rootMargin: "-28% 0px -58%", threshold: [0.05, 0.25, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-nav-shell">
      <nav className="site-nav glass-surface" aria-label="Primary navigation">
        <m.span
          className="nav-progress"
          style={{ scaleX: scrollYProgress }}
          aria-hidden="true"
        />
        <a
          className="monogram-link"
          href="#home"
          aria-label="Ali Mahmood, home"
          aria-current={active === "home" ? "page" : undefined}
        >
          <span className="monogram">AM.</span>
        </a>

        <div className="desktop-nav-links">
          {desktopLinks.map(({ id, label }) => (
            <a
              className="nav-link"
              href={`#${id}`}
              key={id}
              aria-current={active === id ? "location" : undefined}
            >
              {active === id && (
                <m.span
                  className="nav-active-surface"
                  layoutId="active-navigation"
                  transition={{ type: "spring", stiffness: 380, damping: 38 }}
                />
              )}
              <span>{label}</span>
            </a>
          ))}
        </div>

        <a
          className="nav-cta"
          href="#contact"
          aria-current={active === "contact" ? "location" : undefined}
        >
          Start a project
        </a>

        <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <Dialog.Trigger asChild>
            <button
              className="menu-trigger"
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              data-open={menuOpen}
            >
              <List aria-hidden="true" size={22} weight="regular" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="menu-overlay" />
            <Dialog.Content className="mobile-menu glass-surface" aria-describedby={undefined}>
              <div className="mobile-menu-topline">
                <Dialog.Title>Navigate</Dialog.Title>
                <Dialog.Close asChild>
                  <button className="icon-button" type="button" aria-label="Close navigation menu">
                    <X aria-hidden="true" size={22} weight="regular" />
                  </button>
                </Dialog.Close>
              </div>
              <div className="mobile-menu-links">
                {navigation.map(({ id, label }) => {
                  const finalLabel = id === "contact" ? "Start a project" : label;
                  return (
                    <a
                      key={id}
                      href={`#${id}`}
                      onClick={closeMenu}
                      aria-current={active === id ? "location" : undefined}
                    >
                      <span>{finalLabel}</span>
                      <span className="mobile-link-rule" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </nav>
    </header>
  );
}
