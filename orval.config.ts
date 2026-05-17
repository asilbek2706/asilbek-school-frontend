import { defineConfig } from "orval";

export default defineConfig({
  schoolApi: {
    input: {
      target: "./src/shared/openapi/schema.yaml",
    },
    output: {
      target: "./src/shared/generated/orval-client.ts",
      client: "axios",
      mode: "split",
      prettier: true,
      override: {
        mutator: {
          path: "./src/shared/api/http.ts",
          name: "httpClient",
        },
      },
    },
  },
});
