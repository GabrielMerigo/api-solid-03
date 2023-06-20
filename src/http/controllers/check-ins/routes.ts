import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { history } from "./history";
import { metrics } from "./metrics";
import { validate } from "./validate";

export const checkInsRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJWT);

  app.get("/check-ins/history", history);
  app.get("/check-ins/metrics", metrics);

  app.post("/gyms/:gymId/chech-ins", create);

  app.patch(
    "/check-ins/:checkinId/validate",
    {
      onRequest: [verifyUserRole("ADMIN")],
    },
    validate
  );
};
