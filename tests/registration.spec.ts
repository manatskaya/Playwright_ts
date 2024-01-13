import { test } from "../src/fixtures/base_fixtures";
import { creds } from '../test-data/registrationPage';

test.describe(async () => {

    test('Register new user', async ({ registrationPage }) => {
        await registrationPage.fillInRegistrationForm(creds);
    });
});