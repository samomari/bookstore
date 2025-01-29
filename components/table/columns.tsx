"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Book } from "@/types";

export const columns: ColumnDef<Book>[] = [
  {
    header: " ",
    cell: ({ row }) =>
      row.getCanExpand() ? (
        <button
          onClick={row.getToggleExpandedHandler()}
          className="cursor-pointer"
        >
          {row.getIsExpanded() ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </button>
      ) : null,
  },
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "isbn",
    header: "ISBN",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "publisher",
    header: "Publisher",
  },
];
