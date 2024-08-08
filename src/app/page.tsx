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
        
      </div>
    </main>
  );
}
