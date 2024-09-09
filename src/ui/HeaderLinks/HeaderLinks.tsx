"use client";
import React, { ReactNode } from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/ui/HeaderLinks/HeaderLinks.module.css";

interface HeaderLinksProps {
  links: { href: string; text: string }[];
  className?: string;
  children?: ReactNode;
}

function HeaderLinks({ links, className, children }: HeaderLinksProps) {
  const pathname = usePathname();
  const isActive = (path: string) => path.split("?")[0] === pathname;
  return (
    <header className={clsx(styles.headerLinks, className)}>
      <nav>
        {links.map((link) => {
          return (
            <Link
              href={link.href}
              key={link.href}
              className={clsx(styles.link, {
                [styles.active]: isActive(link.href),
              })}
            >
              {link.text}
            </Link>
          );
        })}
        {children}
      </nav>
    </header>
  );
}

export default HeaderLinks;
