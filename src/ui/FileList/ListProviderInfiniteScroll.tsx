"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { CHECKBOX_STATES, CheckboxState } from "@/ui/CheckBox/TriStateCheckBox";

interface Item<T> {
  checked: boolean;
  item: T;
}

interface ListContextType<T> {
  checkedItems: Record<string, Item<T>>;
  loadedItems: T[];
  handleSelectOne: (isChecked: boolean, item: T) => void;
  handleSelectAll: (checkAll: boolean) => void;
  addItemsToChecked: (newItems: T[]) => void;
  appendNewItems: (newItems: T[], newAvialableItems: T[]) => void;
  checkboxState: CheckboxState;
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

function getKey<T>(item: T, keyExtractor: KeyExtractor<T>) {
  return typeof keyExtractor === "function"
    ? keyExtractor(item)
    : `${item[keyExtractor as keyof T]}`;
}

function getCheckedItems<T>(
  updates: T[],
  keyExtractor: KeyExtractor<T>,
  checkedItems?: Record<string, Item<T>>
) {
  const initialValues = { ...checkedItems } || {};
  return updates.reduce((acc, item) => {
    const key = getKey(item, keyExtractor);
    acc[key] = { checked: true, item };
    return acc;
  }, initialValues);
}

interface ListProviderInfiniteScrollProps<T> {
  children: ReactNode;
  data: T[];
  availableItems: T[];
  keyExtractor: KeyExtractor<T>;
  filter: { [K in keyof T]?: string };
}

function ListProviderInfiniteScroll<T>({
  children,
  data,
  availableItems,
  keyExtractor,
  filter,
}: ListProviderInfiniteScrollProps<T>) {
  const [checkedItems, setCheckedItems] = useState<Record<string, Item<T>>>({});
  const [loadedItems, setLoadedItems] = useState(data);
  const [checkboxState, setCheckboxState] = useState<CheckboxState>(
    CHECKBOX_STATES.Empty
  );
  const [allAvailableItemsCount, setAllAvailableItemsCount] = useState(
    availableItems.length
  );

  useEffect(() => {
    const checkedItemsCount = Object.keys(checkedItems).length;
    if (checkedItemsCount === 0) {
      setCheckboxState(CHECKBOX_STATES.Empty);
    } else if (checkedItemsCount === allAvailableItemsCount) {
      setCheckboxState(CHECKBOX_STATES.Checked);
    } else {
      setCheckboxState(CHECKBOX_STATES.Indeterminate);
    }
  }, [checkedItems]);

  const handleSelectOne = (isChecked: boolean, item: T) => {
    const key = getKey(item, keyExtractor);
    setCheckedItems((prevState) => {
      const newState = { ...prevState };
      if (isChecked) {
        newState[key] = { checked: true, item };
      } else {
        delete newState[key];
        setCheckboxState(CHECKBOX_STATES.Indeterminate);
      }
      return newState;
    });
  };

  const handleSelectAll = (checkAll: boolean) => {
    if (checkAll) {
      const key = Object.keys(filter)[0] as keyof T;
      const value = filter[key];
      const newCheckedItems = getCheckedItems(
        loadedItems.filter((item: T) => item[key] === value),
        keyExtractor
      );
      setAllAvailableItemsCount(Object.keys(newCheckedItems).length);
      setCheckedItems(newCheckedItems);
    } else {
      setCheckedItems({});
      setCheckboxState(CHECKBOX_STATES.Empty);
    }
  };

  const appendNewItems = (newItems: T[], newAvialableItems: T[]) => {
    const newLoadedItems = [...loadedItems, ...newItems];
    setLoadedItems(newLoadedItems);
    addItemsToChecked(newAvialableItems);
    setAllAvailableItemsCount((prev) => prev + newAvialableItems.length);
  };

  const addItemsToChecked = useCallback(
    (newItems: T[]) => {
      if (checkboxState === CHECKBOX_STATES.Checked) {
        let updates: T[] = [];
        // when checkboxState === "Checked" all items that are not allready in checkeditems
        updates = newItems.filter(
          (item) => !checkedItems[getKey(item, keyExtractor)]
        );

        if (updates.length > 0) {
          // mark all as checked and add to checkedItems
          const newCheckedItems = getCheckedItems(
            updates,
            keyExtractor,
            checkedItems
          );
          setCheckedItems(newCheckedItems);
        }
      }
    },
    [checkedItems, checkboxState, getKey]
  );

  return (
    <ListContext.Provider
      value={{
        checkedItems,
        loadedItems,
        handleSelectOne,
        handleSelectAll,
        addItemsToChecked,
        appendNewItems,
        checkboxState,
        data,
      }}
    >
      {children}
    </ListContext.Provider>
  );
}

export { ListProviderInfiniteScroll, useListContext };
