import React from "react";
import TableListWrapper from "@/ui/TableList/TableListWrapper"; // Your table component
import TableListHeader from "@/ui/TableList/TableListHeader";
import { FileData } from "@/data/files_data";
import { ListProvider } from "@/ui/FileList/ListProvider";
import TableListRows from "@/ui/TableList/TableListRows";
import ContentBlock from "@/ui/ContentBlock/ContentBlock";
import Pagination from "@/ui/Pagination/Pagination";

async function PaginatedList({
  searchParams,
}: {
  searchParams?: {
    per_page?: string;
    page?: string;
  };
}) {
  const perPage = Number(searchParams?.per_page) || 5;
  const currentPage = Number(searchParams?.page) || 1;

  const reqUrl = `http://localhost:5002/files?_page=${currentPage}&_per_page=${perPage}`;
  const response = await fetch(reqUrl);
  const { pages, data }: { pages: number; data: FileData[] } =
    await response.json();
  const avilableFileData: FileData[] = data.filter(
    (item) => item.status === "available"
  );

  return (
    <>
      <ContentBlock
        title="TableList with pagination"
        titleTag="h1"
        description={[
          "Wrapped in a ListProvider and accepts any custom component in the headerComponent and rowsComponent props,",
          "both can use ListProvider context in their implementation.",
        ]}
      >
        <ListProvider data={avilableFileData} keyExtractor="path">
          <Pagination
            pages={pages}
            perPageOptions={[5, 10, 20]}
            currentPage={currentPage}
          >
            <TableListWrapper
              headerComponent={<TableListHeader />}
              rowsComponent={<TableListRows data={data} />}
            />
          </Pagination>
        </ListProvider>
      </ContentBlock>
    </>
  );
}

export default PaginatedList;
