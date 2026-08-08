import { ArrowDownRight, ArrowUp, ArrowUpRight } from "@phosphor-icons/react/ssr";
import Image from "next/image";

import { ContactForm } from "@/components/contact-form";
import { FloatingNav } from "@/components/floating-nav";
import { PortraitStage } from "@/components/portrait-stage";
import { ProcessTimeline } from "@/components/process-timeline";
import { ProjectNotesDialog } from "@/components/project-notes-dialog";
import { Reveal } from "@/components/reveal";
import { ServiceLedger } from "@/components/service-ledger";
import { TiltCard } from "@/components/tilt-card";
import {
  processSteps,
  projects,
  services,
  siteProfile,
  type LinkState,
  type Project,
} from "@/content/site";

function ProjectBody({ project }: { project: Project }) {
  return (
    <>
      <div className="project-media">
        <Image
          src={project.cover}
          alt={project.coverAlt}
          sizes={project.featured ? "(max-width: 767px) 100vw, 62vw" : "(max-width: 767px) 100vw, 34vw"}
          className="project-image"
        />
      </div>
      <div className="project-copy">
        <p className="project-status">Concept project</p>
        <h3>{project.title}</h3>
        <p className="project-summary">{project.summary}</p>
        <p className="project-focus">{project.focus.join(" / ")}</p>
        <div className="project-actions">
          <ProjectNotesDialog projectId={project.id} title={project.title} />
          {project.repository.status === "ready" && (
            <a href={project.repository.href} target="_blank" rel="noreferrer">
              {project.repository.label}
              <ArrowUpRight aria-hidden="true" size={16} weight="regular" />
            </a>
          )}
          {project.liveSite.status === "ready" && (
            <a href={project.liveSite.href} target="_blank" rel="noreferrer">
              {project.liveSite.label}
              <ArrowUpRight aria-hidden="true" size={16} weight="regular" />
            </a>
          )}
        </div>
        <ul className="technology-list" aria-label={`${project.title} technologies`}>
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default function Home() {
  const year = new Date().getFullYear();
  const featuredProject = projects.find((project) => project.featured)!;
  const supportingProjects = projects.filter((project) => !project.featured);
  const profileLinks = [siteProfile.email, siteProfile.github, siteProfile.linkedin].filter(
    (link): link is Extract<LinkState, { status: "ready" }> => link.status === "ready",
  );
  const contactEmail =
    siteProfile.email.status === "ready"
      ? siteProfile.email.label
      : undefined;
  const deliveryConfigured = Boolean(
    process.env.RESEND_API_KEY &&
      process.env.CONTACT_TO_EMAIL &&
      process.env.CONTACT_FROM_EMAIL,
  );

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <FloatingNav />

      <main id="main-content">
        <section className="hero-section section-shell" id="home" aria-labelledby="hero-title">
          <div className="hero-atmosphere" aria-hidden="true" />
          <div className="page-frame hero-grid">
            <div className="hero-copy">
              <h1 id="hero-title">
                <span className="hero-line">Websites that make your </span>
                <span className="hero-line">business easier to trust.</span>
              </h1>
              <p className="hero-lead">
                Clear, responsive experiences that explain your offer and make the next step obvious.
              </p>
              <div className="hero-actions">
                <a className="primary-button" href="#contact">
                  Start a project
                  <ArrowUpRight aria-hidden="true" size={19} weight="regular" />
                </a>
                <a className="secondary-link" href="#work">
                  View selected work
                  <ArrowDownRight aria-hidden="true" size={19} weight="regular" />
                </a>
              </div>
            </div>
            <div className="hero-visual">
              <PortraitStage />
            </div>
          </div>
        </section>

        <section className="about-section section-shell" id="about" aria-labelledby="about-title">
          <div className="page-frame about-layout">
            <Reveal className="about-statement">
              <h2 id="about-title">Front-end craft with business clarity.</h2>
              <div className="about-copy">
                <p>
                  I turn ideas into responsive, accessible interfaces with Next.js, React, TypeScript, and Tailwind CSS.
                </p>
                <p>
                  The goal is a site that looks professional, feels intuitive, and guides people with confidence.
                </p>
              </div>
            </Reveal>
            <Reveal className="toolkit-rail" delay={0.08}>
              <span>Next.js</span>
              <span>React</span>
              <span>TypeScript</span>
              <span>Tailwind CSS</span>
            </Reveal>
          </div>
        </section>

        <section className="services-section section-shell" id="services" aria-labelledby="services-title">
          <div className="page-frame services-layout">
            <Reveal className="services-visual-column">
              <div className="clarity-visual" aria-hidden="true">
                <span className="clarity-plane" />
                <span className="tangle-line line-one" />
                <span className="tangle-line line-two" />
                <span className="tangle-line line-three" />
                <span className="clarity-route" />
                <span className="clarity-node" />
              </div>
            </Reveal>
            <div className="services-content">
              <Reveal>
                <h2 id="services-title">Your website should make the next step feel obvious.</h2>
                <p className="section-lead">
                  I focus on the parts that shape trust: the message, mobile experience, speed, and path to contact.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <ServiceLedger services={services} />
              </Reveal>
            </div>
          </div>
        </section>

        <section className="work-section section-shell" id="work" aria-labelledby="work-title">
          <div className="page-frame">
            <Reveal className="section-intro work-intro">
              <h2 id="work-title">Selected work, built with intention.</h2>
              <p className="section-lead">
                Three concept projects show how I approach clarity, interaction, and responsive front-end craft. Each is labeled honestly.
              </p>
            </Reveal>
            <div className="project-gallery">
              <Reveal className="featured-project-wrap">
                <TiltCard className="project-entry project-featured">
                  <ProjectBody project={featuredProject} />
                </TiltCard>
              </Reveal>
              <div className="supporting-projects">
                {supportingProjects.map((project, index) => (
                  <Reveal key={project.id} delay={0.08 * (index + 1)}>
                    <article className="project-entry project-supporting">
                      <ProjectBody project={project} />
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="process-section section-shell" id="process" aria-labelledby="process-title">
          <div className="page-frame">
            <Reveal className="section-intro process-intro">
              <h2 id="process-title">Thoughtful design. Clean development. No mystery.</h2>
              <p className="section-lead">
                A clear sequence turns an early idea into a responsive experience that is ready to inspect.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <ProcessTimeline steps={processSteps} />
            </Reveal>
          </div>
        </section>

        <section className="contact-section section-shell" id="contact" aria-labelledby="contact-title">
          <div className="page-frame">
            <Reveal className="section-intro contact-intro">
              <h2 id="contact-title">Need a website that feels as professional as your work?</h2>
              <p className="section-lead">
                Share your goal, audience, and timeline. A clear project brief makes the next step easier.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <ContactForm
                deliveryConfigured={deliveryConfigured}
                contactEmail={contactEmail}
              />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-frame footer-layout">
          <p><strong>Ali Mahmood.</strong> Thoughtful websites, built for clarity.</p>
          {profileLinks.length > 0 && (
            <div className="footer-links" aria-label="Contact links">
              {profileLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  {...(link.href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
          <div className="footer-closing">
            <span>© {year} Ali Mahmood</span>
            <a href="#home" aria-label="Back to top">
              Back to top
              <ArrowUp aria-hidden="true" size={17} weight="regular" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
