import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [
      ["src/http/controllers/**", "prisma"], // O nome "prisma" é o mesmo nome que foi definido no final do nome do diretório prisma/vitest-environment-prisma onde definimos o ambiente de teste
    ],
  },
});
