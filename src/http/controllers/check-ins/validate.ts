import { makeValidateCheckInUseCase } from "@/factories/make-validate-check-ins-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const validate = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const validateCheckInsParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateCheckInsParamsSchema.parse(request.query);

  const validateCheckInUseCase = makeValidateCheckInUseCase();

  await validateCheckInUseCase.execute({
    checkInId,
  });

  return reply.status(204).send();
};
