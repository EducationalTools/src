"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { PiArrowsDownUp } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import type { ParsedGmae } from "@/lib/gmaes";

export const columns: ColumnDef<ParsedGmae>[] = [
  {
    accessorKey: "name",
    filterFn: "fuzzy",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <PiArrowsDownUp className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="max-w-md truncate">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <PiArrowsDownUp className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("category")}</div>
    ),
  },
];
