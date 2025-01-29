"use client";

import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import Toolbar from "@/components/table/toolbar";
import { Card } from "@/components/ui/card";
import { Book } from "@/types";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [data, setData] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [lang, setLang] = useState("en");
  const [seed, setSeed] = useState(Math.floor(Math.random() * 90000000 + 10000000));
  const [likes, setLikes] = useState(2.5);
  const [reviews, setReviews] = useState(2.5);
  const tableRef = useRef<HTMLDivElement>(null);

  const fetchBooks = async (page: number, lang: string, seed: number, likes: number, reviews: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/book?page=${page}&lang=${lang}&seed=${seed}&likes=${likes}&reviews=${reviews}`);
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
    if (page > 1) {
      fetchBooks(page, lang, seed, likes, reviews);
    }
  }, [page, lang, seed, likes, reviews]);

  useEffect(() => {
    setData([]);
    setPage(1); 
    fetchBooks(1, lang, seed, likes, reviews); 
  }, [lang, seed, likes, reviews]); 

  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
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
      <Card className="lg:w-8/12 w-full shadow-md p-3">
        {loading && page === 1 ? (
          <p>Loading...</p>
        ) : (
         <div>
          <Toolbar 
            lang={lang} 
            seed={seed}
            likes={likes}
            reviews={reviews}
            onSeedChange={setSeed} 
            onLangChange={setLang} 
            onLikesChange={setLikes}
            onReviewsChange={setReviews}
            page={page}
            data={data}/>
          <div ref={tableRef} className="h-[840px] overflow-auto">
             
            <DataTable columns={columns} data={data} />
          </div>
          </div>
        )}
        {loading && page > 1 && <p>Loading more...</p>}
        {!hasMore && <p>No more books to load.</p>}
      </Card>
    </div>
  );
}
