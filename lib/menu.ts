import {
  PiArchive,
  PiBinary,
  PiCalculator,
  PiClock,
  PiDiceFive,
  PiFileText,
  PiGameController,
  PiHouse,
  PiKey,
  PiPalette,
  PiArrowsLeftRight,
  PiShield,
  PiShieldCheck,
  PiTextT,
  PiWrench,
} from "react-icons/pi";
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
  requiresAdmin?: boolean;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    label: "Home",
    href: "/",
    icon: PiHouse,
    experimental: false,
    kbd: "⌘ ⇧ H",
  },
  {
    label: "Tools",
    icon: PiWrench,
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
    icon: PiGameController,
    experimental: true,
    children: [
      {
        label: "All Gmaes",
        href: "/g",
        kbd: "⌘ ⇧ G",
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
    icon: PiArchive,
    experimental: true,
  },
  {
    label: "Admin",
    href: "/admin",
    icon: PiShield,
    requiresAdmin: true,
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
    icon: PiFileText,
    experimental: true,
  },
  {
    label: "Privacy",
    href: "/privacy",
    icon: PiShieldCheck,
    experimental: true,
  },
];
