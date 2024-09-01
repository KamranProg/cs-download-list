"use client";
import { data, FileData } from "@/data/files_data";
import useGenericTriStateCheckBox from "@/ui/CheckBox/useTriStateCheckBox";
import FileListHeader from "@/ui/FileList/FileListHeader";
import FileListRow from "@/ui/FileList/FileListRow";
import List2 from "@/ui/List2/List2";

export default function Home() {
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

  return (
    <List2
      data={data}
      checkedItems={checkedItems}
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
      onSelectOne={handleSelectOne}
      rowComponent={FileListRow}
      keyExtractor={keyExtractor}
    />
  );
}
