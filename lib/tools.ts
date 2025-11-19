import {
  Binary,
  Calculator,
  Clock,
  Dices,
  Key,
  Palette,
  Scale,
  Type,
} from "lucide-react";

export const TOOLS = [
  {
    label: "Calculator",
    id: "calculator",
    icon: Calculator,
  },
  {
    label: "Unit Converter",
    id: "unit-converter",
    icon: Scale,
  },
  {
    label: "Word Counter",
    id: "word-counter",
    icon: Type,
  },
  {
    label: "Password Generator",
    id: "password-generator",
    icon: Key,
  },
  {
    label: "Random Number",
    id: "random-number",
    icon: Dices,
  },
  {
    label: "Stopwatch & Timer",
    id: "stopwatch-timer",
    icon: Clock,
  },
  {
    label: "Base64 Converter",
    id: "base64-converter",
    icon: Binary,
  },
  {
    label: "Color Picker",
    id: "color-picker",
    icon: Palette,
  },
];
