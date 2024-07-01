import { expect } from '@playwright/test';
import { test } from '../src/fixtures/base_fixtures';
import { storageStatePath } from '../src/links/path';

test.describe(async () => {

    test.describe(async () => {

        test('Login to account', async ({login, context}) => {
            expect(login.page).toHaveURL('/profile');
        });
    });
});