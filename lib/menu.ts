import {
  ArchiveRestore,
  FileText,
  Gamepad2,
  Home,
  ShieldUser,
  Wrench,
} from "lucide-react";
import DiscordIcon from "~icons/fa7-brands/discord";

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
    icon: Wrench,
    experimental: false,
    children: [
      {
        label: "Tool 1",
        href: "/tools/tool1",
        icon: Wrench,
        experimental: false,
      },
      {
        label: "Tool 2",
        href: "/tools/tool2",
        icon: Wrench,
        experimental: false,
      },
    ],
  },
  {
    label: "Gmaes",
    icon: Gamepad2,
    experimental: true,
  },
  {
    label: "Backups",
    href: "/backups",
    icon: ArchiveRestore,
    experimental: true,
  },
  {
    label: "Discord",
    href: "https://discord.gg/AFec9wNar8",
    icon: DiscordIcon,
    experimental: true,
    newTab: true,
  },
  {
    label: "About",
    href: "/about",
    icon: FileText,
    experimental: true,
  },
  {
    label: "Privacy",
    href: "/privacy",
    icon: ShieldUser,
    experimental: true,
  },
];
