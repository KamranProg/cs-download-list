"use client";
import { data, FileData } from "@/data/files_data";
import useGenericTriStateCheckBox from "@/ui/CheckBox/useTriStateCheckBox";
import FileListHeader from "@/ui/FileList/FileListHeader";
import FileListRow from "@/ui/FileList/FileListRow";
import List1, { RenderRowType } from "@/ui/List1/List1";

export default function TableList1Example() {
  const keyExtractor = (item: FileData) => item.path;
  const fileData = data.filter((item) => item.status === "available");
  const {
    checkedItems,
    selectedCount,
    isAvailable,
    handleSelectOne,
    selectedMsg,
    selectAllStatus,
    handleSelectAll,
  } = useGenericTriStateCheckBox<FileData>(fileData, keyExtractor);

  const handleDownload = () => {
    const message = Object.keys(checkedItems)
      .map((key) => {
        const { name, path, status } = checkedItems[key].item;
        if (status === "available") {
          return `${name} available for download from ${path},`;
        }
      })
      .filter((key) => key)
      .join("\n\n");

    alert(message);
  };

  // custom render row function
  const renderRow: RenderRowType<FileData> = (item, key) => {
    return (
      <FileListRow
        key={key}
        itemData={item}
        handleSelectOne={handleSelectOne}
        checked={checkedItems[item?.path]?.checked || false}
      />
    );
  };

  return (
    <List1
      data={data}
      renderRow={renderRow}
      header={
        <FileListHeader
          onSelectAll={handleSelectAll}
          onDownload={handleDownload}
          isAvailable={isAvailable} // there are files available for download
          selectedCount={selectedCount}
          selectAllStatus={selectAllStatus}
          selectedMsg={selectedMsg}
        />
      }
      keyExtractor={keyExtractor}
    />
  );
}
