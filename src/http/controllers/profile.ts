import { makeGetUserProfileUseCase } from "@/factories/make-get-user-profile-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export const profile = async (request: FastifyRequest, reply: FastifyReply) => {
  await request.jwtVerify();

  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  delete user.password_hash;

  return reply.status(200).send({
    user,
  });
};
