import React from "react";
import clsx from "clsx";
import { FileData } from "@/data/files_data";
import CheckBox from "@/ui/CheckBox/CheckBox";
import styles from "./FileListRow.module.css";

export interface FileListRowProps {
  itemData: FileData;
  checked: boolean;
  handleSelectOne?: (isChecked: boolean, file: FileData) => void;
  className?: string;
}
export default function FileListRow({
  itemData: { name, device, path, status },
  checked,
  handleSelectOne,
  className = "",
}: FileListRowProps) {
  const handleCheckBoxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const { checked } = e.target;
    if (handleSelectOne)
      handleSelectOne(checked, { name, device, path, status });
  };

  const handleRowClick = () => {
    if (handleSelectOne)
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
        [styles.rowNotSelectable]: isDisabled,
        "textXs textBold": true,
        [className]: className,
      })}
      onClick={isDisabled ? undefined : handleRowClick}
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
      <td className="textCenter">
        <span className={styles.mobileSizeLabel}>Name:</span>
        {name}
      </td>
      <td className="textCenter">
        <span className={styles.mobileSizeLabel}>Device:</span>
        {device}
      </td>
      <td>
        <span className={styles.mobileSizeLabel}>Path:</span>
        {path}
      </td>
      <td className={styles.status}>
        <span className={styles.mobileSizeLabel}>Status:</span>
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
