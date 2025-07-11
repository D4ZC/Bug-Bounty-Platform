import { useState, useMemo } from 'react';

export function usePagination<T>(items: T[], pageSize: number) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(items.length / pageSize);

  const paginatedItems = useMemo(
    () => items.slice((page - 1) * pageSize, page * pageSize),
    [items, page, pageSize]
  );

  const goToPage = (p: number) => setPage(Math.max(1, Math.min(totalPages, p)));
  const nextPage = () => setPage((p) => Math.min(totalPages, p + 1));
  const prevPage = () => setPage((p) => Math.max(1, p - 1));

  // Reset page if items change
  useMemo(() => { setPage(1); }, [items]);

  return {
    page,
    setPage: goToPage,
    nextPage,
    prevPage,
    totalPages,
    paginatedItems,
  };
} 