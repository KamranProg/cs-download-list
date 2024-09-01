import React from "react";
import clsx from "clsx";
import styles from "../List1/List.module.css";

interface TableListWrapperProps {
  headerComponent: React.ReactNode;
  rowsComponent: React.ReactNode;
  className?: string;
}

const TableListWrapper = ({
  headerComponent,
  rowsComponent,
  className,
}: TableListWrapperProps) => {
  return (
    <table className={clsx(styles.list, className)}>
      {headerComponent}
      <tbody>{rowsComponent}</tbody>
    </table>
  );
};

export default TableListWrapper;
