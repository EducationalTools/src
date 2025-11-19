import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import Icons from "unplugin-icons/vite";
import branchName from "current-git-branch";

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    Icons({ compiler: "jsx", jsx: "react" }),
  ],
  define: {
    // Get git branch name
    "process.env.BRANCH_NAME": JSON.stringify(branchName()),
    "process.env.BUILD_TIME": JSON.stringify(Date.now()),
  },
});
