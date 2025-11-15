import { SidebarTrigger } from "./ui/sidebar";

export default function Header() {
  return (
    <div className="flex flex-row gap-2">
      <SidebarTrigger />
    </div>
  );
}
