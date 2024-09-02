"use server";
import { FileData } from "@/data/files_data";

export async function fetchData({
  currentPage,
  perPage = 10,
}: {
  currentPage: number;
  perPage?: number;
}) {

  const reqUrl = `http://localhost:5002/files?_page=${currentPage}&_per_page=${perPage}`;

  const response = await fetch(reqUrl);
  const {
    pages,
    data,
    items,
  }: { pages: number; data: FileData[]; items: number } = await response.json();
  console.log("================ fetchData \n");
  console.log("fetchData ", data);
  console.log("\n================ \n");

  const avilableFileData: FileData[] = data.filter(
    (item) => item.status === "available"
  );
  return { pages, data, items, avilableFileData };
}
