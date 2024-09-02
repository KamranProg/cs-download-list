"use client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import FileListRow from "@/ui//FileList/FileListRow";
import FileListRowSkeleton from "@/ui/FileList/FileListRowSkeleton";
import { useListContext } from "@/ui/FileList/ListProviderInfiniteScroll";
import { CHECKBOX_STATES } from "@/ui/CheckBox/TriStateCheckBox";
import { fetchData } from "@/app/infinite-scroll/actions";
import { FileData } from "@/data/files_data";

interface TableListRowsInfiniteScrollProps {
  initialPage?: number;
  totalPages: number;
  className?: string;
}

const TableListRowsInfiniteScroll = ({
  initialPage = 1,
  totalPages,
  className,
}: TableListRowsInfiniteScrollProps) => {
  const {
    checkedItems,
    loadedItems,
    handleSelectOne,
    addItemsToChecked,
    checkboxState,
    appendNewItems,
  } = useListContext<FileData>();
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [ref, inViewRef] = useInView();
  const isMoreDataAvailable = currentPage < totalPages;

  const loadMoreData = async () => {
    if (!isMoreDataAvailable) {
      return; // Stop fetching if all data has been loaded
    }
    const next = currentPage + 1;
    const { data, avilableFileData } = await fetchData({
      currentPage: next,
      perPage: 10,
    });
    if (!data.length) {
      return; // Stop if no more data is returned
    }
    appendNewItems(data, avilableFileData);
    setCurrentPage(next);
  };

  useEffect(() => {
    if (inViewRef) {
      loadMoreData();
    }
  }, [inViewRef]);

  useEffect(() => {
    // start checking all available items if Tristate checkbox is checked (checkboxState === "Checked")
    if (loadedItems && checkboxState === CHECKBOX_STATES.Checked) {
      addItemsToChecked(
        loadedItems.filter((file) => file.status === "available")
      );
    }
  }, [loadedItems, addItemsToChecked, checkboxState]);

  return (
    <>
      {loadedItems &&
        loadedItems.map((file) => {
          return (
            <FileListRow
              key={file.path}
              itemData={file}
              handleSelectOne={handleSelectOne}
              checked={
                (checkedItems[file?.path]?.checked &&
                  file.status === "available") ||
                false
              }
              className={className}
            />
          );
        })}
      {isMoreDataAvailable && <FileListRowSkeleton ref={ref} />}
    </>
  );
};

export default TableListRowsInfiniteScroll;
