"use client";

import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { Card } from "@/components/ui/card";
import { Book } from "@/types";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [data, setData] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const tableRef = useRef<HTMLDivElement>(null);

  // Function to fetch books with pagination
  const fetchBooks = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/book?page=${page}`);
      if (!response.ok) {
        throw new Error("Failed to fetch books data");
      }
      const books = await response.json();
      if (books.length === 0) {
        setHasMore(false);
      } else {
        setData((prevData) => [...prevData, ...books]);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchBooks(page);
  }, [page]);

  // Infinite scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
        // If we're at the bottom of the scrollable area, load more data
        if (scrollHeight - scrollTop === clientHeight && hasMore && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    const tableEl = tableRef.current;
    tableEl?.addEventListener("scroll", handleScroll);

    return () => {
      tableEl?.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);

  return (
    <div className="w-full h-full flex justify-center">
      <Card className="lg:w-8/12 w-full shadow-md mt-5 mb-3 p-8">
        {loading && page === 1 ? (
          <p>Loading...</p>
        ) : (
          <div ref={tableRef} style={{ height: '840px', overflowY: 'auto' }}>
            <DataTable columns={columns} data={data} />
          </div>
        )}
        {loading && page > 1 && <p>Loading more...</p>}
        {!hasMore && <p>No more books to load.</p>}
      </Card>
    </div>
  );
}
