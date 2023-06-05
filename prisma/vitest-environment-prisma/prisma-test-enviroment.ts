import { Environment } from "vitest";

export default <Environment>{
  name: "prisma",
  async setup() {
    console.log("teste");

    return {
      async teardown() {
        console.log("teardown");
      },
    };
  },
};
