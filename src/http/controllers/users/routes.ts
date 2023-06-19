import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate/authenticate";
import { profile } from "./profile/profile";
import { refresh } from "./refresh/refresh";
import { register } from "./register/register";

export const userRoutes = async (app: FastifyInstance) => {
  app.post("/users", register);
  app.post("/session", authenticate);
  app.patch("/token/refresh", refresh);

  /* Authenticated */
  app.get("/me", { onRequest: [verifyJWT] }, profile);
};
