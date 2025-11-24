import {
  Atom,
  Binary,
  Calculator,
  CaseSensitive,
  Clock,
  Dices,
  FileJson,
  Fingerprint,
  Hash,
  Key,
  Link,
  Lock,
  Palette,
  QrCode,
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
  {
    label: "QR Code Generator",
    id: "qr-code-generator",
    icon: QrCode,
  },
  {
    label: "UUID Generator",
    id: "uuid-generator",
    icon: Fingerprint,
  },
  {
    label: "JSON Formatter",
    id: "json-formatter",
    icon: FileJson,
  },
  {
    label: "Periodic Table",
    id: "periodic-table",
    icon: Atom,
  },
  {
    label: "Roman Numeral Converter",
    id: "roman-numeral",
    icon: Hash,
  },
  {
    label: "Text Case Converter",
    id: "text-case",
    icon: CaseSensitive,
  },
  {
    label: "Hash Generator",
    id: "hash-generator",
    icon: Lock,
  },
  {
    label: "URL Encoder/Decoder",
    id: "url-encoder",
    icon: Link,
  },
];
