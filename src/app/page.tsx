"use client";
import CheckBox from "@/ui/CheckBox/CheckBox";
import TriStateCheckbox from "@/ui/CheckBox/TriStateCheckBox";
import IconLink from "@/ui/IconLink/IconLink";
import { AiOutlineDownload } from "react-icons/ai";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="container">
        <h1>Hello World</h1>

        <h2>Checkbox</h2>
        <div className={styles.flexGap}>
          <div>
            <CheckBox scale="lg" />
          </div>
        </div>
        <h2>TriStateCheckbox</h2>
        <div className={styles.flexGap}>
          <div>
            <TriStateCheckbox scale="lg" value="Empty" />
          </div>

          <div>
            <TriStateCheckbox scale="lg" value="Checked" />
          </div>
          <div>
            <TriStateCheckbox scale="lg" value="Indeterminate" />
          </div>
        </div>
        <h2>IconLink</h2>
        <div className={styles.flexGap}>
          <div>
            <IconLink
              href="#"
              icon={<AiOutlineDownload size={30} aria-hidden="true" />}
              onClick={() => {
                alert("Download");
              }}
              variant="default"
            >
              Download selected
            </IconLink>
          </div>
          <div>
            <IconLink
              href="#"
              icon={<AiOutlineDownload size={30} aria-hidden="true" />}
              iconPosition="right"
              onClick={() => {
                alert("Download");
              }}
              variant="outlined"
            >
              Download selected
            </IconLink>
          </div>
          <div>
            <IconLink
              href="#"
              icon={<AiOutlineDownload size={30} aria-hidden="true" />}
              onClick={() => {
                alert("Download");
              }}
              variant="contained"
            >
              Download selected
            </IconLink>
          </div>
        </div>
      </div>
    </main>
  );
}
