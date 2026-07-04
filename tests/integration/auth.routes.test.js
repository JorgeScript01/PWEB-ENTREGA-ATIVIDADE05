import request from "supertest";
import app from "../../src/app.js";

describe("POST /api/auth/login", () => {

  it("deve retornar um accessToken para credenciais válidas", async () => {

    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "ademir@email.com",
        senha: "123456"
      });

    expect(response.status).toBe(200);
    expect(response.body.accessToken).toBeDefined();

  });

});