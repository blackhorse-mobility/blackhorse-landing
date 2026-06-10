"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Manrope } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import PhoneInput from "@/components/PhoneInput";
import { useHubSpotTracking } from "@/hooks/useHubSpotTracking";
import {
  DEFAULT_COUNTRY_ISO,
  formatPhoneNumber,
} from "@/lib/country-codes";
import {
  type FieldErrors,
  applySubmitError,
  parseSubmitErrorResponse,
  scrollToFirstFieldError,
  validateLeadsForm,
} from "@/lib/form-errors";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
});

interface LeadsFormData {
  firstName: string;
  lastName: string;
  jobTitle: string;
  company: string;
  email: string;
  phone: string;
}

const inputClass = (hasError = false) =>
  `w-full px-4 py-3.5 rounded-xl border transition-colors text-[14px] text-black placeholder-gray-400 focus:outline-none focus:ring-1 ${hasError ? "border-red-400 focus:border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-gray-400 focus:ring-gray-400"} ${manrope.className}`;

const labelClass = `text-[13px] text-gray-600 font-medium mb-1.5 ${manrope.className}`;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p className={`text-[12px] text-red-600 mt-1.5 ${manrope.className}`}>
      {message}
    </p>
  );
}

function LeadsFormShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden font-display flex bg-white">
      {/* Background Image - Left Side on Desktop */}
      <div className="hidden lg:block relative w-[45%] xl:w-[50%] min-h-screen">
        <Image
          src="/assets/bg-3.jpg"
          fill
          alt=""
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Form Area - Right Side on Desktop */}
      <div className="relative z-10 flex-1 flex flex-col min-h-screen bg-white">
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto cyan-scrollbar">
          <div className="w-full max-w-[480px] flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function LeadsSuccessView() {
  return (
    <LeadsFormShell>
      <div className="flex flex-col items-center justify-center text-center py-10">
        <Link href="/" className="mb-12">
          <Image
            src="/assets/Icon-dp/BH_icon_Main.png"
            alt="Blackhorse Logo"
            width={48}
            height={48}
            className="w-12 h-12 object-contain"
          />
        </Link>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 200,
            delay: 0.1,
          }}
          className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-6"
        >
          <svg
            className="w-10 h-10 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[19px] text-gray-800 font-medium max-w-sm mb-8 leading-relaxed"
        >
          A member of the Blackhorse team will be with you shortly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/"
            className="px-8 py-3.5 bg-[#0A1020] hover:bg-black text-white rounded-xl text-[15px] font-medium transition-colors inline-flex items-center gap-2"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </LeadsFormShell>
  );
}

