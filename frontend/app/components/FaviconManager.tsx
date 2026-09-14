"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function FaviconManager() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const updateFavicon = (isDark: boolean) => {
      const pngIconUrl = isDark ? "/LogoDark.png" : "/LogoLight.png";

      // Remove existing standard icon links so Chrome forces a redraw
      const existingIcons = document.querySelectorAll<HTMLLinkElement>(
        "link[rel='icon'], link[rel='shortcut icon']"
      );
      existingIcons.forEach((el) => {
        el.parentNode?.removeChild(el);
      });

      // 1. Primary SVG favicon (supports theme switching natively)
      const svgLink = document.createElement("link");
      svgLink.rel = "icon";
      svgLink.type = "image/svg+xml";
      svgLink.href = "/favicon.svg";
      document.head.appendChild(svgLink);

      // 2. Theme-matched PNG favicon
      const pngLink = document.createElement("link");
      pngLink.rel = "icon";
      pngLink.type = "image/png";
      pngLink.href = pngIconUrl;
      document.head.appendChild(pngLink);
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
