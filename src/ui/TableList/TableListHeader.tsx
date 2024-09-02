"use client";
import React from "react";
import clsx from "clsx";
import TriStateCheckbox, {
  CheckboxState,
} from "@/ui/CheckBox/TriStateCheckBox";
import IconButton from "@/ui/IconButton/IconButton";
import { AiOutlineDownload } from "react-icons/ai";
import { useListContext } from "@/ui/FileList/ListProvider";
import { FileData } from "@/data/files_data";
import styles from "../FileList/FileListHeader.module.css";

interface TableListHeaderProps {
  className?: string;
}
const TableListHeader = ({ className }: TableListHeaderProps) => {
  const { handleSelectAll, checkboxState, selectedCount, checkedItems, data } =
    useListContext<FileData>();
  const selectedMsg = `${selectedCount} item${
    selectedCount === 1 ? "" : "s"
  } selected`;
  const selectAllStatus: CheckboxState = checkboxState;
  const isDownloadEnabled = selectedCount > 0;
  const isAvailable = data.some((item) => item.status === "available");

  const handleDownload = () => {
    const messageHeader =
      selectedCount === 1
        ? "1 file selected:"
        : `${selectedCount} files selected:`;
    const messageBody = Object.keys(checkedItems)
      .map((key) => {
        const { name, path, status } = checkedItems[key].item;
        if (status === "available") {
          return `${name} available for download from ${path},`;
        }
        return null;
      })
      .filter((msg) => msg)
      .join("\n\n");
    const message = `${messageHeader}\n\n${messageBody}`;
    alert(message);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSelectAll(event.target.checked);
  };

  return (
    <thead className={clsx(styles.fileListHeader, className)}>
      <tr className={clsx(styles.actions, { "textMd textBold": true })}>
        <th>
          <TriStateCheckbox
            name="select-all"
            aria-label={`Select all files, currently ${selectedMsg.toLowerCase()}`}
            value={selectAllStatus}
            onChange={handleCheckboxChange}
          />
        </th>
        <th className={styles.minTextWidth} aria-hidden={true}>
          {selectedMsg}
        </th>
        <th className={styles.flexGrowFull}>
          <IconButton
            icon={<AiOutlineDownload size={30} aria-hidden="true" />}
            onClick={handleDownload}
            disabled={!isAvailable || !isDownloadEnabled}
          >
            Download selected
          </IconButton>
        </th>
      </tr>
      <tr
        className={clsx(styles.columnsHeadersRow, {
          "textCenter textSm": true,
        })}
      >
        <th></th>
        <th>Name</th>
        <th>Device</th>
        <th className="textLeft">Path</th>
        <th
          className={clsx({
            textLeft: true,
            [styles.minTextWidth]: true,
            [styles.statusIndicatorWidth]: isAvailable,
          })}
        >
          Status
        </th>
      </tr>
    </thead>
  );
};

export default TableListHeader;
