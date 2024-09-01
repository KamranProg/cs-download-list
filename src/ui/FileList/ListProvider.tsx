"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { CHECKBOX_STATES, CheckboxState } from "@/ui/CheckBox/TriStateCheckBox";

interface ListContextType<T> {
  checkedItems: Record<string, { checked: boolean; item: T }>;
  handleSelectOne: (isChecked: boolean, item: T) => void;
  handleSelectAll: (checkAll: boolean) => void;
  checkboxState: CheckboxState;
  selectedCount: number;
  data: T[];
}

const ListContext = createContext<ListContextType<any> | undefined>(undefined);

function useListContext<T>() {
  const context = useContext<ListContextType<T> | undefined>(ListContext);
  if (!context) {
    throw new Error("useListContext must be used within a ListProvider");
  }
  return context;
}

type KeyExtractor<T> = ((item: T) => string) | keyof T;

interface ListProviderProps<T> {
  children: ReactNode;
  data: T[];
  keyExtractor: KeyExtractor<T>;
}

function ListProvider<T>({
  children,
  data,
  keyExtractor,
}: ListProviderProps<T>) {
  const [checkedItems, setCheckedItems] = useState<
    Record<string, { checked: boolean; item: T }>
  >({});

  const [selectedCount, setSelectedCount] = useState<number>(0);
  const [checkboxState, setCheckboxState] = useState<CheckboxState>(CHECKBOX_STATES.Empty);

  const getKey = (item: T) => {
    return typeof keyExtractor === "function"
      ? keyExtractor(item)
      : `${item[keyExtractor as keyof T]}`;
  };

  useEffect(() => {
    const totalItems = data.length;
    const checkedItemsCount = data.filter(
      (item) => checkedItems[getKey(item)]?.checked
    ).length;

    if (checkedItemsCount === 0) {
      setCheckboxState(CHECKBOX_STATES.Empty);
    } else if (checkedItemsCount === totalItems) {
      setCheckboxState(CHECKBOX_STATES.Checked);
    } else {
      setCheckboxState(CHECKBOX_STATES.Indeterminate);
    }

    setSelectedCount(
      Object.values(checkedItems).filter((i) => i.checked).length
    );
  }, [data, checkedItems]);

  const handleSelectOne = (isChecked: boolean, item: T) => {
    const key = getKey(item);
    setCheckedItems((prevState) => {
      const newState = { ...prevState };
      if (isChecked) {
        newState[key] = { checked: true, item };
      } else {
        delete newState[key];
      }

      return newState;
    });
  };

  const handleSelectAll = (checkAll: boolean) => {
    if (checkAll) {
      const newCheckedItems = data.reduce(
        (acc, item) => {
          const key = getKey(item);
          acc[key] = { checked: true, item };
          return acc;
        },
        { ...checkedItems }
      );
      setCheckedItems(newCheckedItems);
    } else {
      const newCheckedItems = { ...checkedItems };
      data.forEach((item) => {
        const key = getKey(item);
        delete newCheckedItems[key];
      });
      setCheckedItems(newCheckedItems);
    }
  };

  return (
    <ListContext.Provider
      value={{
        checkedItems,
        handleSelectOne,
        handleSelectAll,
        checkboxState,
        selectedCount,
        data,
      }}
    >
      {children}
    </ListContext.Provider>
  );
}

export { ListProvider, useListContext };
