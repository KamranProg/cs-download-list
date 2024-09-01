import { useState, useEffect } from "react";
import { CHECKBOX_STATES, CheckboxState } from "@/ui/CheckBox/TriStateCheckBox";

interface CheckedItems<T> {
  [key: string]: { checked: boolean; item: T };
}

const useTriStateCheckBox = <T,>(data: T[], keyExtractor: (item: T) => string) => {
  const [checkedItems, setCheckedItems] = useState<CheckedItems<T>>({});

  const handleSelectOne = (isChecked: boolean, item: T) => {
    const key = keyExtractor(item);
    if (isChecked) {
      setCheckedItems((prev) => ({ ...prev, [key]: { checked: isChecked, item } }));
    } else {
      const { [key]: _, ...rest } = checkedItems;
      setCheckedItems(rest);
    }
  };

  const [selectAllStatus, setSelectAllStatus] = useState<CheckboxState>(CHECKBOX_STATES.Empty);

  const handleSelectAll = () => {
    const allChecked = Object.keys(checkedItems).length !== data.length;
    setCheckedItems(
      allChecked
        ? data.reduce((acc, item) => ({ ...acc, [keyExtractor(item)]: { checked: true, item } }), {})
        : {}
    );
    setSelectAllStatus(allChecked ? CHECKBOX_STATES.Checked : CHECKBOX_STATES.Empty);
  };

  useEffect(() => {
    const selectedCount = Object.keys(checkedItems).length;
    switch (selectedCount) {
      case 0:
        setSelectAllStatus(CHECKBOX_STATES.Empty);
        break;
      case data.length:
        setSelectAllStatus(CHECKBOX_STATES.Checked);
        break;
      default:
        setSelectAllStatus(CHECKBOX_STATES.Indeterminate);
        break;
    }
  }, [checkedItems, data.length]);

  return {
    checkedItems,
    handleSelectOne,
    selectAllStatus,
    handleSelectAll,
    selectedCount: Object.keys(checkedItems).length,
    isAvailable: data.length > 0,
    selectedMsg: `Selected ${Object.keys(checkedItems).length}`
  };
};

export default useTriStateCheckBox;
