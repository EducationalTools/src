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
};
