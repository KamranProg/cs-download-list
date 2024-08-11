import { useEffect, useState } from "react";
import { FileData } from "@/data/files_data";
import { CHECKBOX_STATES, CheckboxState } from "@/ui/CheckBox/TriStateCheckBox";

export type CheckedItemsType = Record<
  string,
  { checked: boolean; file: FileData }
>;

const setAllFilesAsChecked = (data: FileData[]): CheckedItemsType =>
  data.reduce(
    (acc, item) => ({
      ...acc,
      [item.path]: { checked: true, file: item },
    }),
    {}
  );

export default function useTriStateCheckBox(data: FileData[]) {
  const [checkedItems, setCheckedItems] = useState<CheckedItemsType>({});

  const handleSelectOne = (
    checked: boolean,
    file: FileData
  ) => {
    if (checked) {
      // add checked item
      setCheckedItems((prevState) => ({
        ...prevState,
        [file.path]: { checked, file },
      }));
    } else {
      // remove unchecked item
      const { [file.path]: _, ...rest } = checkedItems;
      setCheckedItems(rest);
    }
  };

  const [selectAllStatus, setSelectAllStatus] = useState<CheckboxState>(
    CHECKBOX_STATES.Empty
  );

  const handleSelectAll = () => {
    // set new status based on current status
    const updatedStatus =
      Object.keys(checkedItems).length === data.length
        ? CHECKBOX_STATES.Empty
        : CHECKBOX_STATES.Checked;
    // update checked items to all selected or all unselected
    setCheckedItems(
      updatedStatus === CHECKBOX_STATES.Checked
        ? setAllFilesAsChecked(data)
        : {}
    );
    // update select all status
    setSelectAllStatus(updatedStatus);
  };

  //runs when checkedItems changes and updates selectAllStatus
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
  }, [data.length, checkedItems]);

  return {
    checkedItems,
    handleSelectOne,
    selectAllStatus,
    handleSelectAll,
    selectedCount: Object.keys(checkedItems).length,
    isAvailable: data.some((row) => row.status === "available"),
    selectedMsg:
      Object.keys(checkedItems).length > 0
        ? `Selected ${Object.keys(checkedItems).length}`
        : "None Selected",

  };
}
