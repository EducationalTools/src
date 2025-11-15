import { Link, useLocation } from "react-router";
import { useSidebar } from "./ui/sidebar";
import { Button, buttonVariants } from "./ui/button";
import { Code, Search, Sidebar } from "lucide-react";
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

export default function Header() {
  const sidebar = useSidebar();
  const setSearchOpen = useUiState((state) => state.setSearchOpen);

  return (
    <div className="flex flex-row gap-1 items-center">
      <AnimatePresence mode="popLayout">
        {(!sidebar.open || sidebar.isMobile) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
            >
              <Search />
            </Button>
          </motion.div>
        )}
        <motion.div layout key="header-sidebar" transition={{ duration: 0.2 }}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => sidebar.toggleSidebar()}
          >
            <Sidebar />
          </Button>
        </motion.div>
        <div className="grow"></div>
        <div className="flex flex-row gap-1" key="header-right">
          <Button variant="ghost" asChild>
            <Link to="https://github.com/EducationalTools/src" target="_blank">
              <Code />
              EducationalTools/src
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <UserButton size="sm" variant="ghost" />
          </Button>
        </div>
      </AnimatePresence>
    </div>
  );
}
