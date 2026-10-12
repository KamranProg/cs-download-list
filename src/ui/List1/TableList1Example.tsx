"use client";
import { useState } from "react";
import { data, FileData } from "@/data/files_data";
import useGenericTriStateCheckBox from "@/ui/CheckBox/useTriStateCheckBox";
import FileListHeader from "@/ui/FileList/FileListHeader";
import FileListRow from "@/ui/FileList/FileListRow";
import List1, { RenderRowType } from "@/ui/List1/List1";
import ModalDialog from "@/ui/ModalDialog/ModalDialog";
import styles from "@/ui/List1/TableList1Example.module.css";

function getFileIcon(filePath: string) {
  const baseUrl = "https://api.iconservice.com/fileicon/";
  const defaultIcon = "https://api.iconservice.com/default-icon.png";

  const parts = filePath.split(".");
  const extension = parts.length > 1 ? parts.pop()?.toLowerCase() : "";

  const iconUrl = extension ? `${baseUrl}${extension}?size=128` : defaultIcon;

  return iconUrl;
}

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

  const messageHeader =
    selectedCount === 1
      ? "1 file selected:"
      : `${selectedCount} files selected:`;

  const [modalOpen, setModalOpen] = useState(false);

  const handleDownload = () => {
    setModalOpen(true);
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

  const renderFileCard = (file: FileData) => (
    <li key={file.path} className={styles.fileCard}>
      <div
        className={styles.fileCardImage}
        style={{ backgroundImage: `url(${getFileIcon(file.path)})` }}
      ></div>
      <div className={styles.fileCardDetails}>
        <h3>{file.name}</h3>
        <p>{file.path}</p>
      </div>
    </li>
  );

  return (
    <>
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
      {modalOpen && (
        <ModalDialog
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          header={<h2>{messageHeader}</h2>}
        >
          <ul className={styles.fileGrid}>
            {Object.values(checkedItems).map(({ item }) =>
              renderFileCard(item)
            )}
          </ul>
        </ModalDialog>
      )}
    </>
  );
}
