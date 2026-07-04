import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage.js";

test("deve realizar login com sucesso", async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.login(
    "matheus@email.com",
    "123456"
  );

  await expect(page).toHaveURL(/.*painel\/entregas/);

});