export default function LeadsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [countryIso, setCountryIso] = useState(DEFAULT_COUNTRY_ISO);
  const [formData, setFormData] = useState<LeadsFormData>({
    firstName: "",
    lastName: "",
    jobTitle: "",
    company: "",
    email: "",
    phone: "",
  });
  const { onClickButton, onFormInteraction, onSignup } = useHubSpotTracking();

  const clearFieldError = (field: string) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearFieldError(name);
    setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const validationErrors = validateLeadsForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setSubmitError("Please fix the highlighted fields below and try again.");
      scrollToFirstFieldError(validationErrors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const formattedPhone = formatPhoneNumber(countryIso, formData.phone);

      onFormInteraction("leads", "submit", {
        fields_filled:
          Object.values(formData).filter((v) => v).length +
          (formattedPhone ? 1 : 0),
      });

      const response = await fetch("/api/hubspot/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          jobTitle: formData.jobTitle,
          email: formData.email,
          phone: formattedPhone,
          company: formData.company,
          registrationType: "lead",
        }),
      });

      if (!response.ok) {
        const friendlyError = await parseSubmitErrorResponse(response);
        applySubmitError(friendlyError, setFieldErrors, setSubmitError);
        onFormInteraction("leads", "error", {
          error_message: friendlyError.message,
        });
        return;
      }

      let result;
      try {
        result = await response.json();
      } catch {
        throw new Error("Invalid response from server. Please try again.");
      }

      if (formData.email) {
        onSignup(formData.email, "registration", {
          registration_type: "lead",
          company: formData.company,
          job_title: formData.jobTitle,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formattedPhone,
          hubspot_contact_id: result.contactId,
        });
      }

      setSubmitSuccess(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "We couldn't submit your details. Please check your connection and try again.";
      setSubmitError(errorMessage);
      onFormInteraction("leads", "error", {
        error_message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return <LeadsSuccessView />;
  }

  return (
    <LeadsFormShell>
      {/* Header Utilities */}
      <div className="flex items-center justify-between w-full mb-8">
        <Link
          href="/"
          className={`text-[13px] text-gray-500 hover:text-black transition-colors ${manrope.className}`}
        >
          &larr; Back to home
        </Link>
        <div className={`flex items-center gap-4 text-[13px] text-gray-500 ${manrope.className}`}>
          <Link href="/terms" className="hover:text-black transition-colors">
            Terms of Service
          </Link>
          <Link href="/privacy" className="hover:text-black transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center mb-10 text-center">
        <Image
          src="/assets/Icon-dp/BH_icon_Main.png"
          alt="Blackhorse Logo"
          width={48}
          height={48}
          className="w-12 h-12 object-contain mb-6"
        />
        <h1 className="text-[28px] sm:text-[32px] font-semibold tracking-tight text-[#0A1020] mb-3">
          Get in touch
        </h1>
        <p
          className={`text-[#666666] text-[15px] leading-relaxed max-w-[360px] ${manrope.className}`}
        >
          Share your details and a member of our team will reach out shortly.
        </p>
      </div>

      <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="firstName" className={labelClass}>
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              onFocus={() =>
                onFormInteraction("leads", "focus", { field: "firstName" })
              }
              placeholder="John"
              aria-invalid={Boolean(fieldErrors.firstName)}
              className={inputClass(Boolean(fieldErrors.firstName))}
            />
            <FieldError message={fieldErrors.firstName} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName" className={labelClass}>
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              onFocus={() =>
                onFormInteraction("leads", "focus", { field: "lastName" })
              }
              placeholder="Doe"
              aria-invalid={Boolean(fieldErrors.lastName)}
              className={inputClass(Boolean(fieldErrors.lastName))}
            />
            <FieldError message={fieldErrors.lastName} />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="jobTitle" className={labelClass}>
            Job Title
          </label>
          <input
            id="jobTitle"
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            onFocus={() =>
              onFormInteraction("leads", "focus", { field: "jobTitle" })
            }
            placeholder="Operations Manager"
            aria-invalid={Boolean(fieldErrors.jobTitle)}
            className={inputClass(Boolean(fieldErrors.jobTitle))}
          />
          <FieldError message={fieldErrors.jobTitle} />
        </div>

        <div className="flex flex-col">
          <label htmlFor="company" className={labelClass}>
            Company Name
          </label>
          <input
            id="company"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            onFocus={() =>
              onFormInteraction("leads", "focus", { field: "company" })
            }
            placeholder="Acme Inc."
            aria-invalid={Boolean(fieldErrors.company)}
            className={inputClass(Boolean(fieldErrors.company))}
          />
          <FieldError message={fieldErrors.company} />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onFocus={() =>
              onFormInteraction("leads", "focus", { field: "email" })
            }
            placeholder="johndoe@acme.inc"
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "leads-email-error" : undefined}
            className={inputClass(Boolean(fieldErrors.email))}
          />
          <FieldError message={fieldErrors.email} />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className={labelClass}>
            Phone Number
          </label>
          <PhoneInput
            id="phone"
            countryIso={countryIso}
            phone={formData.phone}
            onCountryIsoChange={setCountryIso}
            onPhoneChange={(phone) =>
              setFormData((prev) => ({ ...prev, phone }))
            }
            onFocus={() =>
              onFormInteraction("leads", "focus", { field: "phone" })
            }
            inputClassName={inputClass()}
            placeholder="Phone number"
          />
        </div>

        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3.5 rounded-xl bg-red-50 border border-red-200 mt-2"
          >
            <p className="text-[13px] text-red-700 font-medium">
              {submitError}
            </p>
          </motion.div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          onClick={() => onClickButton("leads_submit", "leads-form")}
          className={`w-full px-6 py-4 rounded-xl font-medium text-[15px] transition-all mt-4 ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#0A1020] text-white hover:bg-black active:scale-[0.98] shadow-lg shadow-black/10"
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-5 h-5 rounded-full border-2 border-gray-300 border-t-white animate-spin" />
              Submitting...
            </span>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </LeadsFormShell>
  );
}
