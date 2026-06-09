"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Manrope } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useHubSpotTracking } from "@/hooks/useHubSpotTracking";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  const [emailError, setEmailError] = useState<string | null>(null);
  const [formData, setFormData] = useState<LeadsFormData>({
    firstName: "",
    lastName: "",
    jobTitle: "",
    company: "",
    email: "",
    phone: "",
  });
  const { onClickButton, onFormInteraction, onSignup } = useHubSpotTracking();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email" && emailError) {
      setEmailError(null);
    }
  };

  const validateEmail = (email: string) => EMAIL_REGEX.test(email.trim());

  const handleEmailBlur = () => {
    if (!formData.email.trim()) {
      setEmailError("Email address is required.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError(null);
    setIsSubmitting(true);

    try {
      onFormInteraction("leads", "submit", {
        fields_filled: Object.values(formData).filter((v) => v).length,
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
          phone: formData.phone,
          company: formData.company,
          registrationType: "lead",
        }),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = {
            error: `Server error: ${response.status} ${response.statusText}`,
          };
        }
        throw new Error(errorData.error || "Failed to submit form");
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
          phone: formData.phone,
          hubspot_contact_id: result.contactId,
        });
      }

      setSubmitSuccess(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
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
              required
              className={inputClass()}
            />
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
              required
              className={inputClass()}
            />
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
            required
            className={inputClass()}
          />
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
            required
            className={inputClass()}
          />
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
            onBlur={handleEmailBlur}
            onFocus={() =>
              onFormInteraction("leads", "focus", { field: "email" })
            }
            placeholder="johndoe@acme.inc"
            required
            aria-invalid={Boolean(emailError)}
            aria-describedby={emailError ? "leads-email-error" : undefined}
            className={inputClass(Boolean(emailError))}
          />
          {emailError && (
            <p
              id="leads-email-error"
              className={`text-[12px] text-red-600 mt-1.5 ${manrope.className}`}
            >
              {emailError}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className={labelClass}>
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            onFocus={() =>
              onFormInteraction("leads", "focus", { field: "phone" })
            }
            placeholder="02498761234"
            className={inputClass()}
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
