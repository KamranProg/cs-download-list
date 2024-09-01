import React, { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./IconButton.module.css";

interface BaseIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "default" | "outlined" | "contained";
  scale?: "xs" | "sm" | "md" | "lg";
}

interface IconButtonWithIconProps extends BaseIconButtonProps {
  icon: ReactNode;
  iconPosition?: "left" | "right";
}

interface IconButtonWithoutIconProps extends BaseIconButtonProps {
  icon?: never;
  iconPosition?: never;
}

type IconButtonProps = IconButtonWithIconProps | IconButtonWithoutIconProps;

const IconButton = ({
  icon,
  iconPosition = "left",
  children,
  variant = "default",
  scale = "lg",
  className,
  onClick,
  ...props
}: IconButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        styles.iconButton,
        styles[variant],
        styles[scale],
        className
      )}
      onClick={onClick}
    >
      {icon && iconPosition === "left" && (
        <span className={clsx(styles.icon, styles.iconFirst)}>{icon}</span>
      )}
      <span className={styles.text}>{children}</span>
      {icon && iconPosition === "right" && (
        <span className={clsx(styles.icon, styles.iconLast)}>{icon}</span>
      )}
    </button>
  );
};

export default IconButton;
