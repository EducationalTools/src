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
  rose: {
    name: "Rose",
    dark: true,
    light: true,
  },
  blue: {
    name: "Blue",
    dark: true,
    light: true,
  },
  green: {
    name: "Green",
    dark: true,
    light: true,
  },
  orange: {
    name: "Orange",
    dark: true,
    light: true,
  },
};
