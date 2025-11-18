interface Theme {
  name: string;
  dark: boolean;
  light: boolean;
}

export const themes: Record<string, Theme> = {
  default: {
    name: "Default",
    dark: true,
    light: true,
  },
  terminal: {
    name: "Terminal",
    dark: true,
    light: false,
  },
  catppuccin: {
    name: "Catppuccin",
    dark: true,
    light: true,
  },
  "better-catppuccin": {
    name: "Better Catppuccin",
    dark: true,
    light: true,
  },
  mono: {
    name: "Mono",
    dark: true,
    light: true,
  },
  noeco: {
    name: "Noe Co.",
    dark: true,
    light: false,
  },
  "ingo-au": {
    name: "ingo.au",
    dark: true,
    light: false,
  },
};
