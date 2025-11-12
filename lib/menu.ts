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
        label: "Calculator",
        href: "/tools/calculator",
        icon: Calculator,
        experimental: false,
      },
      {
        label: "Unit Converter",
        href: "/tools/unit-converter",
        icon: Scale,
        experimental: false,
      },
      {
        label: "Word Counter",
        href: "/tools/word-counter",
        icon: Type,
        experimental: false,
      },
      {
        label: "Password Generator",
        href: "/tools/password-generator",
        icon: Key,
        experimental: false,
      },
      {
        label: "Random Number",
        href: "/tools/random-number",
        icon: Dices,
        experimental: false,
      },
      {
        label: "Stopwatch & Timer",
        href: "/tools/stopwatch-timer",
        icon: Clock,
        experimental: false,
      },
      {
        label: "Base64 Converter",
        href: "/tools/base64-converter",
        icon: Binary,
        experimental: false,
      },
      {
        label: "Color Picker",
        href: "/tools/color-picker",
        icon: Palette,
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
