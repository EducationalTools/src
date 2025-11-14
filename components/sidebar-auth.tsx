import { Authenticated, AuthLoading } from "convex/react";
import { Skeleton } from "./ui/skeleton";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { UserButton } from "@daveyplate/better-auth-ui";

export default function SidebarAuth() {
  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <UserButton
            size="sm"
            className="bg-sidebar text-sidebar-foreground"
          />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </>
  );
}
