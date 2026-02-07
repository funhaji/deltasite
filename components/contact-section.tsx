"use client";

import { useState, type FormEvent } from "react";
import { AnimatedSection } from "./animated-section";
import { Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-6">
        <AnimatedSection animation="fade-up" className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-10 bg-primary" />
            <span className="text-sm font-semibold text-primary">
              {"ارتباط با ما"}
            </span>
            <span className="h-px w-10 bg-primary" />
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-foreground text-balance">
            {"درخواست وقت"}
          </h2>
          <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-lg mx-auto">
            {
              "جهت ارتباط و یاری در رساندن خدمات بهتر به شما از طریق فرم زیر با ما تماس بگیرید"
            }
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={200}>
          <form
            onSubmit={handleSubmit}
            className="bg-secondary rounded-xl p-6 md:p-10 space-y-5"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {"نام شما *"}
              </label>
              <input
                id="name"
                type="text"
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                placeholder="نام خود را وارد کنید"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {"ایمیل شما *"}
              </label>
              <input
                id="email"
                type="email"
                required
                dir="ltr"
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-left"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-foreground mb-2"
              >
                {"پیام شما"}
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 resize-none"
                placeholder="پیام خود را بنویسید..."
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
                  {"ارسال شد!"}
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  {"ارسال پیام"}
                </>
              )}
            </button>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
}
