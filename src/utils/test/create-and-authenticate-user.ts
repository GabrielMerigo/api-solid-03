import { FastifyInstance } from "fastify";
import request from "supertest";

export const createAndAuthenticateUser = async (app: FastifyInstance) => {
  await request(app.server).post("/users").send({
    name: "John Doe",
    email: "Johndoe2@gmail.com",
    password: "123456",
  });

  const authResponse = await request(app.server).post("/session").send({
    email: "Johndoe2@gmail.com",
    password: "123456",
  });

  const { token } = authResponse.body;

  return { token };
};
