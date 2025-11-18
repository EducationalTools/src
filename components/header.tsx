import { Link, useLocation } from "react-router";
import { useSidebar } from "./ui/sidebar";
import { Button, buttonVariants } from "./ui/button";
import { Code, Search, Settings, Sidebar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { UserButton } from "@daveyplate/better-auth-ui";
import { useUiState } from "@/lib/state";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Kbd } from "./ui/kbd";

export default function Header() {
  const sidebar = useSidebar();
  const setSearchOpen = useUiState((state) => state.setSearchOpen);
  const setSettingsOpen = useUiState((state) => state.setSettingsOpen);

  return (
    <div className="flex flex-row gap-1 items-center sticky top-0 z-50 from-sidebar to-transparent bg-linear-to-b py-2">
      <AnimatePresence mode="popLayout">
        {(!sidebar.open || sidebar.isMobile) && (
          <motion.div
            initial={{
              opacity: 0,
              filter: "blur(5px)",
              x: -50,
            }}
            animate={{
              opacity: 1,
              filter: "blur(0)",
              x: 0,
            }}
            exit={{ opacity: 0, filter: "blur(5px)", x: -50 }}
            transition={{ duration: 0.2 }}
            key="header-sidebar-collapsed-buttons"
            className="flex flex-row gap-2"
          >
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <img
                  src="/edutools-black.svg"
                  className="dark:invert size-6"
                  alt=""
                />
              </Link>
            </Button>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(true)}
                >
                  <Search />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Search <Kbd>Ctrl + K</Kbd>
              </TooltipContent>
            </Tooltip>
          </motion.div>
        )}
        <motion.div layout key="header-sidebar" transition={{ duration: 0.2 }}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => sidebar.toggleSidebar()}
              >
                <Sidebar />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Toggle Sidebar <Kbd>Ctrl + B</Kbd>
            </TooltipContent>
          </Tooltip>
        </motion.div>
        <div className="grow"></div>
        <div className="flex flex-row gap-1" key="header-right">
          <Button variant="ghost" asChild>
            <UserButton size="sm" variant="ghost" />
          </Button>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSettingsOpen(true)}
              >
                <Settings />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Settings <Kbd>Ctrl + ,</Kbd>
            </TooltipContent>
          </Tooltip>
        </div>
      </AnimatePresence>
    </div>
  );
}
