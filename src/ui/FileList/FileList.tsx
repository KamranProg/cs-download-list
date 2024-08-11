import React from "react";
import clsx from "clsx";
import FileListRow from "./FileListRow";
import { FileData } from "@/data/files_data";
import styles from "./FileList.module.css";

interface FileListProps {
  checkedItems: Record<string, { checked: boolean; file: FileData }>;
  data: FileData[];
  onSelectOne: (isChecked: boolean, file: FileData) => void;
  header: React.ReactNode;
  className?: string;
}

export default function FileList({
  checkedItems,
  data,
  onSelectOne,
  header,
  className,
}: FileListProps) {
  return (
    <table className={clsx(styles.fileList, className)}>
      {header}
      <tbody>
        {data.map((file: FileData) => (
          <FileListRow
            key={file.path}
            file={file}
            handleSelectOne={onSelectOne}
            checked={checkedItems[file?.path]?.checked || false}
          />
        ))}
      </tbody>
    </table>
  );
}
