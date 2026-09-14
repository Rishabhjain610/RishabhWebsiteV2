"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function FaviconManager() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const updateFavicon = (isDark: boolean) => {
      const iconUrl = isDark ? "/LogoDark.png" : "/LogoLight.png";

      const links = document.querySelectorAll<HTMLLinkElement>(
        "link[rel='icon'], link[rel='shortcut icon']"
      );

      if (links.length > 0) {
        links.forEach((link) => {
          link.href = iconUrl;
          link.removeAttribute("media");
        });
      } else {
        const link = document.createElement("link");
        link.rel = "icon";
        link.href = iconUrl;
        document.head.appendChild(link);
      }
    };

    if (resolvedTheme) {
      updateFavicon(resolvedTheme === "dark");
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (!resolvedTheme || resolvedTheme === "system") {
        updateFavicon(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [resolvedTheme]);

  return null;
}
