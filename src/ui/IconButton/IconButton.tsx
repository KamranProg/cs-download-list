import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import clsx from "clsx";
import styles from "./IconButton.module.css";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  iconPosition?: "left" | "right";
  children: ReactNode;
  variant?: "default" | "outlined" | "contained";
  scale?: "xs" | "sm" | "md" | "lg";
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  iconPosition = "left",
  children,
  variant = "default",
  scale = "lg",
  className,
  onClick, 
  ...props
}) => {
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
      {iconPosition === "left" && (
        <span className={clsx(styles.icon, styles.iconFirst)}>{icon}</span>
      )}
      <span className={styles.text}>{children}</span>
      {iconPosition === "right" && (
        <span className={clsx(styles.icon, styles.iconLast)}>{icon}</span>
      )}
    </button>
  );
};

export default IconButton;
