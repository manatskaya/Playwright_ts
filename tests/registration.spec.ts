import { expect, test } from '@playwright/test';
import { config } from '../config/config';
import RegistrationPage from '../pages/RegistrationPage';
import { creds } from '../test-data/registrationPage';
test.describe(async () => {

    test('Register new user', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.openRegistrationPage();
        await registrationPage.fillInRegistrationForm(creds);
    });
});