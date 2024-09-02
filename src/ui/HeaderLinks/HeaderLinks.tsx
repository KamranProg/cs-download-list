"use client";
import React from "react";
import clsx from "clsx";
import ContentBlock from "../ContentBlock/ContentBlock";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/ui/HeaderLinks/HeaderLinks.module.css";

interface HeaderLinksProps {
  links: { href: string; text: string }[];
  className?: string;
}

function HeaderLinks({ links, className }: HeaderLinksProps) {
  const pathname = usePathname();
  console.log("============", pathname);
  const isActive = (path: string) => path.split("?")[0] === pathname;
  return (
    <header className={clsx(styles.headerLinks, className)}>
      <nav>
        <ContentBlock className="flexGapRow">
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
        </ContentBlock>
      </nav>
    </header>
  );
}

export default HeaderLinks;
