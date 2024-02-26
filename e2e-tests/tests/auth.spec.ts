import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/"

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  //get sign in button

  await page.getByRole("link", {name: "Sign In"}).click();
  await expect(page.getByRole("heading", {name: "Sign In"})).toBeVisible();

  await page.locator("[name=email]").fill("mbucsea9@gmail.com");
  await page.locator("[name=password]").fill("Password");

  await page.getByRole("button", {name: "Sign In"}).click();

  await expect(page.getByText("user loggedin successfully")).toBeVisible();

  await expect(page.getByRole("link", {name: "My Bookings"})).toBeVisible();
  await expect(page.getByRole("link", {name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Sign Out"})).toBeVisible();

});

