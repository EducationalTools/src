import { Home } from "lucide-react";

interface MenuItem {
  label: string;
  href: string;
  icon: React.ComponentType;
  experimental: boolean;
  children?: MenuItem[];
}

export const MENU_ITEMS: MenuItem[] = [
  {
    label: "Home",
    href: "/",
    icon: Home,
    experimental: false,
  },
];
