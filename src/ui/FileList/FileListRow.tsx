import React from "react";
import clsx from "clsx";
import { FileData } from "@/data/files_data";
import CheckBox from "@/ui/CheckBox/CheckBox";
import styles from "./FileListRow.module.css";

export interface FileListRowProps {
  file: FileData;
  checked: boolean;
  handleSelectOne: (isChecked: boolean, file: FileData) => void;
  className?: string;
}
export default function FileListRow({
  file: { name, device, path, status },
  checked,
  handleSelectOne,
  className = "",
}: FileListRowProps) {
  const handleCheckBoxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const { checked } = e.target;
    handleSelectOne(checked, { name, device, path, status });
  };

  const handleRowClick = () => {
    handleSelectOne(!checked, { name, device, path, status });
  };

  const isDisabled = status === "scheduled";
  const cheeckBoxLabel = isDisabled
    ? `File ${name}, status: ${status}, Option not available`
    : `Select ${name}, status: ${status}`;
  return (
    <tr
      className={clsx(styles.fileListRow, {
        [styles.rowSelected]: checked,
        [styles.rowNotSelectable]: status !== "available",
        "textXs textBold": true,
        [className]: className,
      })}
      onClick={handleRowClick}
    >
      <td>
        <CheckBox
          name={path}
          checked={checked}
          onChange={handleCheckBoxClick}
          aria-label={cheeckBoxLabel}
          disabled={isDisabled}
        />
      </td>
      <td className="textCenter">{name}</td>
      <td className="textCenter">{device}</td>
      <td>{path}</td>
      <td className={styles.status}>
        <span
          className={clsx({
            [styles.statusIndicator]: !isDisabled, // status === "available"
            [styles.statusIndicatorWidth]: isDisabled, // status === "scheduled"
          })}
        >
          {status}
        </span>
      </td>
    </tr>
  );
}
