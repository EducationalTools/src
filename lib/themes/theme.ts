interface Theme {
  name: string;
  id: string;
  dark: boolean;
  light: boolean;
}

export const themes: Theme[] = [
  {
    name: "Default",
    id: "default",
    dark: true,
    light: true,
  },
];
