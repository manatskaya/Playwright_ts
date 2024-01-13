import { expect } from '@playwright/test';
import { test } from '../src/fixtures/base_fixtures';
import { userName, password } from '../test-data/LoginPage';

test.describe(async () => {

    test.describe(async () => {

        test('Add book to My account', async ({login, bookStorePage}) => {
            await login.fillInLoginForm(userName, password);
            await login.clickLoginBtn();
            await bookStorePage.clickAddToCollectionBtn();
            await bookStorePage.clickProfileInMenuBar();
            await bookStorePage.enterBookTitleInSearchBox();
            await expect(bookStorePage.book).toHaveCount(1);
            await expect(bookStorePage.book).not.toBeVisible();
        });
    });
});