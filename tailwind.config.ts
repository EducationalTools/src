import type { Config } from "tailwindcss";

export default {
  content: [],
  theme: {
    extend: {
      keyframes: {
        "collapsible-down": {
          from: {
            height: "0",
            filter: "blur(5px)",
            opacity: "0",
            transform: "translateY(-10px)",
          },
          to: {
            height: "var(--radix-collapsible-content-height)",
            filter: "blur(0)",
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "collapsible-up": {
          from: {
            height: "var(--radix-collapsible-content-height)",
            filter: "blur(0)",
            opacity: "1",
            transform: "translateY(0)",
          },
          to: {
            height: "0",
            filter: "blur(5px)",
            opacity: "0",
            transform: "translateY(-10px)",
          },
        },
      },
      animation: {
        "collapsible-down": "collapsible-down 0.2s ease-out",
        "collapsible-up": "collapsible-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
