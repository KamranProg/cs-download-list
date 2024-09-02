import React from "react";
import TableListWrapper from "@/ui/TableList/TableListWrapper";
import ContentBlock from "@/ui/ContentBlock/ContentBlock";
import { fetchData } from "./actions";
import TableListRowsInfiniteScroll from "@/ui/TableList/TableListRowsInfiniteScroll";
import { ListProviderInfiniteScroll } from "@/ui/FileList/ListProviderInfiniteScroll";
import TableListHeaderInfiniteScroll from "@/ui/TableList/TableListHeaderInfiniteScroll";

async function InfiniteScrollList() {
  const { pages, data, avilableFileData } = await fetchData({
    currentPage: 1,
    perPage: 10,
  });

  console.log("================ InfiniteScrollList fetchData \n");
  console.log("InfiniteScrollList fetchData: ", data);
  console.log("\n================ \n");

  return (
    <>
      <ContentBlock
        title="TableList with InfiniteScrol"
        titleTag="h1"
        description={[
          "Wrapped in a ListProvider and accepts any custom component in the headerComponent and rowsComponent that implements infinite Scroll props,",
          "both can use ListProvider context in their implementation.",
        ]}
      >
        <div className="flexGapCol">
          <ListProviderInfiniteScroll
            data={data}
            availableItems={avilableFileData}
            keyExtractor="path"
            filter={{ status: "available" }}
          >
            <TableListWrapper
              headerComponent={<TableListHeaderInfiniteScroll />}
              rowsComponent={<TableListRowsInfiniteScroll totalPages={pages} />}
            />
          </ListProviderInfiniteScroll>
        </div>
      </ContentBlock>
    </>
  );
}

export default InfiniteScrollList;
