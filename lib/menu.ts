import {
  ArchiveRestore,
  Binary,
  Calculator,
  Clock,
  Dices,
  FileText,
  Gamepad2,
  Home,
  Key,
  Palette,
  Scale,
  ShieldUser,
  Type,
  Wrench,
} from "lucide-react";
import DiscordIcon from "~icons/fa7-brands/discord";
import { gmaes } from "./gmaes";
import { TOOLS } from "./tools";

interface MenuItem {
  label: string;
  href?: string;
  icon?: React.ComponentType;
  experimental?: boolean;
  children?: MenuItem[];
  newTab?: boolean;
  kbd?: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    label: "Home",
    href: "/",
    icon: Home,
    experimental: false,
    kbd: "⌘ + ⇧ + H",
  },
  {
    label: "Tools",
    icon: Wrench,
    experimental: false,
    children: TOOLS.map((tool) => ({
      label: tool.label,
      href: `/tools/${tool.id}`,
      experimental: false,
      icon: tool.icon,
    })),
  },

  {
    label: "Gmaes",
    icon: Gamepad2,
    experimental: true,
    children: [
      {
        label: "All Gmaes",
        href: "/g",
      },
      ...gmaes.map((gmae) => ({
        label: gmae.name,
        href: `/g/${gmae.id}`,
      })),
    ],
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
