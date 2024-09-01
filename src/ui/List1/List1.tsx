import React from "react";
import clsx from "clsx";
import styles from "./List.module.css";

export interface List1Props<T> {
  data: T[];
  renderRow: (item: T, key: React.Key) => JSX.Element;
  header: JSX.Element;
  className?: string;
  keyExtractor: (item: T) => React.Key;
}

export type RenderRowType<T> = List1Props<T>["renderRow"];

function List1<T>({
  data,
  renderRow,
  header,
  className,
  keyExtractor,
}: List1Props<T>): JSX.Element {
  return (
    <table className={clsx(styles.list, className)}>
      {header}
      <tbody>{data.map((item) => renderRow(item, keyExtractor(item)))}</tbody>
    </table>
  );
}

export default List1;
