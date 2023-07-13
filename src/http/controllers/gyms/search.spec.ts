import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/create-and-authenticate-user";

describe("Search Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search gyms by title", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server).post("/gyms").set("Authorization", `Bearer ${token}`).send({
      title: "Javascript Academy",
      description: "The best gym in the world",
      phone: "123456789",
      latitude: 1.215366,
      longitude: 32.267337,
    });

    await request(app.server).post("/gyms").set("Authorization", `Bearer ${token}`).send({
      title: "NodeJs Gym",
      description: "The best gym in the world",
      phone: "123456789",
      latitude: 1.215366,
      longitude: 32.267337,
    });

    const response = await request(app.server)
      .get("/gyms/search")
      .query({
        q: "Javascript",
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Javascript Academy",
      }),
    ]);
  });
});