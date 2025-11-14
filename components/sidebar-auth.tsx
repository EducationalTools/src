import { AuthLoading } from "convex/react";
import { Skeleton } from "./ui/skeleton";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

export default function SidebarAuth() {
  return (
    <>
      <AuthLoading>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Skeleton className="aspect-square h-full" />
            <Skeleton className="w-[150px] h-full" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </AuthLoading>
    </>
  );
}
