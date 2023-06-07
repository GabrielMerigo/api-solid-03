import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Nearby Gym (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Far Gym",
        description: "Some Description",
        phone: "11 99999-9999",
        latitude: -25.9702536,
        longitude: -50.2041492,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Near Gym",
        description: "Some Description",
        phone: "11 99999-9999",
        latitude: -30.0012655,
        longitude: -51.1475463,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -25.9702536,
        longitude: -50.2041492,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Far Gym",
      }),
    ]);
  });
});
