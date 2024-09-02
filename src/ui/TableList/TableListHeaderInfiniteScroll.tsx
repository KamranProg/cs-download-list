"use client";
import React from "react";
import clsx from "clsx";
import TriStateCheckbox, {
  CheckboxState,
} from "@/ui/CheckBox/TriStateCheckBox";
import IconButton from "@/ui/IconButton/IconButton";
import { AiOutlineDownload } from "react-icons/ai";
import { useListContext } from "@/ui/FileList/ListProviderInfiniteScroll";
import { FileData } from "@/data/files_data";
import styles from "../FileList/FileListHeader.module.css";

interface TableListHeaderInfiniteScrollProps {
  className?: string;
}
const TableListHeaderInfiniteScroll = ({
  className,
}: TableListHeaderInfiniteScrollProps) => {
  const { handleSelectAll, checkboxState, checkedItems, loadedItems } =
    useListContext<FileData>();
  const selectedCount = Object.keys(checkedItems).length;
  const selectedMsg = `${selectedCount} item${
    selectedCount === 1 ? "" : "s"
  } selected`;
  const selectAllStatus: CheckboxState = checkboxState; // Use the state directly from context
  const isDownloadEnabled = selectedCount > 0; // Ensure there are selected items
  const isAvailable = loadedItems.some((item) => item.status === "available");

  const handleDownload = () => {
    const message = Object.keys(checkedItems)
      .map((key) => {
        const { name, path, status } = checkedItems[key].item;
        if (status === "available") {
          return `${name} available for download from ${path},`;
        }
        return null;
      })
      .filter((msg) => msg)
      .join("\n\n");
    alert(message);
  };

  // Adapter function to handle checkbox change events
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
            onChange={handleCheckboxChange} // Use the adapter function here
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

export default TableListHeaderInfiniteScroll;
