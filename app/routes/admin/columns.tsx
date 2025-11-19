"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

export const createColumns = (
  onSetRole: (userId: string, role: string) => void,
  onSetPassword: (userId: string, newPassword: string) => void,
  onBanUser: (userId: string, reason?: string, expiresIn?: number) => void,
  onUnbanUser: (userId: string) => void,
  onViewSessions: (userId: string) => void,
  onDeleteUser: (userId: string) => void
): ColumnDef<User>[] => [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onSetRole(user.id, "admin")}>
              Set as Admin
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSetRole(user.id, "user")}>
              Set as User
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                const password = prompt("Enter new password:");
                if (password) onSetPassword(user.id, password);
              }}
            >
              Set Password
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onViewSessions(user.id)}>
              View Sessions
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {user.banned ? (
              <DropdownMenuItem onClick={() => onUnbanUser(user.id)}>
                Unban User
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={() => {
                  const reason = prompt("Ban reason:");
                  onBanUser(user.id, reason || undefined);
                }}
              >
                Ban User
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={() => {
                if (
                  confirm(
                    `Are you sure you want to delete user ${user.email}? This cannot be undone.`
                  )
                ) {
                  onDeleteUser(user.id);
                }
              }}
              className="text-red-600"
            >
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
