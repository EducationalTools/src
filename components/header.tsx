import { Link, useLocation } from "react-router";
import { useSidebar } from "./ui/sidebar";
import { Button, buttonVariants } from "./ui/button";
import { Code, Loader2, Search, Settings, Sidebar } from "lucide-react";
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
import { useUiState, useExperimentalFeatures } from "@/lib/state";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Kbd, KbdGroup } from "./ui/kbd";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "./ui/skeleton";
import { Spinner } from "./ui/spinner";

export default function Header() {
  const sidebar = useSidebar();
  const setSearchOpen = useUiState((state) => state.setSearchOpen);
  const setSettingsOpen = useUiState((state) => state.setSettingsOpen);
  const experimentalFeatures = useExperimentalFeatures(
    (state) => state.enabled,
  );

  const session = authClient.useSession();

  return (
    <div className="flex flex-row gap-1 items-center sticky top-0 z-40 from-sidebar to-transparent bg-linear-to-b py-2">
      <AnimatePresence mode="popLayout">
        {(!experimentalFeatures || !sidebar.open || sidebar.isMobile) && (
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
                <div className="flex items-center gap-2">
                  Search
                  <KbdGroup>
                    <Kbd className="text-nowrap">⌘</Kbd>
                    <Kbd className="text-nowrap">K</Kbd>
                  </KbdGroup>
                </div>
              </TooltipContent>
            </Tooltip>
          </motion.div>
        )}
        {experimentalFeatures && (
          <motion.div
            layout
            key="header-sidebar"
            transition={{ duration: 0.2 }}
          >
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
                <div className="flex items-center gap-2">
                  Toggle Sidebar
                  <KbdGroup>
                    <Kbd className="text-nowrap">⌘</Kbd>
                    <Kbd className="text-nowrap">B</Kbd>
                  </KbdGroup>
                </div>
              </TooltipContent>
            </Tooltip>
          </motion.div>
        )}
        <div className="grow"></div>
        <div className="flex flex-row gap-1" key="header-right">
          {experimentalFeatures && (
            <>
              {!session.isPending && (
                <>
                  {session.data?.user ? (
                    <Button variant="ghost" asChild>
                      <UserButton
                        disableDefaultLinks={true}
                        size="sm"
                        variant="ghost"
                      />
                    </Button>
                  ) : (
                    <>
                      <Button variant="ghost" asChild>
                        <Link to="/auth/sign-in">Sign in</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/auth/sign-up">Sign up</Link>
                      </Button>
                    </>
                  )}
                </>
              )}
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
                  <div className="flex items-center gap-2">
                    Settings
                    <KbdGroup>
                      <Kbd className="text-nowrap">⌘</Kbd>
                      <Kbd className="text-nowrap">,</Kbd>
                    </KbdGroup>
                  </div>
                </TooltipContent>
              </Tooltip>
            </>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
}
