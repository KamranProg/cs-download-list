// CheckboxRow.js
import React from "react";
import clsx from "clsx";
import styles from "./CheckBox.module.css";

export interface CheckBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  scale?: "sm" | "md" | "lg";
}

function CheckBox({
  name,
  checked,
  onChange,
  className,
  scale = "lg",
  ...rest
}: CheckBoxProps) {
  return (
    <input
      className={clsx(styles.checkbox, styles[scale], className )}
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      {...rest}
    />
  );
}

export default CheckBox;
