"use client";

import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/navigation";

export default function PaginationClient({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  const router = useRouter();

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    router.push(`/blog?page=${value}`);
  };

  return (
    <Pagination
      count={totalPages}
      page={page}
      onChange={handleChange}
      color="primary"
      size="large"
      shape="rounded"
    />
  );
}
