import {
  ChevronDown,
  Clock,
  Code,
  GalleryVerticalEnd,
  GitBranch,
  PanelLeft,
  Search,
  Settings,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { MENU_ITEMS } from "@/lib/menu";
import { Kbd } from "./ui/kbd";
import { useExperimentalFeatures, useUiState } from "@/lib/state";
import clsx from "clsx";
import { Button } from "./ui/button";

export function AppSidebar() {
  const sidebar = useSidebar();
  const setSearchOpen = useUiState((state) => state.setSearchOpen);
  const location = useLocation();
  const experimentalFeatures = useExperimentalFeatures(
    (state) => state.enabled,
  );

  const renderMenuItemContent = (item: (typeof MENU_ITEMS)[number]) => (
    <>
      {item.icon && <item.icon />}
      <span>{item.label}</span>
      {item.children && item.children.length > 0 && (
        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
      )}
    </>
  );

  const menuItems = MENU_ITEMS.filter(
    (item) => !(item.experimental && !experimentalFeatures),
  );

  return (
    <Sidebar
      variant="inset"
      className={clsx(
        "p-0 duration-200 transition-all ease-out",
        !sidebar.open && "blur-lg opacity-0",
      )}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img
                    src="/edutools-black.svg"
                    className="dark:invert size-6"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">EduTools</span>
                  {/*<span className="">v1.0.0</span>*/}
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setSearchOpen(true)}
              className="border cursor-text"
            >
              <Search className="size-4" />
              Search
              <div className="grow"></div>
              <Kbd className="text-nowrap">Ctrl + K</Kbd>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const renderMenuItem = (
                  menuItem: typeof item,
                  isSubItem = false,
                ) => {
                  const content = renderMenuItemContent(menuItem);
                  const MenuButtonWrapper = isSubItem
                    ? SidebarMenuSubItem
                    : SidebarMenuItem;

                  if (menuItem.href) {
                    const MenuButton = isSubItem
                      ? SidebarMenuButton
                      : SidebarMenuButton;
                    return (
                      <MenuButton
                        isActive={menuItem.href == location.pathname}
                        asChild
                      >
                        <Link
                          to={menuItem.href}
                          target={menuItem.newTab ? "_blank" : "_self"}
                        >
                          {content}
                        </Link>
                      </MenuButton>
                    );
                  }
                  return <SidebarMenuButton>{content}</SidebarMenuButton>;
                };

                if (item.children && item.children.length > 0) {
                  return (
                    <Collapsible
                      key={item.label}
                      className="group/collapsible"
                      defaultOpen={item.children.some(
                        (child) => child.href == location.pathname,
                      )}
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger
                          className="sticky top-0 z-10 bg-sidebar/50 backdrop-blur-2xl"
                          asChild
                        >
                          {renderMenuItem(item)}
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.children.map((child) => (
                              <SidebarMenuSubItem key={child.label}>
                                {renderMenuItem(child, true)}
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                return (
                  <SidebarMenuItem key={item.label}>
                    {renderMenuItem(item)}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="p-4 flex flex-col border rounded-lg text-sm gap-2 opacity-25 hover:opacity-100 duration-200 bg-muted">
              <Link
                to="https://github.com/EducationalTools/src"
                target="_blank"
                className="flex flex-row gap-2 [&_svg:not([class*='size-'])]:size-4 items-center"
              >
                <Code />
                EducationalTools/src
              </Link>
              <div className="flex flex-row gap-2 [&_svg:not([class*='size-'])]:size-4 items-center">
                <GitBranch />
                {process.env.BRANCH_NAME}
              </div>
              <div className="flex flex-row gap-2 [&_svg:not([class*='size-'])]:size-4 items-center">
                <Clock />
                Built on{" "}
                {new Date(process.env.BUILD_TIME || 0).toLocaleString({})}
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail className="z-50" />
    </Sidebar>
  );
}
