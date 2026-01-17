"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <Button size="sm">...</Button>;

  const current = theme === "system" ? systemTheme : theme;

  return (
    <Button
      size="sm"
      onClick={() => setTheme(current === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
    >
      {current === "dark" ? "Light" : "Dark"}
    </Button>
  );
}
