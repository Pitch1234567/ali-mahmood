import type { StaticImageData } from "next/image";

import focusFlowCover from "@/public/images/focusflow-cover.png";
import serviceSparkCover from "@/public/images/servicespark-cover.png";
import tableReadyCover from "@/public/images/tableready-cover.png";

export type SectionId =
  | "home"
  | "about"
  | "services"
  | "work"
  | "process"
  | "contact";

export type LinkState =
  | { status: "ready"; label: string; href: string }
  | { status: "placeholder"; label: string };

function externalLink(value: string | undefined, label: string, placeholderLabel: string): LinkState {
  if (!value) return { status: "placeholder", label: placeholderLabel };

  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return { status: "placeholder", label: placeholderLabel };
    }
    return { status: "ready", label, href: url.toString() };
  } catch {
    return { status: "placeholder", label: placeholderLabel };
  }
}

function emailLink(value: string | undefined): LinkState {
  const email = value?.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "placeholder", label: "Email not published" };
  }

  return { status: "ready", label: email, href: `mailto:${email}` };
}

export type ProjectId = "servicespark" | "focusflow" | "tableready";

export interface Project {
  id: ProjectId;
  title: string;
  status: "concept";
  summary: string;
  focus: string[];
  technologies: string[];
  cover: StaticImageData;
  coverAlt: string;
  featured: boolean;
  repository: LinkState;
  liveSite: LinkState;
}

export interface Service {
  id: string;
  title: string;
  outcome: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

export const navigation: Array<{ id: SectionId; label: string }> = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
];

export const siteProfile = {
  name: "Ali Mahmood",
  role: "Web developer",
  portraitIsPlaceholder: true,
  email: emailLink(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  github: externalLink(
    process.env.NEXT_PUBLIC_GITHUB_URL,
    "GitHub",
    "GitHub not published",
  ),
  linkedin: externalLink(
    process.env.NEXT_PUBLIC_LINKEDIN_URL,
    "LinkedIn",
    "LinkedIn not published",
  ),
} satisfies {
  name: "Ali Mahmood";
  role: "Web developer";
  portraitIsPlaceholder: boolean;
  email: LinkState;
  github: LinkState;
  linkedin: LinkState;
};

export const services: Service[] = [
  {
    id: "business-websites",
    title: "Business websites",
    outcome: "Explain the offer clearly and make enquiries easy on every device.",
  },
  {
    id: "landing-pages",
    title: "Landing pages",
    outcome: "Focus one message around one useful action without distracting detours.",
  },
  {
    id: "portfolio-websites",
    title: "Portfolio websites",
    outcome: "Present your work with clarity, credibility, and a memorable visual point of view.",
  },
  {
    id: "website-redesign",
    title: "Website redesign",
    outcome: "Turn a dated experience into a clearer, faster, more confident one.",
  },
  {
    id: "maintenance",
    title: "Ongoing maintenance",
    outcome: "Keep content, performance, and interface quality current after launch.",
  },
];

export const projects: Project[] = [
  {
    id: "servicespark",
    title: "ServiceSpark",
    status: "concept",
    summary:
      "A local home-service website shaped around a clearer offer and a shorter path to mobile enquiries.",
    focus: ["Messaging", "Mobile conversion", "Accessible forms"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    cover: serviceSparkCover,
    coverAlt:
      "Concept preview of a dark architectural home with a cyan route leading to the entrance",
    featured: true,
    repository: externalLink(
      process.env.NEXT_PUBLIC_SERVICESPARK_GITHUB_URL,
      "View GitHub",
      "Repository not published",
    ),
    liveSite: externalLink(
      process.env.NEXT_PUBLIC_SERVICESPARK_LIVE_URL,
      "Visit site",
      "Live demo not published",
    ),
  },
  {
    id: "focusflow",
    title: "FocusFlow",
    status: "concept",
    summary:
      "A calm task-planning concept that clarifies priorities, progress, and the next useful action.",
    focus: ["Product UI", "State feedback", "Responsive dashboard"],
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    cover: focusFlowCover,
    coverAlt:
      "Concept preview of translucent paths resolving from a tangled flow into one clear route",
    featured: false,
    repository: externalLink(
      process.env.NEXT_PUBLIC_FOCUSFLOW_GITHUB_URL,
      "View GitHub",
      "Repository not published",
    ),
    liveSite: externalLink(
      process.env.NEXT_PUBLIC_FOCUSFLOW_LIVE_URL,
      "Visit site",
      "Live demo not published",
    ),
  },
  {
    id: "tableready",
    title: "TableReady",
    status: "concept",
    summary:
      "A restaurant discovery and reservation flow designed around availability and effortless booking.",
    focus: ["Interaction design", "Booking flow", "Accessibility"],
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    cover: tableReadyCover,
    coverAlt:
      "Concept preview of a refined dark table setting crossed by a restrained cyan light",
    featured: false,
    repository: externalLink(
      process.env.NEXT_PUBLIC_TABLEREADY_GITHUB_URL,
      "View GitHub",
      "Repository not published",
    ),
    liveSite: externalLink(
      process.env.NEXT_PUBLIC_TABLEREADY_LIVE_URL,
      "Visit site",
      "Live demo not published",
    ),
  },
];

export const processSteps: ProcessStep[] = [
  {
    id: "understand",
    title: "Understand",
    description: "Clarify the audience, goal, content, and practical constraints.",
  },
  {
    id: "shape",
    title: "Shape",
    description: "Set the message, hierarchy, and responsive interaction plan.",
  },
  {
    id: "build",
    title: "Build",
    description: "Create typed, reusable components with accessibility built in.",
  },
  {
    id: "refine",
    title: "Refine",
    description: "Test real breakpoints, keyboard flow, motion settings, and performance.",
  },
];
