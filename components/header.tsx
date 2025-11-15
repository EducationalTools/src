import { Link } from "react-router";
import { useSidebar } from "./ui/sidebar";
import { Button } from "./ui/button";
import { Sidebar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Header() {
  const sidebar = useSidebar();

  return (
    <div className="flex flex-row gap-1 items-center px-2">
      <AnimatePresence mode="popLayout">
        {!sidebar.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            key="header-logo"
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
      </AnimatePresence>
    </div>
  );
}
