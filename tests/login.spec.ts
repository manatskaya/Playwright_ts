import { expect } from '@playwright/test';
import { test } from '../src/fixtures/base_fixtures';
import { userName, password } from '../test-data/LoginPage';

test.describe(async () => {

    test.describe(async () => {

        test('Login to account', async ({login}) => {
            await login.fillInLoginForm(userName, password);
            await login.clickLoginBtn();
            expect(login.page).toHaveURL('/profile');
        });
    });
});