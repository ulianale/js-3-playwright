const { test, expect, chromium } = require("@playwright/test");
const user = require("../user");

test("Success authorization", async() => {
    const browser = await chromium.launch({
        headless: false,
    });
    const page = await browser.newPage("https://netology.ru/?modal=sign_in");
    await page.goto("https://netology.ru/?modal=sign_in", { timeout: 0 });
    await page.fill('[placeholder="Email"]', user.login);
    await page.fill('[placeholder="Пароль"]', user.password);
    await page.click('[data-testid="login-submit-btn"]');
    await expect(page).toHaveURL("https://netology.ru/profile");
    await browser.close();
  });

test("Error authorization", async () => {
    const browser = await chromium.launch({
      headless: false,
    });
    const page = await browser.newPage("https://netology.ru/?modal=sign_in");
    await page.goto("https://netology.ru/?modal=sign_in", { timeout: 0 });
    await page.fill('[placeholder="Email"]', user.invalidLogin);
    await page.fill('[placeholder="Пароль"]', user.invalidPassword);
    await page.click('[data-testid="login-submit-btn"]');
    const error = await page.locator('[data-testid="login-error-hint"]');
    await expect(error).toHaveText("Вы ввели неправильно логин или пароль");
    await browser.close();
  });

