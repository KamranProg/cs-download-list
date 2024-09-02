import React, { forwardRef } from "react";
import clsx from "clsx";
import { FaSpinner } from "react-icons/fa";
import styles from "@/ui/FileList/FileListRowSkeleton.module.css";

interface FileListRowSkeletonProps {}

const FileListRowSkeleton = forwardRef<
  HTMLTableRowElement,
  FileListRowSkeletonProps
>((_, ref) => {
  return (
    <tr ref={ref} className={styles.fileListRowSkeleton}>
      <td>
        <FaSpinner />
      </td>
      <td className={clsx("textCenter", styles.second)}>
        <span></span>
      </td>
      <td className="textCenter">
        <span></span>
      </td>
      <td>
        <span></span>
      </td>
      <td className={clsx("textCenter", styles.last)}>
        <span></span>
      </td>
    </tr>
  );
});

export default FileListRowSkeleton;
