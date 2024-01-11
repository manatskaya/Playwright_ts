import { expect, test } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import { userName, password } from '../test-data/LoginPage';

test.describe(async () => {

    test('Login to My Account', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.clickBookStoreApplication();
        expect(page).toHaveURL('/books');
        await loginPage.clickLoginSideBar();
        expect(page).toHaveURL('/login');
        await loginPage.fillInLoginForm(userName, password);
        await loginPage.clickLoginBtn();
        expect(page).toHaveURL('/profile');
    });
});