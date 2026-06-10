export type FieldErrors = Partial<Record<string, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string) {
  return EMAIL_REGEX.test(email.trim());
}

function required(value: string, label: string) {
  if (!value.trim()) {
    return `Please enter your ${label}.`;
  }
  return null;
}

export interface LeadsFormValues {
  firstName: string;
  lastName: string;
  jobTitle: string;
  company: string;
  email: string;
}

export function validateLeadsForm(values: LeadsFormValues): FieldErrors {
  const errors: FieldErrors = {};

  const firstNameError = required(values.firstName, "first name");
  if (firstNameError) errors.firstName = firstNameError;

  const lastNameError = required(values.lastName, "last name");
  if (lastNameError) errors.lastName = lastNameError;

  const jobTitleError = required(values.jobTitle, "job title");
  if (jobTitleError) errors.jobTitle = jobTitleError;

  const companyError = required(values.company, "company name");
  if (companyError) errors.company = companyError;

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!isValidEmail(values.email)) {
    errors.email =
      "Please enter a valid email address (e.g. name@company.com).";
  }

  return errors;
}

export interface RegistrationFormValues {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  industry: string;
}

export function validateRegistrationForm(
  values: RegistrationFormValues,
  mode: "fleet" | "corporate",
): FieldErrors {
  const errors: FieldErrors = {};

  const firstNameError = required(values.firstName, "first name");
  if (firstNameError) errors.firstName = firstNameError;

  const lastNameError = required(values.lastName, "last name");
  if (lastNameError) errors.lastName = lastNameError;

  if (!values.email.trim()) {
    errors.email = "Please enter your work email address.";
  } else if (!isValidEmail(values.email)) {
    errors.email =
      "Please enter a valid work email address (e.g. name@company.com).";
  }

  const companyLabel =
    mode === "corporate" ? "company name" : "rental company name";
  const companyError = required(values.company, companyLabel);
  if (companyError) errors.company = companyError;

  if (mode === "corporate" && !values.industry.trim()) {
    errors.industry = "Please select your industry.";
  }

  if (mode === "fleet" && !values.industry.trim()) {
    errors.industry = "Please enter your rental location.";
  }

  return errors;
}

export function getValidationErrorsFromPayload(
  payload: Record<string, unknown>,
): FieldErrors {
  const errors: FieldErrors = {};
  const registrationType = payload.registrationType;

  if (typeof payload.firstName !== "string" || !payload.firstName.trim()) {
    errors.firstName = "Please enter your first name.";
  }

  if (typeof payload.lastName !== "string" || !payload.lastName.trim()) {
    errors.lastName = "Please enter your last name.";
  }

  if (typeof payload.email !== "string" || !payload.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!isValidEmail(payload.email)) {
    errors.email =
      "Please enter a valid email address (e.g. name@company.com).";
  }

  if (typeof payload.company !== "string" || !payload.company.trim()) {
    errors.company = "Please enter your company name.";
  }

  if (registrationType === "lead") {
    if (typeof payload.jobTitle !== "string" || !payload.jobTitle.trim()) {
      errors.jobTitle = "Please enter your job title.";
    }
  }

  if (registrationType === "corporate") {
    if (typeof payload.industry !== "string" || !payload.industry.trim()) {
      errors.industry = "Please select your industry.";
    }
  }

  if (registrationType === "fleet") {
    if (typeof payload.industry !== "string" || !payload.industry.trim()) {
      errors.industry = "Please enter your rental location.";
    }
  }

  return errors;
}

function parseHubSpotPropertyError(raw: string) {
  const jsonMatch = raw.match(/\[\s*(\{[\s\S]*?\})\s*\]/);
  if (!jsonMatch) return null;

  try {
    const parsed = JSON.parse(jsonMatch[1]) as {
      name?: string;
      localizedErrorMessage?: string;
      message?: string;
    };

    if (parsed.name === "email") {
      return "That email address isn't valid. Please check it and try again.";
    }

    if (parsed.name === "phone") {
      return "That phone number couldn't be accepted. Please check it and try again.";
    }

    return (
      parsed.localizedErrorMessage ||
      parsed.message ||
      "Some of the details you entered couldn't be accepted. Please review them and try again."
    );
  } catch {
    return null;
  }
}

export function getFriendlySubmitError(
  status: number,
  body: { error?: string; fieldErrors?: FieldErrors } = {},
) {
  if (body.fieldErrors && Object.keys(body.fieldErrors).length > 0) {
    return {
      message: "Please fix the highlighted fields below and try again.",
      fieldErrors: body.fieldErrors,
    };
  }

  const raw = body.error || "";
  const lower = raw.toLowerCase();

  if (status === 429) {
    return {
      message:
        "You've submitted too many requests. Please wait a minute and try again.",
    };
  }

  if (status === 400 && lower.includes("invalid email")) {
    return {
      message:
        "That email address doesn't look valid. Please check it and try again.",
      fieldErrors: {
        email:
          "Please enter a valid email address (e.g. name@company.com).",
      },
    };
  }

  if (
    lower.includes("already exists") ||
    lower.includes("contact already exists") ||
    lower.includes("conflict")
  ) {
    return {
      message:
        "We already have a record with this email address. Please use a different email or contact our team for help.",
      fieldErrors: {
        email:
          "This email is already registered with us. Try another email address.",
      },
    };
  }

  const propertyError = parseHubSpotPropertyError(raw);
  if (propertyError) {
    return { message: propertyError };
  }

  if (
    lower.includes("configuration missing") ||
    lower.includes("missing hubspot")
  ) {
    return {
      message:
        "We're unable to process your request right now. Please try again later or contact support.",
    };
  }

  if (status >= 500) {
    return {
      message:
        "Something went wrong while sending your details. Please try again in a moment.",
    };
  }

  if (raw && !raw.startsWith("HTTP ") && !raw.includes("Property values were not valid")) {
    return { message: raw };
  }

  return {
    message:
      "We couldn't submit your details. Please check your information and try again.",
  };
}

export async function parseSubmitErrorResponse(response: Response) {
  let body: { error?: string; fieldErrors?: FieldErrors } = {};

  try {
    body = await response.json();
  } catch {
    body = {};
  }

  return getFriendlySubmitError(response.status, body);
}

export function scrollToFirstFieldError(errors: FieldErrors) {
  const firstField = Object.keys(errors)[0];
  if (!firstField) return;

  const element =
    document.getElementById(firstField) ||
    document.querySelector(`[name="${firstField}"]`);

  if (element instanceof HTMLElement) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
    element.focus();
  }
}
