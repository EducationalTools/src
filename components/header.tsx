import { Link } from "react-router";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import { Button } from "./ui/button";
import { Sidebar } from "lucide-react";

export default function Header() {
  const sidebar = useSidebar();

  return (
    <div className="flex flex-row gap-1 items-center px-2">
      {!sidebar.open && (
        <Button variant="ghost" size="icon" asChild>
          <Link to="/">
            <img
              src="/edutools-black.svg"
              className="dark:invert size-6"
              alt=""
            />
          </Link>
        </Button>
      )}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => sidebar.toggleSidebar()}
      >
        <Sidebar />
      </Button>
    </div>
  );
}
