import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { history } from "./history";
import { metrics } from "./metrics";
import { validate } from "./validate";

export const checkInsRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJWT);

  app.post("/gyms/:gymId/chech-ins", create);
  app.patch("/check-ins/:checkinId/validate", validate);
  app.get("/check-ins/history", history);
  app.get("/check-ins/metrics", metrics);
};
