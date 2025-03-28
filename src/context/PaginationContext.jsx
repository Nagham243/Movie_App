import React, { createContext, useContext, useState, useEffect } from "react";

const PaginationContext = createContext();

export function PaginationProvider({ children }) {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const resetSearch = () => {
    setSearchQuery("");
    setDebouncedQuery("");
    handlePageChange(1);
  };

  const onPageChange = ({ selected }) => {
    const newPage = selected + 1;
    if (newPage >= 1 && newPage <= totalPages) {
      handlePageChange(newPage);
    }
  };

  return (
    <PaginationContext.Provider
      value={{
        page,
        totalPages,
        setTotalPages,
        searchQuery,
        setSearchQuery,
        debouncedQuery,
        setDebouncedQuery,
        resetSearch,
        onPageChange,
        handlePageChange,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
}

export const usePagination = () => useContext(PaginationContext);
