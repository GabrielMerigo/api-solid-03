import { FastifyInstance } from "fastify";
import { authenticate } from "./controllers/authenticate";
import { profile } from "./controllers/profile";
import { register } from "./controllers/register";

export const appRoutes = async (app: FastifyInstance) => {
  app.post("/users", register);
  app.post("/session", authenticate);

  /* Authenticated */
  app.get("/me", profile);
};
