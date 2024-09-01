"use client";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
} from "react-icons/fa";
import IconButton from "@/ui/IconButton/IconButton";
import Dropdown from "@/ui/Dropdown/Dropdown";
import styles from "@/ui/Pagination/Pagination.module.css";

interface PaginationProps {
  pages: number;
  currentPage: number;
  perPageOptions: number[];
  variant?: "default" | "outlined" | "contained";
  scale?: "xs" | "sm" | "md" | "lg";
}

const Pagination = ({
  pages,
  currentPage,
  perPageOptions,
  variant = "outlined",
  scale = "md",
}: PaginationProps) => {
  const [perPage, setPerPage] = useState(perPageOptions[0]); // Default to the first option
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    router.push(`/paginated-list?page=${newPage}&per_page=${perPage}`);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = parseInt(event.target.value, 10);
    setPerPage(newPerPage);
  };

  useEffect(() => {
    router.push(`/paginated-list?page=${currentPage}&per_page=${perPage}`);
  }, [perPage]);

  return (
    <div className={clsx(styles.pagination, "flexBaseline")}>
      <div className={styles.paginationDropdown}>
        <Dropdown
          options={perPageOptions}
          value={perPage}
          onChange={handlePerPageChange}
          variant={variant}
          scale={scale}
        />
      </div>
      <IconButton
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        icon={<FaAngleDoubleLeft />}
        iconPosition="left"
        variant={variant}
        scale={scale}
      >
        First
      </IconButton>
      <IconButton
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        icon={<FaAngleLeft />}
        iconPosition="left"
        variant={variant}
        scale={scale}
      >
        Previous
      </IconButton>
      <span className={styles.text}>
        {currentPage} of {pages}
      </span>
      <IconButton
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= pages}
        icon={<FaAngleRight />}
        iconPosition="right"
        variant={variant}
        scale={scale}
      >
        Next
      </IconButton>
      <IconButton
        onClick={() => handlePageChange(pages)}
        disabled={currentPage >= pages}
        icon={<FaAngleDoubleRight />}
        iconPosition="right"
        variant={variant}
        scale={scale}
      >
        Last
      </IconButton>
    </div>
  );
};

export default Pagination;
