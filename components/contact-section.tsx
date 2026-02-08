"use client";

import { useState, type FormEvent } from "react";
import { AnimatedSection } from "./animated-section";
import { Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteContent } from "@/lib/site-content-context";

export function ContactSection() {
  const { content } = useSiteContent();
  const contact = content?.contact;
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value?.trim() ?? "";
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value?.trim() ?? "";
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value?.trim() ?? "";
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "ارسال نشد. دوباره تلاش کنید.");
        return;
      }
      setSubmitted(true);
      form.reset();
      setTimeout(() => setSubmitted(false), 4000);
    } catch {
      setError("ارسال نشد. دوباره تلاش کنید.");
    }
  }

  if (!contact) return null;

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-6">
        <AnimatedSection animation="fade-up" className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-10 bg-primary" />
            <span className="text-sm font-semibold text-primary">
              {contact.tagline}
            </span>
            <span className="h-px w-10 bg-primary" />
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-foreground text-balance">
            {contact.heading}
          </h2>
          <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-lg mx-auto">
            {contact.subtext}
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={200}>
          <form
            onSubmit={handleSubmit}
            className="bg-secondary rounded-xl p-6 md:p-10 space-y-5"
          >
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {contact.form_label_name}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                placeholder={contact.form_placeholder_name}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {contact.form_label_email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                dir="ltr"
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-left"
                placeholder={contact.form_placeholder_email}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {contact.form_label_message}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 resize-none"
                placeholder={contact.form_placeholder_message}
              />
            </div>

            <button
              type="submit"
              className={cn(
                "w-full flex items-center justify-center gap-2 py-3.5 rounded-lg font-semibold text-sm transition-all duration-500",
                submitted
                  ? "bg-green-500 text-background"
                  : "bg-primary text-primary-foreground hover:brightness-110"
              )}
            >
              {submitted ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  {contact.submitted_text}
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  {contact.submit_text}
                </>
              )}
            </button>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
}
