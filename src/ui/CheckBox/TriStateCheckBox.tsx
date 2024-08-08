'use client';
import { useEffect, useRef } from "react";
import clsx from "clsx";
import { CheckBoxProps } from "@/ui/CheckBox/CheckBox";
import styles from "./CheckBox.module.css";

export type CheckboxState = "Checked" | "Indeterminate" | "Empty";

export const CHECKBOX_STATES: Record<CheckboxState, CheckboxState> = {
  Checked: "Checked",
  Indeterminate: "Indeterminate",
  Empty: "Empty",
};

interface TriStateCheckbox extends CheckBoxProps {
  value: keyof typeof CHECKBOX_STATES;
  numSelected?: number;
  numTotal?: number;
}

const TriStateCheckbox = ({
  value,
  numSelected = 0,
  numTotal,
  scale = "lg",
  className,
  ...rest
}: Omit<TriStateCheckbox, "checked">) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      if (value === CHECKBOX_STATES.Checked) {
        checkboxRef.current.checked = true;
        checkboxRef.current.indeterminate = false;
      } else if (value === CHECKBOX_STATES.Empty) {
        checkboxRef.current.checked = false;
        checkboxRef.current.indeterminate = false;
      } else if (value === CHECKBOX_STATES.Indeterminate) {
        checkboxRef.current.checked = false;
        checkboxRef.current.indeterminate = true;
      }
    }
  }, [value]);

  return (
    <input
      className={clsx(styles.checkbox, styles[scale], className)}
      ref={checkboxRef}
      checked={value === CHECKBOX_STATES.Checked}
      type="checkbox"
      {...rest}
    />
  );
};

export default TriStateCheckbox;
