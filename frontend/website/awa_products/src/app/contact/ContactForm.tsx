"use client";

import { useState, type FormEvent } from "react";

/**
 * Contact form with Name, Email, Subject, and Message fields.
 * Currently logs to console — replace the onSubmit handler with
 * your actual API call (e.g., email service, backend endpoint).
 */
export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");

    // ── TODO: Replace with your actual API call ──────────
    // Example:
    //   await fetch("/api/contact", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ name, email, subject, message }),
    //   });
    //
    // Simulate network delay for now
    await new Promise((r) => setTimeout(r, 1200));

    console.log("[Contact Form]", { name, email, subject, message });
    setStatus("sent");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");

    // Reset status after 4 seconds
    setTimeout(() => setStatus("idle"), 4000);
  }

  return (
    <section className="rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <h2 className="text-lg font-semibold text-text">Send Us a Message</h2>
      <p className="mt-1 text-sm text-text-muted">
        Fill out the form below and our team will get back to you within 24
        hours.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        {/* Name + Email row */}
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full Name" required>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
            />
          </Field>

          <Field label="Email Address" required>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@company.com"
              required
              className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
            />
          </Field>
        </div>

        {/* Subject */}
        <Field label="Subject">
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Wholesale pricing inquiry"
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
          />
        </Field>

        {/* Message */}
        <Field label="Message" required>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your requirements — product names, quantities, delivery location…"
            rows={5}
            required
            className="w-full resize-none rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
          />
        </Field>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-text-inverse shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" ? (
              <>
                <SpinnerIcon />
                Sending…
              </>
            ) : (
              "Send Message"
            )}
          </button>

          {status === "sent" && (
            <span className="text-sm font-medium text-success">
              ✓ Message sent successfully! We&apos;ll be in touch soon.
            </span>
          )}
        </div>
      </form>
    </section>
  );
}

/* ── Sub-components ──────────────────────── */

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-text">
        {label}
        {required && <span className="ml-0.5 text-danger">*</span>}
      </span>
      <span className="mt-1.5 block">{children}</span>
    </label>
  );
}

function SpinnerIcon() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
