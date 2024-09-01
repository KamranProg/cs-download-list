"use client";
import React from "react";
import CheckBox from "@/ui/CheckBox/CheckBox";
import TriStateCheckbox from "@/ui/CheckBox/TriStateCheckBox";
import IconButton from "@/ui/IconButton/IconButton";
import { AiOutlineDownload } from "react-icons/ai";
import { ListProvider } from "@/ui/FileList/ListProvider";
import TableListWrapper from "@/ui/TableList/TableListWrapper";
import TableListHeader from "@/ui/TableList/TableListHeader";
import TableListRows from "@/ui/TableList/TableListRows";
import TableList1Example from "@/ui/List1/TableList1Example";
import ListWithTwoSlotsExample from "@/ui/List2/ListWithTwoSlotsExample";
import ContentBlock from "@/ui/ContentBlock/ContentBlock"; // Import the new ContentBlock component
import { data, FileData } from "@/data/files_data";

export default function Home() {
  const keyExtractor = (item: FileData) => item.path;
  const fileData = data.filter((item) => item.status === "available");

  return (
    <>
      <ContentBlock
        title="TableList example 1"
        titleTag="h1"
        description="TableList with custom header component, renderRow function props, both use a custom hook for handling state"
      >
        <TableList1Example />
      </ContentBlock>

      <ContentBlock
        title="TableList example 2"
        description="TableList with custom header, rows components as props, both use a custom hook for handling state"
      >
        <ListWithTwoSlotsExample />
      </ContentBlock>

      <ContentBlock
        title="TableList example 3"
        description={[
          "Wrapped in a ListProvider and accepts any custom component in the headerComponent and rowsComponent props,",
          "both can use ListProvider context in their implementation.",
        ]}
      >
        <ListProvider data={fileData} keyExtractor={keyExtractor}>
          <TableListWrapper
            headerComponent={<TableListHeader />}
            rowsComponent={<TableListRows data={data} />}
          />
        </ListProvider>
      </ContentBlock>

      <ContentBlock title="Checkbox" className="flexGapRow">
        <label className="flexBaseline">
          <CheckBox scale="lg" onChange={() => {}} />
          Large Checkbox
        </label>
      </ContentBlock>

      <ContentBlock title="TriStateCheckbox" className="flexGapRow">
        <label className="flexBaseline">
          <TriStateCheckbox scale="lg" value="Empty" onChange={() => {}} />
          Unchecked TriStateCheckbox
        </label>
        <label className="flexBaseline">
          <TriStateCheckbox scale="lg" value="Checked" onChange={() => {}} />
          Checked TriStateCheckbox
        </label>
        <label className="flexBaseline">
          <TriStateCheckbox
            scale="lg"
            value="Indeterminate"
            onChange={() => {}}
          />
          Indeterminate TriStateCheckbox
        </label>
      </ContentBlock>

      <ContentBlock title="IconButton" className="flexGapRow">
        <IconButton
          icon={<AiOutlineDownload size={30} aria-hidden="true" />}
          onClick={() => {
            alert("Download");
          }}
          variant="default"
        >
          Download selected
        </IconButton>
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
        <IconButton
          icon={<AiOutlineDownload size={30} aria-hidden="true" />}
          onClick={() => {
            alert("Download");
          }}
          variant="contained"
        >
          Download selected
        </IconButton>
      </ContentBlock>
    </>
  );
}
