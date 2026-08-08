export const projectTypes = [
  "Business website",
  "Landing page",
  "Portfolio website",
  "Website redesign",
  "Ongoing maintenance",
] as const;

export type ProjectType = (typeof projectTypes)[number];
export type ContactFieldName = "name" | "email" | "company" | "projectType" | "message";

export interface ContactFormValues {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
}

export type ContactErrors = Partial<Record<ContactFieldName, string>>;

export type ContactApiResponse =
  | { ok: true; message: string }
  | {
      ok: false;
      code:
        | "INVALID_REQUEST"
        | "VALIDATION_ERROR"
        | "RATE_LIMITED"
        | "NOT_CONFIGURED"
        | "DELIVERY_FAILED";
      message: string;
      errors?: ContactErrors;
    };

export const contactLimits = {
  name: 80,
  email: 254,
  company: 120,
  message: 2000,
} as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readString(value: unknown) {
  return typeof value === "string" ? value : "";
}

export function normalizeContactValues(input: unknown): ContactFormValues {
  const value =
    typeof input === "object" && input !== null
      ? (input as Record<string, unknown>)
      : {};

  return {
    name: readString(value.name).replace(/\s+/g, " ").trim(),
    email: readString(value.email).trim(),
    company: readString(value.company).replace(/\s+/g, " ").trim(),
    projectType: readString(value.projectType).trim(),
    message: readString(value.message).replace(/\r\n/g, "\n").trim(),
  };
}

export function validateContactValues(values: ContactFormValues): ContactErrors {
  const errors: ContactErrors = {};

  if (!values.name) errors.name = "Enter your name.";
  else if (values.name.length > contactLimits.name) {
    errors.name = `Keep your name under ${contactLimits.name} characters.`;
  }

  if (!values.email) errors.email = "Enter your email address.";
  else if (values.email.length > contactLimits.email || !emailPattern.test(values.email)) {
    errors.email = "Enter an email address in the format name@example.com.";
  }

  if (values.company.length > contactLimits.company) {
    errors.company = `Keep the company name under ${contactLimits.company} characters.`;
  }

  if (!projectTypes.includes(values.projectType as ProjectType)) {
    errors.projectType = "Choose the closest project type.";
  }

  if (!values.message) errors.message = "Tell me a little about the project.";
  else if (values.message.length > contactLimits.message) {
    errors.message = `Keep the message under ${contactLimits.message.toLocaleString()} characters.`;
  }

  return errors;
}

