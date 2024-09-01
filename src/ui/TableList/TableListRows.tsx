"use client";
import React from "react";
import FileListRow from "../FileList/FileListRow";
import { FileData } from "@/data/files_data";
import { useListContext } from "@/ui/FileList/ListProvider";

interface TableListRowsProps {
  data: FileData[];
  className?: string;
}

const TableListRows = ({ data, className }: TableListRowsProps) => {
  const { checkedItems, handleSelectOne } = useListContext();

  return (
    <>
      {data.map((file: FileData) => (
        <FileListRow
          key={file.path}
          itemData={file}
          handleSelectOne={handleSelectOne}
          checked={checkedItems[file?.path]?.checked || false}
          className={className}
        />
      ))}
    </>
  );
};

export default TableListRows;
