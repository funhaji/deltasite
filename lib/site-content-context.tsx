"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { SiteContent } from "@/lib/types/site-content";

const SiteContentContext = createContext<{
  content: SiteContent | null;
  loading: boolean;
  refetch: () => Promise<void>;
} | null>(null);

export function SiteContentProvider({
  children,
  initialContent = null,
}: {
  children: React.ReactNode;
  initialContent?: SiteContent | null;
}) {
  const [content, setContent] = useState<SiteContent | null>(initialContent);
  const [loading, setLoading] = useState(!initialContent);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/content", { cache: "no-store" });
      if (!res.ok) throw new Error("Content fetch failed");
      const data = await res.json();
      setContent(data);
    } catch {
      // Keep existing content on fetch failure (e.g. server-passed initialContent)
      setContent((prev) => prev);
    } finally {
      setLoading(false);
    }
  }, []);

  // Use server-passed content for first paint, then always refetch from API so main site stays in sync with admin
  useEffect(() => {
    if (initialContent) {
      setContent(initialContent);
      setLoading(false);
    }
    // Always refetch on mount so we show latest from DB (admin changes appear immediately)
    refetch();
  }, [refetch]);

  return (
    <SiteContentContext.Provider value={{ content, loading, refetch }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error("useSiteContent must be used within SiteContentProvider");
  return ctx;
}
