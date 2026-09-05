"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { useState } from "react";

import {
  contactLimits,
  createContactGmailHref,
  createContactMailtoHref,
  normalizeContactValues,
  projectTypes,
  validateContactValues,
  type ContactErrors,
  type ContactFieldName,
  type ContactFormValues,
} from "@/lib/contact";
import { LottieVisual } from "./lottie-visual";

type FormStatus =
  | "idle"
  | "invalid"
  | "draft-opened";

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  message: "",
};

interface ContactFormProps {
  contactEmail: string;
}

export function ContactForm({ contactEmail }: ContactFormProps) {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [playToken, setPlayToken] = useState(0);

  function updateField(field: ContactFieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
    if (status !== "idle") setStatus("idle");
  }

  function validateField(field: ContactFieldName) {
    const nextErrors = validateContactValues(normalizeContactValues(values));
    setErrors((current) => ({ ...current, [field]: nextErrors[field] }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedValues = normalizeContactValues(values);
    const nextErrors = validateContactValues(normalizedValues);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("invalid");
      const firstInvalid = Object.keys(nextErrors)[0] as ContactFieldName;
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const draftLink = document.createElement("a");
    draftLink.href = isDesktop
      ? createContactGmailHref(contactEmail, normalizedValues)
      : createContactMailtoHref(contactEmail, normalizedValues);
    draftLink.hidden = true;

    if (isDesktop) {
      draftLink.target = "_blank";
      draftLink.rel = "noopener noreferrer";
    }

    document.body.append(draftLink);

    setValues(normalizedValues);
    setStatus("draft-opened");
    setPlayToken((token) => token + 1);
    draftLink.click();
    draftLink.remove();
  }

  const fieldProps = (field: ContactFieldName) => ({
    id: field,
    name: field,
    value: values[field],
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
    onBlur: () => validateField(field),
  });

  const submitLabel =
    status === "draft-opened"
      ? "Open email draft again"
      : "Send project details";

  return (
    <form
      className="contact-form glass-surface"
      action={`mailto:${contactEmail}?subject=New%20website%20project%20enquiry`}
      method="post"
      encType="text/plain"
      onSubmit={handleSubmit}
      noValidate
    >
      <p className="delivery-disclosure">
        Complete the form, then this button will open a ready-to-send email in your email app.
      </p>
      <div className="contact-fields-grid">
        <div className="field-group">
          <label htmlFor="name">Name</label>
          <input
            {...fieldProps("name")}
            type="text"
            required
            autoComplete="name"
            maxLength={contactLimits.name}
            placeholder="Your full name"
            onChange={(event) => updateField("name", event.target.value)}
          />
          {errors.name && <p id="name-error" className="field-error">{errors.name}</p>}
        </div>

        <div className="field-group">
          <label htmlFor="email">Email</label>
          <input
            {...fieldProps("email")}
            type="email"
            required
            autoComplete="email"
            maxLength={contactLimits.email}
            placeholder="name@example.com"
            onChange={(event) => updateField("email", event.target.value)}
          />
          {errors.email && <p id="email-error" className="field-error">{errors.email}</p>}
        </div>

        <div className="field-group">
          <label htmlFor="company">Company <span>(optional)</span></label>
          <input
            {...fieldProps("company")}
            type="text"
            autoComplete="organization"
            maxLength={contactLimits.company}
            placeholder="Your company name"
            onChange={(event) => updateField("company", event.target.value)}
          />
          {errors.company && <p id="company-error" className="field-error">{errors.company}</p>}
        </div>

        <div className="field-group field-span-two">
          <label htmlFor="projectType">Project type</label>
          <select
            {...fieldProps("projectType")}
            required
            onChange={(event) => updateField("projectType", event.target.value)}
          >
            <option value="">Choose a project type</option>
            {projectTypes.map((projectType) => (
              <option key={projectType} value={projectType}>{projectType}</option>
            ))}
          </select>
          {errors.projectType && <p id="projectType-error" className="field-error">{errors.projectType}</p>}
        </div>

        <div className="field-group field-span-full">
          <div className="field-label-row">
            <label htmlFor="message">Message</label>
            <span>{values.message.length}/{contactLimits.message}</span>
          </div>
          <textarea
            {...fieldProps("message")}
            required
            rows={5}
            maxLength={contactLimits.message}
            placeholder="Your goal, audience, and timeline"
            onChange={(event) => updateField("message", event.target.value)}
          />
          {errors.message && <p id="message-error" className="field-error">{errors.message}</p>}
        </div>
      </div>

      <div className="contact-form-footer">
        <button className="primary-button" type="submit">
          {submitLabel}
          <ArrowUpRight aria-hidden="true" size={19} weight="regular" />
        </button>
        <div className="contact-status" aria-live="polite">
          {status === "invalid" && <p className="status-error">Review the highlighted fields and try again.</p>}
          {status === "draft-opened" && (
            <p className="status-success">
              Email draft opened. Review the details, then press Send in your email app.
            </p>
          )}
          {status === "idle" && (
            <p>Your details stay here until you choose Send in your email app.</p>
          )}
          <p className="direct-email">
            Prefer email? <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </p>
        </div>
        <div className="contact-lottie-slot" data-active={status === "draft-opened"}>
          {status === "draft-opened" && (
            <LottieVisual
              src="/lottie/contact-success.lottie"
              posterSrc="/lottie/contact-poster.svg"
              label="Email draft ready to send"
              playToken={playToken}
              className="contact-lottie"
            />
          )}
        </div>
      </div>
    </form>
  );
}
