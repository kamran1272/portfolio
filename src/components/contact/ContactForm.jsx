import { useState } from "react";
import emailjs from "@emailjs/browser";
import { siteConfig } from "../../data/siteData";

// Credentials resolve from build-time env vars first, then fall back to the
// project's own EmailJS configuration so the form keeps working on static
// hosts (e.g. GitHub Pages) where env vars are not injected at build time.
const SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_uvqydzq";
const TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_gzhfrul";
const PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "PZspQQvmIpVme-Uwb";

const inputClass =
  "w-full border-0 border-b border-slate-700 bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors duration-200 placeholder:text-slate-500 focus:border-primary";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const sendEmail = async (event) => {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, event.target, {
        publicKey: PUBLIC_KEY,
      });
      setStatus({
        type: "success",
        message:
          "Message sent successfully. I usually reply within 24 hours.",
      });
      event.target.reset();
    } catch {
      setStatus({
        type: "error",
        message: `Message could not be sent right now. Please try again or email me directly at ${siteConfig.email}.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={sendEmail} className="flex flex-col gap-7">
        <label className="text-sm text-slate-300">
          Your Name
          <input
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={80}
            placeholder="Jane Smith"
            className={inputClass}
            autoComplete="name"
          />
        </label>
        <label className="text-sm text-slate-300">
          Your Email
          <input
            name="email"
            type="email"
            required
            maxLength={120}
            placeholder="jane@example.com"
            className={inputClass}
            autoComplete="email"
          />
        </label>
        <label className="text-sm text-slate-300">
          Your Message
          <textarea
            name="message"
            rows="5"
            required
            minLength={10}
            maxLength={2000}
            placeholder="Tell me about your project, goals, and timeline…"
            className={`${inputClass} resize-y`}
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-fit items-center gap-3 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-[#07111F] transition-all duration-200 hover:bg-primary/85 hover:shadow-lg hover:shadow-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <span
                className="h-4 w-4 animate-spin rounded-full border-2 border-[#07111F]/30 border-t-[#07111F]"
                aria-hidden="true"
              />
              Sending…
            </>
          ) : (
            <>
              Send Message
              <span aria-hidden="true">-&gt;</span>
            </>
          )}
        </button>
      </form>
      {status.message && (
        <p
          role="status"
          aria-live="polite"
          className={`mt-5 rounded-md border px-4 py-3 text-sm leading-6 ${
            status.type === "success"
              ? "border-primary/40 bg-primary/10 text-primary"
              : "border-red-400/40 bg-red-400/10 text-red-300"
          }`}
        >
          {status.message}
        </p>
      )}
    </div>
  );
};

export default ContactForm;
