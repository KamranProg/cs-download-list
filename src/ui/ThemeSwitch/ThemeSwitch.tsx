"use client";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { useTheme } from "next-themes";
import Image from "next/image";
import { FiSun, FiMoon } from "react-icons/fi";
import styles from "@/ui/ThemeSwitch/ThemeSwitch.module.css";

interface ThemeSwitchProps {
  className?: string;
}

export default function ThemeSwitch({ className }: ThemeSwitchProps) {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <Image
        src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
        width={36}
        height={36}
        sizes="36x36"
        alt="Loading Light/Dark Toggle"
        priority={false}
        title="Loading Light/Dark Toggle"
        className={clsx(styles.themeSwitch, className)}
      />
    );

  if (resolvedTheme === "dark") {
    return (
      <FiSun
        size={24}
        onClick={() => setTheme("light")}
        className={clsx(styles.themeSwitch, className)}
        aria-label="Switch to light mode"
      />
    );
  }

  if (resolvedTheme === "light") {
    return (
      <FiMoon
        size={24}
        onClick={() => setTheme("dark")}
        className={clsx(styles.themeSwitch, className)}
        aria-label="Switch to dark mode"
      />
    );
  }
}
