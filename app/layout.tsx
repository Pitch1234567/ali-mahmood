import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { MotionProvider } from "@/components/motion-provider";
import { getSiteUrl } from "@/lib/site-url";

import "./globals.css";

const deploymentOrigin = getSiteUrl();

const manrope = localFont({
  src: "./fonts/manrope-latin-variable.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});

const jetbrainsMono = localFont({
  src: "./fonts/jetbrains-mono-latin-variable.woff2",
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: "100 800",
});

export const metadata: Metadata = {
  metadataBase: deploymentOrigin,
  title: "Ali Mahmood | Web Developer",
  description:
    "Ali Mahmood designs and builds clear, responsive websites that help businesses earn trust and guide visitors toward action.",
  applicationName: "Ali Mahmood Portfolio",
  authors: [{ name: "Ali Mahmood" }],
  creator: "Ali Mahmood",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Ali Mahmood | Web Developer",
    description: "Websites that make your business easier to trust.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ali Mahmood | Web Developer",
    description: "Websites that make your business easier to trust.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#080b10",
};

const sameAs = [
  process.env.NEXT_PUBLIC_GITHUB_URL,
  process.env.NEXT_PUBLIC_LINKEDIN_URL,
].flatMap((value) => {
  if (!value) return [];
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? [url.toString()] : [];
  } catch {
    return [];
  }
});

const publicEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ali Mahmood",
  jobTitle: "Web developer",
  url: deploymentOrigin.toString(),
  ...(publicEmail ? { email: publicEmail } : {}),
  ...(sameAs.length > 0 ? { sameAs } : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${jetbrainsMono.variable}`}>
      <body data-design-seed="0be00df4">
        <script
          id="portfolio-design-contract"
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              thesis: "Business trust translated through a dark studio proofing table, refusing the generic neon developer template.",
              world: "Near-black field, optical glass at interactive elevations, one icy cyan signal, authored concept imagery.",
              story: "Understand the offer, inspect honest examples, see the process, preview a project brief.",
              firstViewport: "Asymmetric copy-left hero with a layered portrait plate on the right and both actions above the fold.",
              form: "Night Glass proofing table, user-pinned direction, seed 0be00df4.",
              finish: "unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md",
            }).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
