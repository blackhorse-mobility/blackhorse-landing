"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Manrope } from "next/font/google";
import Image from "next/image";
import { ChevronsUpDown } from "lucide-react";
import { useHubSpotTracking } from "@/hooks/useHubSpotTracking";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
});

export type DrawerMode = "fleet" | "corporate";

interface RegistrationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: DrawerMode;
}

export default function RegistrationDrawer({
  isOpen,
  onClose,
  initialMode,
}: RegistrationDrawerProps) {
  const [internalMode, setInternalMode] = useState<DrawerMode>(initialMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
  });
  const { onClickButton, onFormInteraction, onSignup, onCustomEvent } =
    useHubSpotTracking();

  useEffect(() => {
    if (isOpen) {
      setInternalMode(initialMode);
      onFormInteraction("registration", "focus", {
        mode: initialMode,
      });
    }
  }, [isOpen, initialMode, onFormInteraction]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isCorporate = internalMode === "corporate";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
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

  const handleModeChange = (newMode: DrawerMode) => {
    onCustomEvent("registration_mode_changed", {
      from_mode: internalMode,
      to_mode: newMode,
    });
    setInternalMode(newMode);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError(null);
    setIsSubmitting(true);

    try {
      onFormInteraction("registration", "submit", {
        mode: internalMode,
        fields_filled: Object.values(formData).filter((v) => v).length,
      });

      // Submit to HubSpot CRM via API route
      const response = await fetch("/api/hubspot/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          industry: formData.industry,
          registrationType: internalMode,
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

      // Track successful signup
      if (formData.email) {
        onSignup(formData.email, "registration", {
          registration_type: internalMode,
          company: formData.company,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          hubspot_contact_id: result.contactId,
        });
      }

      // Show success state
      setSubmitSuccess(true);

      // Reset is handled by the user clicking "Back to Home"
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setSubmitError(errorMessage);

      onFormInteraction("registration", "error", {
        error_message: errorMessage,
        mode: internalMode,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center font-display">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {submitSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center p-6 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 200,
                  delay: 0.1,
                }}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-green-50 flex items-center justify-center mb-8"
              >
                <svg
                  className="w-12 h-12 sm:w-16 sm:h-16 text-green-500"
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
                className="text-[18px] sm:text-[22px] md:text-[24px] text-gray-800 font-medium max-w-xl mb-12 leading-relaxed flex flex-wrap items-center justify-center gap-x-2 gap-y-1"
              >
                <span>a member of the Blackhorse team</span>
                <span className="inline-flex items-center justify-center translate-y-[2px]">
                  <Image
                    src="/assets/Primary/BH_Horizontal_DarkBlue.png"
                    alt="Blackhorse Logo"
                    width={100}
                    height={20}
                    className="h-[1.2em] w-auto object-contain"
                  />
                </span>
                <span>will be with you shortly</span>
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => {
                  setSubmitSuccess(false);
                  onClose();
                  setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    company: "",
                    industry: "",
                  });
                }}
                className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-black rounded-full font-semibold transition-colors flex items-center gap-2"
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Home
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ y: "100%", opacity: 1 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 1 }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="relative w-full h-max max-h-[90vh] lg:max-h-[90vh] bg-white rounded-t-[20px] overflow-hidden flex flex-col sm:flex-row shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-10"
            >
              <div className="hidden sm:block relative w-[40%] xl:w-[35%] bg-[#0A1020] overflow-hidden">
                <Image
                  src={isCorporate ? "/assets/bg-3.jpg" : "/assets/bg-3.jpg"}
                  fill
                  alt={
                    isCorporate
                      ? "Corporate registration"
                      : "Partner registration"
                  }
                  className="object-cover opacity-80 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-black/20 transition-colors duration-300" />

                <div className="absolute top-8 left-8 xl:top-12 xl:left-12 flex items-center text-white">
                  <Image
                    src="/assets/Primary/BH_Horizontal_White.png"
                    alt="Blackhorse Logo"
                    width={150}
                    height={32}
                    className="h-8 w-auto object-contain drop-shadow-md"
                  />
                </div>
              </div>

              <div className="flex-1 w-full flex flex-col items-center p-6 sm:p-10 md:p-12 overflow-y-auto cyan-scrollbar">
                <div className="w-full max-w-2xl relative">
                  <div className="flex justify-end sm:hidden mb-2">
                    <button
                      onClick={onClose}
                      className="p-2 rounded-full bg-gray-100 text-gray-500"
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center rounded-[24px] bg-gray-50 border border-gray-100 p-1 mb-10 w-fit self-start shadow-sm max-w-full overflow-x-auto no-scrollbar">
                    <button
                      onClick={() => handleModeChange("fleet")}
                      className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-[20px] text-[11px] sm:text-[13px] font-medium transition-all whitespace-nowrap ${
                        !isCorporate
                          ? "bg-[#0A1020] text-white shadow-md"
                          : "text-gray-500 hover:text-black"
                      }`}
                    >
                      <span className="relative z-10">Fleet Owners</span>
                      <span className="relative z-10 hidden sm:inline">
                        &nbsp;& Rental
                      </span>
                    </button>
                    <button
                      onClick={() => handleModeChange("corporate")}
                      className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-[20px] text-[11px] sm:text-[13px] font-medium transition-all whitespace-nowrap ${
                        isCorporate
                          ? "bg-[#0A1020] text-white shadow-md"
                          : "text-gray-500 hover:text-black"
                      }`}
                    >
                      <span className="relative z-10">Corporate</span>
                      <span className="relative z-10 hidden sm:inline">
                        &nbsp;Businesses
                      </span>
                    </button>
                  </div>

                  <h2 className="text-[32px] sm:text-[40px] font-medium tracking-tight text-black mb-3">
                    {isCorporate
                      ? "Register as a corporate client"
                      : "Register as a fleet partner"}
                  </h2>
                  <p
                    className={`text-[#878787] text-[16px] mb-10 leading-relaxed ${manrope.className}`}
                  >
                    Enter the details below to register as a{" "}
                    {isCorporate ? "corporate client" : "fleet partner"}
                  </p>

                  <form
                    className="flex flex-col gap-6 w-full"
                    onSubmit={handleSubmit}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label
                          className={`text-[14.5px] text-gray-900 font-medium ${manrope.className}`}
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          onFocus={() =>
                            onFormInteraction("registration", "focus", {
                              field: "firstName",
                            })
                          }
                          placeholder="John"
                          className={`w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors text-[15px] text-black placeholder-gray-400 ${manrope.className}`}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          className={`text-[14.5px] text-gray-900 font-medium ${manrope.className}`}
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          onFocus={() =>
                            onFormInteraction("registration", "focus", {
                              field: "lastName",
                            })
                          }
                          placeholder="Doe"
                          className={`w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors text-[15px] text-black placeholder-gray-400 ${manrope.className}`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label
                          className={`text-[14.5px] text-gray-900 font-medium ${manrope.className}`}
                        >
                          Work E-mail
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onBlur={handleEmailBlur}
                          onFocus={() =>
                            onFormInteraction("registration", "focus", {
                              field: "email",
                            })
                          }
                          placeholder="johndoe@acme.inc"
                          required
                          aria-invalid={Boolean(emailError)}
                          aria-describedby={
                            emailError ? "registration-email-error" : undefined
                          }
                          className={`w-full px-4 py-3.5 rounded-xl border transition-colors text-[15px] text-black placeholder-gray-400 focus:outline-none focus:ring-1 ${emailError ? "border-red-400 focus:border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-gray-400 focus:ring-gray-400"} ${manrope.className}`}
                        />
                        {emailError && (
                          <p
                            id="registration-email-error"
                            className={`text-[13px] text-red-600 ${manrope.className}`}
                          >
                            {emailError}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          className={`text-[14.5px] text-gray-900 font-medium ${manrope.className}`}
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          onFocus={() =>
                            onFormInteraction("registration", "focus", {
                              field: "phone",
                            })
                          }
                          placeholder="02498761234"
                          className={`w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors text-[15px] text-black placeholder-gray-400 ${manrope.className}`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2 sm:col-span-2">
                        <label
                          className={`text-[14.5px] text-gray-900 font-medium ${manrope.className}`}
                        >
                          {isCorporate ? "Company Name" : "Rental Company Name"}
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          onFocus={() =>
                            onFormInteraction("registration", "focus", {
                              field: "company",
                            })
                          }
                          placeholder="Acme Inc."
                          className={`w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors text-[15px] text-black  placeholder-gray-400 ${manrope.className}`}
                        />
                      </div>
                      <div className="flex flex-col gap-2 sm:col-span-2">
                        <label
                          className={`text-[14.5px] text-gray-900 font-medium ${manrope.className}`}
                        >
                          {isCorporate ? "Industry" : "Rental Location"}
                        </label>
                        {isCorporate ? (
                          <div className="relative">
                            <select
                              name="industry"
                              value={formData.industry}
                              onChange={handleInputChange}
                              onFocus={() =>
                                onFormInteraction("registration", "focus", {
                                  field: "industry",
                                })
                              }
                              defaultValue=""
                              className={`w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors text-[15px] appearance-none bg-white cursor-pointer ${manrope.className} text-gray-800`}
                            >
                              <option
                                value=""
                                disabled
                                className="text-gray-400"
                              >
                                Select one industry
                              </option>
                              <option value="tech">Technology</option>
                              <option value="finance">Finance</option>
                              <option value="health">Healthcare</option>
                              <option value="logistics">Logistics</option>
                              <option value="hospitality">Hospitality</option>
                              <option value="other">Other</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                              <ChevronsUpDown className="w-[18px] h-[18px]" />
                            </div>
                          </div>
                        ) : (
                          <input
                            type="text"
                            name="industry"
                            value={formData.industry}
                            onChange={handleInputChange}
                            onFocus={() =>
                              onFormInteraction("registration", "focus", {
                                field: "location",
                              })
                            }
                            placeholder="City, region, etc."
                            className={`w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors text-[15px] text-black  placeholder-gray-400 ${manrope.className}`}
                          />
                        )}
                      </div>
                    </div>

                    <div className="mt-6 mb-8 space-y-3">
                      {/* Error Message */}
                      {submitError && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 rounded-lg bg-red-50 border border-red-200"
                        >
                          <p className="text-[13px] text-red-700 font-medium">
                            {submitError}
                          </p>
                        </motion.div>
                      )}

                      {/* Success Message */}
                      {submitSuccess && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 rounded-lg bg-green-50 border border-green-200"
                        >
                          <p className="text-[13px] text-green-700 font-medium">
                            Registration successful! Redirecting...
                          </p>
                        </motion.div>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting || submitSuccess}
                        onClick={() =>
                          onClickButton(
                            `registration_submit_${internalMode}`,
                            "registration-drawer",
                          )
                        }
                        className={`w-full px-8 py-[18px] rounded-xl font-medium text-[16px] transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)] ${
                          isSubmitting || submitSuccess
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#0A1020] text-white hover:bg-black active:scale-[0.98]"
                        }`}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="w-4 h-4 rounded-full border-2 border-gray-300 border-t-white animate-spin" />
                            Submitting...
                          </span>
                        ) : submitSuccess ? (
                          "✓ Registered"
                        ) : isCorporate ? (
                          "Create account"
                        ) : (
                          "Register"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <button
                onClick={onClose}
                className="hidden sm:flex absolute top-6 right-6 p-2 rounded-full bg-gray-50 border border-gray-100 hover:bg-gray-100 text-gray-600 transition-colors z-20 shadow-sm"
                aria-label="Close form"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
