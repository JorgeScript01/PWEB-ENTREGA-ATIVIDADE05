import { jest } from "@jest/globals";
import { AuthService } from "../../../src/services/AuthService.js";

describe("AuthService", () => {

  test("deve existir", () => {

    const service = new AuthService();

    expect(service).toBeDefined();

  });

});