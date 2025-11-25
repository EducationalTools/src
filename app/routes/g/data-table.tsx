"use client";

import * as React from "react";
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  FilterFn,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router";
import { useGeneralSettings } from "@/lib/state";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemValue = row.getValue(columnId) as string;

  if (!value) return true;

  const searchValue = value.toLowerCase();
  const targetValue = itemValue.toLowerCase();

  // Check for exact substring match first
  if (targetValue.includes(searchValue)) return true;

  // Fuzzy matching: check if all characters in search appear in order
  let searchIndex = 0;
  for (
    let i = 0;
    i < targetValue.length && searchIndex < searchValue.length;
    i++
  ) {
    if (targetValue[i] === searchValue[searchIndex]) {
      searchIndex++;
    }
  }

  return searchIndex === searchValue.length;
};

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const gmaeOpenMode = useGeneralSettings((state) => state.gmaeOpenMode);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center py-4 px-4">
        <Input
          placeholder="Filter gmaes..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="flex-1 overflow-auto border-t">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  <Link
                    to={`/g/${(row.original as any).id}`}
                    className="contents"
                    target={gmaeOpenMode === "tab" ? "_blank" : undefined}
                    onClick={(e) => {
                      if (gmaeOpenMode === "window") {
                        e.preventDefault();
                        window.open(
                          `/g/${(row.original as any).id}`,
                          "_blank",
                          "popup=yes,width=800,height=600"
                        );
                      }
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </Link>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
