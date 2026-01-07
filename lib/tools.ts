import {
  PiBinary,
  PiCalculator,
  PiTextAa,
  PiClock,
  PiCode,
  PiDiceFive,
  PiFileText,
  PiFingerprint,
  PiHash,
  PiKey,
  PiLink,
  PiLock,
  PiPalette,
  PiQrCode,
  PiArrowsLeftRight,
  PiTextT,
  PiCursorText,
} from "react-icons/pi";

export const TOOLS = [
  {
    label: "Calculator",
    id: "calculator",
    icon: PiCalculator,
  },
  {
    label: "Unit Converter",
    id: "unit-converter",
    icon: PiArrowsLeftRight,
  },
  {
    label: "Word Counter",
    id: "word-counter",
    icon: PiCursorText,
  },
  {
    label: "Password Generator",
    id: "password-generator",
    icon: PiKey,
  },
  {
    label: "Random Number",
    id: "random-number",
    icon: PiDiceFive,
  },
  {
    label: "Stopwatch & Timer",
    id: "stopwatch-timer",
    icon: PiClock,
  },
  {
    label: "Base64 Converter",
    id: "base64-converter",
    icon: PiBinary,
  },
  {
    label: "Color Picker",
    id: "color-picker",
    icon: PiPalette,
  },
  {
    label: "QR Code Generator",
    id: "qr-code-generator",
    icon: PiQrCode,
  },
  {
    label: "UUID Generator",
    id: "uuid-generator",
    icon: PiFingerprint,
  },
  {
    label: "JSON Formatter",
    id: "json-formatter",
    icon: PiCode,
  },
  {
    label: "Roman Numeral Converter",
    id: "roman-numeral",
    icon: PiHash,
  },
  {
    label: "Text Case Converter",
    id: "text-case",
    icon: PiTextAa,
  },
  {
    label: "Hash Generator",
    id: "hash-generator",
    icon: PiLock,
  },
  {
    label: "URL Encoder/Decoder",
    id: "url-encoder",
    icon: PiLink,
  },
  {
    label: "Markdown Preview",
    id: "markdown-preview",
    icon: PiFileText,
  },
  {
    label: "Regex Tester",
    id: "regex-tester",
    icon: PiCode,
  },
  {
    label: "Number Base Converter",
    id: "number-base",
    icon: PiHash,
  },
];
