"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FileText, MessageSquare, ArrowRight, Trash2, PanelLeftClose } from "lucide-react";
import type { SiteContent } from "@/lib/types/site-content";

function ImageField({
  value,
  onChange,
  label = "تصویر",
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const inputId = `img-${Math.random().toString(36).slice(2)}`;

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.set("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json();
      if (res.ok && data.url) onChange(data.url);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="URL تصویر"
          dir="ltr"
          className="flex-1"
        />
        <label htmlFor={inputId}>
          <Button type="button" variant="outline" asChild disabled={uploading}>
            <span>{uploading ? "..." : "آپلود"}</span>
          </Button>
          <input
            id={inputId}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFile}
          />
        </label>
      </div>
    </div>
  );
}

const ICON_OPTIONS = [
  "hammer",
  "users",
  "ruler",
  "message-circle",
  "lightbulb",
  "rocket",
];

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [view, setView] = useState<"dashboard" | "content" | "messages">("dashboard");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/content");
        if (res.status === 401) {
          router.replace("/admin/login");
          return;
        }
        const data = await res.json();
        setContent(data);
      } catch {
        router.replace("/admin/login");
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  async function loadMessages() {
    setMessagesLoading(true);
    try {
      const res = await fetch("/api/admin/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } finally {
      setMessagesLoading(false);
    }
  }

  async function deleteMessage(id: number) {
    if (!confirm("این پیام حذف شود؟")) return;
    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
      if (res.ok) setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch {
      // ignore
    }
  }

  // Load message count on dashboard
  useEffect(() => {
    if (view === "dashboard") loadMessages();
  }, [view]);

  async function save() {
    if (!content) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        const updated = await res.json();
        setContent(updated);
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">در حال بارگذاری...</p>
      </div>
    );
  }

  const c = content;
  const set = setContent;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      {/* Sticky header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 flex items-center justify-between h-14 gap-4">
          <div className="flex items-center gap-3">
            {view !== "dashboard" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setView("dashboard")}
                className="gap-1"
              >
                <PanelLeftClose className="h-4 w-4" />
                بازگشت
              </Button>
            )}
            <h1 className="text-lg font-bold text-foreground">پنل مدیریت</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">مشاهده سایت</Button>
            </Link>
            {view === "content" && (
              <Button onClick={save} disabled={saving} size="sm">
                {saving ? "در حال ذخیره..." : "ذخیره همه"}
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                await fetch("/api/admin/logout", { method: "POST" });
                router.replace("/admin/login");
                router.refresh();
              }}
            >
              خروج
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
        {/* Dashboard */}
        {view === "dashboard" && (
          <div className="space-y-8">
            <p className="text-muted-foreground text-center text-sm">
              از منوی زیر بخش مورد نظر را انتخاب کنید.
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <Card
                className="group cursor-pointer border-2 transition-all hover:border-primary/50 hover:shadow-lg"
                onClick={() => setView("content")}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <FileText className="h-8 w-8" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-bold text-lg text-foreground mb-1">ویرایش سایت و محتوا</h2>
                      <p className="text-sm text-muted-foreground mb-4">
                        نام سایت، متن‌ها، تصاویر و لینک‌ها را تغییر دهید.
                      </p>
                      <Button variant="secondary" size="sm" className="gap-1 w-full sm:w-auto">
                        ورود به ویرایش
                        <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="group cursor-pointer border-2 transition-all hover:border-primary/50 hover:shadow-lg"
                onClick={() => { setView("messages"); loadMessages(); }}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors relative">
                      <MessageSquare className="h-8 w-8" />
                      {messages.length > 0 && (
                        <span className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 px-1 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                          {messages.length}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-bold text-lg text-foreground mb-1">پیام‌های درخواست وقت</h2>
                      <p className="text-sm text-muted-foreground mb-4">
                        پیام‌های ارسالی از فرم تماس را ببینید و مدیریت کنید.
                      </p>
                      <Button variant="secondary" size="sm" className="gap-1 w-full sm:w-auto">
                        مشاهده پیام‌ها
                        <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Messages view */}
        {view === "messages" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap">
              <h2 className="font-bold text-lg">پیام‌های تماس (درخواست وقت)</h2>
              <Button variant="outline" size="sm" onClick={loadMessages} disabled={messagesLoading}>
                {messagesLoading ? "در حال بارگذاری..." : "بروزرسانی"}
              </Button>
            </CardHeader>
            <CardContent>
              {messagesLoading && messages.length === 0 ? (
                <p className="text-muted-foreground text-sm py-8 text-center">در حال بارگذاری...</p>
              ) : messages.length === 0 ? (
                <p className="text-muted-foreground text-sm py-8 text-center">هنوز پیامی ارسال نشده است.</p>
              ) : (
                <div className="space-y-4 max-h-[65vh] overflow-y-auto">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="border rounded-xl p-4 space-y-2 bg-muted/20 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-semibold text-foreground">{msg.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground" dir="ltr">
                            {new Date(msg.created_at).toLocaleString("fa-IR")}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => deleteMessage(msg.id)}
                            title="حذف پیام"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <a
                        href={`mailto:${msg.email}`}
                        className="text-sm text-primary hover:underline block"
                        dir="ltr"
                      >
                        {msg.email}
                      </a>
                      {msg.message ? (
                        <p className="text-sm text-foreground whitespace-pre-wrap pt-2 border-t border-border mt-2">
                          {msg.message}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Content editor (accordion) */}
        {view === "content" && (
        <Accordion type="multiple" className="w-full" defaultValue={["site"]}>
          {/* Site & Logo */}
          <AccordionItem value="site">
            <AccordionTrigger>سایت و لوگو</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardHeader>تنظیمات سایت</CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>نام سایت</Label>
                    <Input
                      value={c.siteConfig?.site_name ?? ""}
                      onChange={(e) =>
                        set({
                          ...c,
                          siteConfig: c.siteConfig
                            ? { ...c.siteConfig, site_name: e.target.value }
                            : null,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>توضیحات (متا)</Label>
                    <Textarea
                      value={c.siteConfig?.site_description ?? ""}
                      onChange={(e) =>
                        set({
                          ...c,
                          siteConfig: c.siteConfig
                            ? { ...c.siteConfig, site_description: e.target.value }
                            : null,
                        })
                      }
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>حرف لوگو</Label>
                    <Input
                      value={c.siteConfig?.logo_letter ?? ""}
                      onChange={(e) =>
                        set({
                          ...c,
                          siteConfig: c.siteConfig
                            ? { ...c.siteConfig, logo_letter: e.target.value }
                            : null,
                        })
                      }
                      maxLength={2}
                    />
                  </div>
                  <ImageField
                    label="URL لوگو (اختیاری)"
                    value={c.siteConfig?.logo_url ?? ""}
                    onChange={(url) =>
                      set({
                        ...c,
                        siteConfig: c.siteConfig
                          ? { ...c.siteConfig, logo_url: url || null }
                          : null,
                      })
                    }
                  />
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          {/* Top Bar */}
          <AccordionItem value="topbar">
            <AccordionTrigger>نوار بالا</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  {c.topbar && (
                    <>
                      <div className="space-y-2">
                        <Label>نام شرکت</Label>
                        <Input
                          value={c.topbar.company_name}
                          onChange={(e) =>
                            set({ ...c, topbar: { ...c.topbar!, company_name: e.target.value } })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>ساعات کاری</Label>
                        <Input
                          value={c.topbar.hours}
                          onChange={(e) =>
                            set({ ...c, topbar: { ...c.topbar!, hours: e.target.value } })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>تلفن</Label>
                        <Input
                          value={c.topbar.phone}
                          onChange={(e) =>
                            set({ ...c, topbar: { ...c.topbar!, phone: e.target.value } })
                          }
                          dir="ltr"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>ایمیل</Label>
                        <Input
                          value={c.topbar.email}
                          onChange={(e) =>
                            set({ ...c, topbar: { ...c.topbar!, email: e.target.value } })
                          }
                          dir="ltr"
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          {/* Nav Links */}
          <AccordionItem value="nav">
            <AccordionTrigger>لینک‌های منو</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  {c.navLinks.map((link, i) => (
                    <div key={link.id} className="flex gap-2 items-end flex-wrap">
                      <Input
                        placeholder="برچسب"
                        value={link.label}
                        onChange={(e) => {
                          const next = [...c.navLinks];
                          next[i] = { ...next[i], label: e.target.value };
                          set({ ...c, navLinks: next });
                        }}
                        className="w-32"
                      />
                      <Input
                        placeholder="لینک"
                        value={link.href}
                        onChange={(e) => {
                          const next = [...c.navLinks];
                          next[i] = { ...next[i], href: e.target.value };
                          set({ ...c, navLinks: next });
                        }}
                        className="flex-1 min-w-24"
                        dir="ltr"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          set({ ...c, navLinks: c.navLinks.filter((_, j) => j !== i) })
                        }
                      >
                        حذف
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      set({
                        ...c,
                        navLinks: [
                          ...c.navLinks,
                          { id: 0, label: "جدید", href: "#", sort_order: c.navLinks.length },
                        ],
                      })
                    }
                  >
                    + لینک
                  </Button>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          {/* Hero */}
          <AccordionItem value="hero">
            <AccordionTrigger>اسلایدهای هیرو</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6 space-y-6">
                  {c.heroSlides.map((slide, i) => (
                    <div key={slide.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">اسلاید {i + 1}</span>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            set({ ...c, heroSlides: c.heroSlides.filter((_, j) => j !== i) })
                          }
                        >
                          حذف
                        </Button>
                      </div>
                      <ImageField
                        value={slide.image_url ?? ""}
                        onChange={(url) => {
                          const next = [...c.heroSlides];
                          next[i] = { ...next[i], image_url: url || null };
                          set({ ...c, heroSlides: next });
                        }}
                      />
                      <div className="space-y-2">
                        <Label>عنوان</Label>
                        <Input
                          value={slide.title}
                          onChange={(e) => {
                            const next = [...c.heroSlides];
                            next[i] = { ...next[i], title: e.target.value };
                            set({ ...c, heroSlides: next });
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>توضیح</Label>
                        <Textarea
                          value={slide.description}
                          onChange={(e) => {
                            const next = [...c.heroSlides];
                            next[i] = { ...next[i], description: e.target.value };
                            set({ ...c, heroSlides: next });
                          }}
                          rows={2}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="متن دکمه"
                          value={slide.cta_text}
                          onChange={(e) => {
                            const next = [...c.heroSlides];
                            next[i] = { ...next[i], cta_text: e.target.value };
                            set({ ...c, heroSlides: next });
                          }}
                        />
                        <Input
                          placeholder="لینک دکمه"
                          value={slide.cta_link}
                          onChange={(e) => {
                            const next = [...c.heroSlides];
                            next[i] = { ...next[i], cta_link: e.target.value };
                            set({ ...c, heroSlides: next });
                          }}
                          dir="ltr"
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      set({
                        ...c,
                        heroSlides: [
                          ...c.heroSlides,
                          {
                            id: 0,
                            title: "",
                            description: "",
                            image_url: null,
                            cta_text: "مشاهده خدمات",
                            cta_link: "#services",
                            sort_order: c.heroSlides.length,
                          },
                        ],
                      })
                    }
                  >
                    + اسلاید
                  </Button>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          {/* About */}
          <AccordionItem value="about">
            <AccordionTrigger>درباره ما</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  {c.about && (
                    <>
                      <div className="space-y-2">
                        <Label>برچسب</Label>
                        <Input
                          value={c.about.tagline}
                          onChange={(e) =>
                            set({ ...c, about: { ...c.about!, tagline: e.target.value } })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>عنوان</Label>
                        <Input
                          value={c.about.heading}
                          onChange={(e) =>
                            set({ ...c, about: { ...c.about!, heading: e.target.value } })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>متن</Label>
                        <Textarea
                          value={c.about.body}
                          onChange={(e) =>
                            set({ ...c, about: { ...c.about!, body: e.target.value } })
                          }
                          rows={4}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>نام مدیر</Label>
                          <Input
                            value={c.about.ceo_name}
                            onChange={(e) =>
                              set({ ...c, about: { ...c.about!, ceo_name: e.target.value } })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>سمت مدیر</Label>
                          <Input
                            value={c.about.ceo_title}
                            onChange={(e) =>
                              set({ ...c, about: { ...c.about!, ceo_title: e.target.value } })
                            }
                          />
                        </div>
                      </div>
                      <ImageField
                        value={c.about.image_url ?? ""}
                        onChange={(url) =>
                          set({ ...c, about: { ...c.about!, image_url: url || null } })
                        }
                      />
                      <div className="grid grid-cols-3 gap-4">
                        {(["stat1", "stat2", "stat3"] as const).map((key) => (
                          <div key={key} className="space-y-2">
                            <Label>{key === "stat1" ? "آمار ۱" : key === "stat2" ? "آمار ۲" : "آمار ۳"}</Label>
                            <Input
                              value={c.about[`${key}_value`]}
                              onChange={(e) =>
                                set({
                                  ...c,
                                  about: { ...c.about!, [`${key}_value`]: e.target.value },
                                })
                              }
                              placeholder="مقدار"
                            />
                            <Input
                              value={c.about[`${key}_label`]}
                              onChange={(e) =>
                                set({
                                  ...c,
                                  about: { ...c.about!, [`${key}_label`]: e.target.value },
                                })
                              }
                              placeholder="برچسب"
                            />
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          {/* Services */}
          <AccordionItem value="services">
            <AccordionTrigger>خدمات</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6 space-y-6">
                  {c.services.map((s, i) => (
                    <div key={s.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between">
                        <span className="font-medium">خدمت {i + 1}</span>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            set({ ...c, services: c.services.filter((_, j) => j !== i) })
                          }
                        >
                          حذف
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label>آیکون</Label>
                        <select
                          value={s.icon}
                          onChange={(e) => {
                            const next = [...c.services];
                            next[i] = { ...next[i], icon: e.target.value };
                            set({ ...c, services: next });
                          }}
                          className="w-full border rounded-md px-3 py-2 bg-background"
                        >
                          {ICON_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                      <ImageField
                        value={s.image_url ?? ""}
                        onChange={(url) => {
                          const next = [...c.services];
                          next[i] = { ...next[i], image_url: url || null };
                          set({ ...c, services: next });
                        }}
                      />
                      <div className="space-y-2">
                        <Label>عنوان</Label>
                        <Input
                          value={s.title}
                          onChange={(e) => {
                            const next = [...c.services];
                            next[i] = { ...next[i], title: e.target.value };
                            set({ ...c, services: next });
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>توضیح</Label>
                        <Textarea
                          value={s.description}
                          onChange={(e) => {
                            const next = [...c.services];
                            next[i] = { ...next[i], description: e.target.value };
                            set({ ...c, services: next });
                          }}
                          rows={2}
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      set({
                        ...c,
                        services: [
                          ...c.services,
                          {
                            id: 0,
                            icon: "hammer",
                            title: "",
                            description: "",
                            image_url: null,
                            sort_order: c.services.length,
                          },
                        ],
                      })
                    }
                  >
                    + خدمات
                  </Button>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          {/* Process */}
          <AccordionItem value="process">
            <AccordionTrigger>روند کار</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6 space-y-6">
                  {c.processSteps.map((step, i) => (
                    <div key={step.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between">
                        <span className="font-medium">مرحله {i + 1}</span>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            set({
                              ...c,
                              processSteps: c.processSteps.filter((_, j) => j !== i),
                            })
                          }
                        >
                          حذف
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>شماره</Label>
                          <Input
                            value={step.step_number}
                            onChange={(e) => {
                              const next = [...c.processSteps];
                              next[i] = { ...next[i], step_number: e.target.value };
                              set({ ...c, processSteps: next });
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>آیکون</Label>
                          <select
                            value={step.icon}
                            onChange={(e) => {
                              const next = [...c.processSteps];
                              next[i] = { ...next[i], icon: e.target.value };
                              set({ ...c, processSteps: next });
                            }}
                            className="w-full border rounded-md px-3 py-2 bg-background"
                          >
                            {ICON_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>عنوان</Label>
                        <Input
                          value={step.title}
                          onChange={(e) => {
                            const next = [...c.processSteps];
                            next[i] = { ...next[i], title: e.target.value };
                            set({ ...c, processSteps: next });
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>توضیح</Label>
                        <Textarea
                          value={step.description}
                          onChange={(e) => {
                            const next = [...c.processSteps];
                            next[i] = { ...next[i], description: e.target.value };
                            set({ ...c, processSteps: next });
                          }}
                          rows={2}
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      set({
                        ...c,
                        processSteps: [
                          ...c.processSteps,
                          {
                            id: 0,
                            step_number: "۱",
                            icon: "message-circle",
                            title: "",
                            description: "",
                            sort_order: c.processSteps.length,
                          },
                        ],
                      })
                    }
                  >
                    + مرحله
                  </Button>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          {/* Gallery */}
          <AccordionItem value="gallery">
            <AccordionTrigger>گالری</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6 space-y-6">
                  {c.gallery.map((img, i) => (
                    <div key={img.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between">
                        <span className="font-medium">تصویر {i + 1}</span>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            set({ ...c, gallery: c.gallery.filter((_, j) => j !== i) })
                          }
                        >
                          حذف
                        </Button>
                      </div>
                      <ImageField
                        value={img.image_url}
                        onChange={(url) => {
                          const next = [...c.gallery];
                          next[i] = { ...next[i], image_url: url };
                          set({ ...c, gallery: next });
                        }}
                      />
                      <div className="space-y-2">
                        <Label>متن جایگزین</Label>
                        <Input
                          value={img.alt}
                          onChange={(e) => {
                            const next = [...c.gallery];
                            next[i] = { ...next[i], alt: e.target.value };
                            set({ ...c, gallery: next });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      set({
                        ...c,
                        gallery: [
                          ...c.gallery,
                          {
                            id: 0,
                            image_url: "",
                            alt: "",
                            sort_order: c.gallery.length,
                          },
                        ],
                      })
                    }
                  >
                    + تصویر
                  </Button>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          {/* CTA */}
          <AccordionItem value="cta">
            <AccordionTrigger>بخش CTA</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  {c.cta && (
                    <>
                      <div className="space-y-2">
                        <Label>برچسب</Label>
                        <Input
                          value={c.cta.tagline}
                          onChange={(e) =>
                            set({ ...c, cta: { ...c.cta!, tagline: e.target.value } })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>عنوان</Label>
                        <Input
                          value={c.cta.heading}
                          onChange={(e) =>
                            set({ ...c, cta: { ...c.cta!, heading: e.target.value } })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>متن</Label>
                        <Textarea
                          value={c.cta.body}
                          onChange={(e) =>
                            set({ ...c, cta: { ...c.cta!, body: e.target.value } })
                          }
                          rows={2}
                        />
                      </div>
                      <div className="flex gap-4">
                        <div className="space-y-2 flex-1">
                          <Label>متن دکمه</Label>
                          <Input
                            value={c.cta.cta_text}
                            onChange={(e) =>
                              set({ ...c, cta: { ...c.cta!, cta_text: e.target.value } })
                            }
                          />
                        </div>
                        <div className="space-y-2 flex-1">
                          <Label>لینک دکمه</Label>
                          <Input
                            value={c.cta.cta_link}
                            onChange={(e) =>
                              set({ ...c, cta: { ...c.cta!, cta_link: e.target.value } })
                            }
                            dir="ltr"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          {/* Contact */}
          <AccordionItem value="contact">
            <AccordionTrigger>تماس</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  {c.contact && (
                    <>
                      <div className="space-y-2">
                        <Label>برچسب</Label>
                        <Input
                          value={c.contact.tagline}
                          onChange={(e) =>
                            set({ ...c, contact: { ...c.contact!, tagline: e.target.value } })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>عنوان</Label>
                        <Input
                          value={c.contact.heading}
                          onChange={(e) =>
                            set({ ...c, contact: { ...c.contact!, heading: e.target.value } })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>زیرعنوان</Label>
                        <Textarea
                          value={c.contact.subtext}
                          onChange={(e) =>
                            set({ ...c, contact: { ...c.contact!, subtext: e.target.value } })
                          }
                          rows={2}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>برچسب نام</Label>
                          <Input
                            value={c.contact.form_label_name}
                            onChange={(e) =>
                              set({
                                ...c,
                                contact: { ...c.contact!, form_label_name: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Placeholder نام</Label>
                          <Input
                            value={c.contact.form_placeholder_name}
                            onChange={(e) =>
                              set({
                                ...c,
                                contact: { ...c.contact!, form_placeholder_name: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>برچسب ایمیل</Label>
                          <Input
                            value={c.contact.form_label_email}
                            onChange={(e) =>
                              set({
                                ...c,
                                contact: { ...c.contact!, form_label_email: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Placeholder ایمیل</Label>
                          <Input
                            value={c.contact.form_placeholder_email}
                            onChange={(e) =>
                              set({
                                ...c,
                                contact: { ...c.contact!, form_placeholder_email: e.target.value },
                              })
                            }
                            dir="ltr"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>برچسب پیام</Label>
                          <Input
                            value={c.contact.form_label_message}
                            onChange={(e) =>
                              set({
                                ...c,
                                contact: { ...c.contact!, form_label_message: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Placeholder پیام</Label>
                          <Input
                            value={c.contact.form_placeholder_message}
                            onChange={(e) =>
                              set({
                                ...c,
                                contact: { ...c.contact!, form_placeholder_message: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>متن دکمه ارسال</Label>
                          <Input
                            value={c.contact.submit_text}
                            onChange={(e) =>
                              set({ ...c, contact: { ...c.contact!, submit_text: e.target.value } })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>متن پس از ارسال</Label>
                          <Input
                            value={c.contact.submitted_text}
                            onChange={(e) =>
                              set({
                                ...c,
                                contact: { ...c.contact!, submitted_text: e.target.value },
                              })
                            }
                          />
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          {/* Footer */}
          <AccordionItem value="footer">
            <AccordionTrigger>فوتر</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  {c.footer && (
                    <>
                      <div className="space-y-2">
                        <Label>نام برند</Label>
                        <Input
                          value={c.footer.brand_name}
                          onChange={(e) =>
                            set({ ...c, footer: { ...c.footer!, brand_name: e.target.value } })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>حرف لوگو</Label>
                        <Input
                          value={c.footer.logo_letter}
                          onChange={(e) =>
                            set({ ...c, footer: { ...c.footer!, logo_letter: e.target.value } })
                          }
                          maxLength={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>توضیح</Label>
                        <Textarea
                          value={c.footer.description}
                          onChange={(e) =>
                            set({ ...c, footer: { ...c.footer!, description: e.target.value } })
                          }
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>متن کپی‌رایت</Label>
                        <Input
                          value={c.footer.copyright_text}
                          onChange={(e) =>
                            set({
                              ...c,
                              footer: { ...c.footer!, copyright_text: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>آدرس</Label>
                        <Textarea
                          value={c.footer.address}
                          onChange={(e) =>
                            set({ ...c, footer: { ...c.footer!, address: e.target.value } })
                          }
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>ساعات</Label>
                        <Input
                          value={c.footer.hours}
                          onChange={(e) =>
                            set({ ...c, footer: { ...c.footer!, hours: e.target.value } })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>تلفن</Label>
                        <Input
                          value={c.footer.phone}
                          onChange={(e) =>
                            set({ ...c, footer: { ...c.footer!, phone: e.target.value } })
                          }
                          dir="ltr"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>ایمیل</Label>
                        <Input
                          value={c.footer.email}
                          onChange={(e) =>
                            set({ ...c, footer: { ...c.footer!, email: e.target.value } })
                          }
                          dir="ltr"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>عنوان لینک‌ها</Label>
                          <Input
                            value={c.footer.quick_links_heading}
                            onChange={(e) =>
                              set({
                                ...c,
                                footer: { ...c.footer!, quick_links_heading: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>عنوان تماس</Label>
                          <Input
                            value={c.footer.contact_heading}
                            onChange={(e) =>
                              set({
                                ...c,
                                footer: { ...c.footer!, contact_heading: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>عنوان گالری</Label>
                          <Input
                            value={c.footer.gallery_heading}
                            onChange={(e) =>
                              set({
                                ...c,
                                footer: { ...c.footer!, gallery_heading: e.target.value },
                              })
                            }
                          />
                        </div>
                      </div>
                    </>
                  )}
                  <div className="pt-4">
                    <Label>لینک‌های سریع فوتر</Label>
                    <div className="mt-2 space-y-2">
                      {c.footerLinks.map((link, i) => (
                        <div key={link.id} className="flex gap-2">
                          <Input
                            value={link.label}
                            onChange={(e) => {
                              const next = [...c.footerLinks];
                              next[i] = { ...next[i], label: e.target.value };
                              set({ ...c, footerLinks: next });
                            }}
                            placeholder="برچسب"
                            className="w-32"
                          />
                          <Input
                            value={link.href}
                            onChange={(e) => {
                              const next = [...c.footerLinks];
                              next[i] = { ...next[i], href: e.target.value };
                              set({ ...c, footerLinks: next });
                            }}
                            placeholder="لینک"
                            className="flex-1"
                            dir="ltr"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              set({ ...c, footerLinks: c.footerLinks.filter((_, j) => j !== i) })
                            }
                          >
                            حذف
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          set({
                            ...c,
                            footerLinks: [
                              ...c.footerLinks,
                              {
                                id: 0,
                                label: "جدید",
                                href: "#",
                                sort_order: c.footerLinks.length,
                              },
                            ],
                          })
                        }
                      >
                        + لینک
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          {/* Contact messages (درخواست وقت) */}
        </Accordion>
        )}
      </main>
    </div>
  );
}
