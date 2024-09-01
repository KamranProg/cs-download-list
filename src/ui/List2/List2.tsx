import React from "react";
import clsx from "clsx";
import styles from "../List1/List.module.css";

interface List2Props<T> {
  checkedItems: Record<string, { checked: boolean; item: T }>;
  data: T[];
  header: React.ReactNode;
  onSelectOne?: (isChecked: boolean, itemData: T) => void;

  rowComponent: React.ComponentType<{
    itemData: T;
    checked: boolean;
    handleSelectOne?: (isChecked: boolean, itemData: T) => void;
  }>;
  className?: string;
  keyExtractor: (item: T) => string;
}

function List2<T>({
  checkedItems,
  data,
  header,
  onSelectOne,
  rowComponent: RowComponent,
  className,
  keyExtractor,
}: List2Props<T>): JSX.Element {
  return (
    <table className={clsx(styles.list, className)}>
      {header}
      <tbody>
        {data.map((item) => (
          <RowComponent
            key={keyExtractor(item)}
            itemData={item}
            handleSelectOne={onSelectOne}
            checked={checkedItems[keyExtractor(item)]?.checked || false}
          />
        ))}
      </tbody>
    </table>
  );
}

export default List2;
