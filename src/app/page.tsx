"use client";
import CheckBox from "@/ui/CheckBox/CheckBox";
import styles from "./page.module.css";
import { data } from "@/data/files_data";
import useTriStateCheckBox from "@/ui/CheckBox/useTriStateCheckBox";
import FileList from "@/ui/FileList/FileList";
import FileListHeader from "@/ui/FileList/FileListHeader";
import TriStateCheckbox from "@/ui/CheckBox/TriStateCheckBox";
import IconButton from "@/ui/IconButton/IconButton";
import { AiOutlineDownload } from "react-icons/ai";

export default function Home() {
  const {
    checkedItems,
    selectedCount,
    isAvailable,
    handleSelectOne,
    selectedMsg,
    selectAllStatus,
    handleSelectAll,
  } = useTriStateCheckBox(data.filter((item) => item.status === "available"));

  const handleDownload = () => {
    const message = Object.keys(checkedItems)
      .map((key) => {
        const { name, path, status } = checkedItems[key].file;
        if (status === "available") {
          return `${name} available for download from ${path},`;
        }
      })
      .filter((key) => key)
      .join("\n\n");

    alert(message);
  };

  return (
    <main className={styles.main}>
      <div className="container">
        <h1>FileList</h1>

        <div className={styles.flexGap}>
          <FileList
            data={data}
            checkedItems={checkedItems}
            onSelectOne={handleSelectOne}
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
          />
        </div>

        <h2>Checkbox</h2>
        <div className={styles.flexGap}>
          <div>
            <label className={styles.flexBaseline}>
              <CheckBox scale="lg" onChange={() => {}} />
              large Checkbox
            </label>
          </div>
        </div>

        <h2>TriStateCheckbox</h2>
        <div className={styles.flexGap}>
          <div>
            <label className={styles.flexBaseline}>
              <TriStateCheckbox scale="lg" value="Empty" onChange={() => {}} />
              Unchecked TriStateCheckbox
            </label>
          </div>

          <div>
            <label className={styles.flexBaseline}>
              <TriStateCheckbox
                scale="lg"
                value="Checked"
                onChange={() => {}}
              />
              Empty TriStateCheckbox
            </label>
          </div>
          <div>
            <label className={styles.flexBaseline}>
              <TriStateCheckbox
                scale="lg"
                value="Indeterminate"
                onChange={() => {}}
              />
              Indeterminate TriStateCheckbox
            </label>
          </div>
        </div>

        <h2>IconButton</h2>
        <div className={styles.flexGap}>
          <div>
            <IconButton
              icon={<AiOutlineDownload size={30} aria-hidden="true" />}
              onClick={() => {
                alert("Download");
              }}
              variant="default"
            >
              Download selected
            </IconButton>
          </div>
          <div>
            <IconButton
              icon={<AiOutlineDownload size={30} aria-hidden="true" />}
              iconPosition="right"
              onClick={() => {
                alert("Download");
              }}
              variant="outlined"
            >
              Download selected
            </IconButton>
          </div>
          <div>
            <IconButton
              icon={<AiOutlineDownload size={30} aria-hidden="true" />}
              onClick={() => {
                alert("Download");
              }}
              variant="contained"
            >
              Download selected
            </IconButton>
          </div>
        </div>
      </div>
    </main>
  );
}
