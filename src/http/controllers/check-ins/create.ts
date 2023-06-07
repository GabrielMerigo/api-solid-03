import { makeCheckInsUseCase } from "@/factories/make-check-in-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const createCheckInParams = z.object({
    gymId: z.string().uuid(),
  });

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { gymId } = createCheckInParams.parse(request.params);
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body);

  const checkInUseCase = makeCheckInsUseCase();

  await checkInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: String(latitude),
    userLongitude: String(longitude),
  });

  return reply.status(201).send();
};
