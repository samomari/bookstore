"use client";

import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { Card } from "@/components/ui/card";
import { Book } from "@/types";
import { useEffect, useState } from "react";

export default function Home() { // Remove `async` here
  const [data, setData] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch("/api/book");
        if (!response.ok) {
          throw new Error("Failed to fetch books data");
        }
        const books = await response.json();
        setData(books);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  return (
    <div className="w-full h-full flex justify-center">
      <Card className="lg:w-8/12 w-full shadow-md mt-5 mb-3 p-8">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </Card>
    </div>
  );
}
