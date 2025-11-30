import { useEffect, useRef } from "react";
import { useSettingsState } from "@/lib/state";
import { useExperimentalFeatures } from "@/lib/state";

export function useCloak() {
  const cloak = useSettingsState((state) => state.cloak);
  const experimentalFeatures = useExperimentalFeatures(
    (state) => state.enabled
  );
  const originalTitleRef = useRef<string | null>(null);
  const originalFaviconRef = useRef<string | null>(null);
  const faviconLinkRef = useRef<HTMLLinkElement | null>(null);

  // Get or create favicon link element and store original values on mount
  useEffect(() => {
    if (originalTitleRef.current === null) {
      originalTitleRef.current = document.title;
    }
    
    // Get or create favicon element
    if (!faviconLinkRef.current) {
      let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (!favicon) {
        favicon = document.createElement("link");
        favicon.rel = "icon";
        document.head.appendChild(favicon);
      }
      faviconLinkRef.current = favicon;
      
      // Store the current favicon href as absolute URL
      if (originalFaviconRef.current === null) {
        const currentHref = favicon.href || favicon.getAttribute("href") || "";
        // Convert to absolute URL if it's relative
        if (currentHref) {
          try {
            originalFaviconRef.current = new URL(currentHref, window.location.href).href;
          } catch {
            originalFaviconRef.current = currentHref;
          }
        } else {
          // Fallback to default favicon path
          originalFaviconRef.current = new URL("/favicon.ico", window.location.href).href;
        }
      }
    }
  }, []);

  // Handle cloak when mode is "on"
  useEffect(() => {
    if (!experimentalFeatures || cloak.mode !== "on") {
      return;
    }

    if (cloak.title) {
      document.title = cloak.title;
    }
    if (cloak.favicon && faviconLinkRef.current) {
      faviconLinkRef.current.href = cloak.favicon;
    }

    return () => {
      if (originalTitleRef.current) {
        document.title = originalTitleRef.current;
      }
      if (originalFaviconRef.current && faviconLinkRef.current) {
        faviconLinkRef.current.href = originalFaviconRef.current;
      }
    };
  }, [experimentalFeatures, cloak.mode, cloak.title, cloak.favicon]);

  // Handle cloak when mode is "when-not-focused"
  useEffect(() => {
    if (!experimentalFeatures || cloak.mode !== "when-not-focused") {
      return;
    }

    const handleVisibilityChange = () => {
      if (!faviconLinkRef.current) return;
      
      if (document.hidden) {
        // Tab is not focused - apply cloak
        if (cloak.title) {
          document.title = cloak.title;
        }
        if (cloak.favicon) {
          faviconLinkRef.current.href = cloak.favicon;
        }
      } else {
        // Tab is focused - restore original
        if (originalTitleRef.current) {
          document.title = originalTitleRef.current;
        }
        if (originalFaviconRef.current) {
          faviconLinkRef.current.href = originalFaviconRef.current;
        }
      }
    };

    // Check initial state
    handleVisibilityChange();

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      // Restore original on unmount
      if (originalTitleRef.current) {
        document.title = originalTitleRef.current;
      }
      if (originalFaviconRef.current && faviconLinkRef.current) {
        faviconLinkRef.current.href = originalFaviconRef.current;
      }
    };
  }, [experimentalFeatures, cloak.mode, cloak.title, cloak.favicon]);

  // Handle mode "off" or when experimental features are disabled - ensure original is restored
  useEffect(() => {
    if (experimentalFeatures && cloak.mode !== "off") {
      return;
    }

    // Restore original when mode is "off" or experimental features are disabled
    if (originalTitleRef.current) {
      document.title = originalTitleRef.current;
    }
    if (originalFaviconRef.current && faviconLinkRef.current) {
      faviconLinkRef.current.href = originalFaviconRef.current;
    }
  }, [experimentalFeatures, cloak.mode]);
}

