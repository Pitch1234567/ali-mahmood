export const projectTypes = [
  "Business website",
  "E-commerce store",
  "Landing page",
  "Portfolio website",
  "Website redesign",
  "Ongoing maintenance",
] as const;

export const defaultContactEmail = "aalimahmood2006@gmail.com";

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

export function resolveContactEmail(value: string | undefined) {
  const email = value?.trim();
  return email && emailPattern.test(email) ? email : defaultContactEmail;
}

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

function createContactDraftContent(values: ContactFormValues) {
  const subject = `Project enquiry: ${values.projectType} from ${values.name}`;
  const message = values.message.replace(/\r?\n/g, "\r\n");
  const body = [
    "Hello Ali,",
    "",
    "I would like to discuss the following project:",
    "",
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Company: ${values.company || "Not provided"}`,
    `Project type: ${values.projectType}`,
    "",
    "Project details:",
    message,
    "",
    "Thank you,",
    values.name,
  ].join("\r\n");

  return { body, subject };
}

export function createContactMailtoHref(
  recipient: string,
  values: ContactFormValues,
) {
  const { body, subject } = createContactDraftContent(values);

  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function createContactGmailHref(
  recipient: string,
  values: ContactFormValues,
) {
  const { body, subject } = createContactDraftContent(values);
  const params = new URLSearchParams({
    body,
    fs: "1",
    su: subject,
    to: recipient,
    view: "cm",
  });

  return `https://mail.google.com/mail/?${params.toString()}`;
}

