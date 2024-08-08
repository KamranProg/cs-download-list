import React, { AnchorHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./IconLink.module.css";

interface IconLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: ReactNode;
  iconPosition?: "left" | "right";
  children: ReactNode;
  variant?: "default" | "outlined" | "contained";
  scale?: "xs" | "sm" | "md" | "lg";
}

const IconLink: React.FC<IconLinkProps> = ({
  icon,
  iconPosition = "left",
  children,
  variant = "default",
  scale = "lg",
  className,
  ...props
}) => {
  return (
    <a
      {...props}
      className={clsx(
        styles.iconLink, // Base class from CSS module
        styles[variant], // Variant class from CSS module
        styles[scale], // Scale class from CSS module
        className // Additional class names passed as props
      )}
    >
      {iconPosition === "left" && (
        <span
          className={clsx(styles.icon, styles.iconFirst)}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <span className={styles.text}>{children}</span>
      {iconPosition === "right" && (
        <span
          className={clsx(styles.icon, styles.iconLast)}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
    </a>
  );
};

export default IconLink;
