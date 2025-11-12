import { ArchiveRestore, Gamepad2, Home, Wrench } from "lucide-react";

interface MenuItem {
  label: string;
  href?: string;
  icon?: React.ComponentType;
  experimental?: boolean;
  children?: MenuItem[];
  newTab?: boolean;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    label: "Home",
    href: "/",
    icon: Home,
    experimental: false,
  },
  {
    label: "Tools",
    href: "/tools",
    icon: Wrench,
    experimental: false,
  },
  {
    label: "Gmaes",
    href: "/gmaes",
    icon: Gamepad2,
    experimental: true,
  },
  {
    label: "Backups",
    href: "/backups",
    icon: ArchiveRestore,
    experimental: true,
  },
];
