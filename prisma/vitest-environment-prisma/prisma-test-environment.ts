import { Environment } from "vitest";

export default <Environment>{
  name: "prisma",
  async setup() {
    // Setup the environment
    // This function will be called once before all tests
    // and before the server is started.
    console.log("Executou");

    // Return the environment object
    return {
      async teardown() {
        console.log("Teardown");
      },
    };
  },
};
