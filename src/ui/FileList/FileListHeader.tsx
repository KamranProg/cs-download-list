import React from "react";
import TriStateCheckbox from "@/ui/CheckBox/TriStateCheckBox";
import IconButton from "@/ui/IconButton/IconButton";
import { AiOutlineDownload } from "react-icons/ai";
import { CheckboxState } from "@/ui/CheckBox/TriStateCheckBox";
import styles from "./FileListHeader.module.css";
import clsx from "clsx";

interface FileListHeaderProps {
  onDownload?: () => void;
  onSelectAll?: () => void;
  isAvailable?: boolean;
  selectedCount: number;
  selectAllStatus: CheckboxState;
  selectedMsg: string;
}

export default function FileListHeader({
  onDownload,
  onSelectAll,
  isAvailable,
  selectedCount,
  selectAllStatus,
  selectedMsg,
}: FileListHeaderProps) {
  const handleDownloadAllClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDownload) onDownload();
  };

  return (
    <thead className={styles.fileListHeader}>
      <tr
        className={clsx(styles.actions, {
          "textMd textBold": true,
        })}
      >
        <th>
          <TriStateCheckbox
            name="select-all"
            aria-label={`Select all files, currently ${selectedMsg.toLocaleLowerCase()}`}
            value={selectAllStatus}
            onChange={onSelectAll}
          />
        </th>
        <th className={styles.minTextWidth} aria-hidden={true}>
          {selectedMsg}
        </th>
        <th  className={styles.flexGrowFull}>
          <IconButton
            icon={<AiOutlineDownload size={30} aria-hidden="true" />}
            onClick={handleDownloadAllClick}
            disabled={!isAvailable || selectedCount === 0}
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
}
