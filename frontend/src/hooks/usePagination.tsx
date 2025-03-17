import { useState } from "react";

type PageSizes = 5 | 10 | 25;

const usePagination = (
  initPage: number = 1,
  initRowsPerPage: PageSizes = 10
) => {
  const [page, setPage] = useState(initPage);
  const [rowsPerPage, setRowsPerPage] = useState(initRowsPerPage);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10) as unknown as PageSizes);
    setPage(0);
  };

  return {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};

export default usePagination;
