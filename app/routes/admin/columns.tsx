"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { PiArrowsDownUp } from "react-icons/pi";
import { Button } from "@/components/ui/button";

export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: string | null;
  banned: boolean | null;
  banReason: string | null;
  banExpires: number | null;
  createdAt: number;
  updatedAt: number;
};

export const createColumns = (): ColumnDef<User>[] => [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <PiArrowsDownUp className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "name",
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
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("role") || "user"}</div>
    ),
  },
  {
    accessorKey: "banned",
    header: "Status",
    cell: ({ row }) => {
      const banned = row.getValue("banned") as boolean | null;
      return (
        <div
          className={`font-medium ${banned ? "text-red-600" : "text-green-600"}`}
        >
          {banned ? "Banned" : "Active"}
        </div>
      );
    },
  },
  {
    accessorKey: "emailVerified",
    header: "Verified",
    cell: ({ row }) => {
      const verified = row.getValue("emailVerified") as boolean;
      return (
        <div className={verified ? "text-green-600" : "text-yellow-600"}>
          {verified ? "Yes" : "No"}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created
          <PiArrowsDownUp className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
];
