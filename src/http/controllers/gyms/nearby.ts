import { makeFetchNearbyGymsUseCase } from "@/factories/make-fetch-nearby-gyms-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const nearby = async (request: FastifyRequest, reply: FastifyReply) => {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  console.log(request.query);

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query);

  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase();

  const { gyms } = await fetchNearbyGymsUseCase.execute({
    userLatitude: String(latitude),
    userLongitude: String(longitude),
  });

  return reply.status(201).send({
    gyms,
  });
};
