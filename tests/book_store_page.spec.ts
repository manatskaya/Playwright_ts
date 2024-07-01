import { expect } from '@playwright/test';
import { test } from '../src/fixtures/base_fixtures';

test.describe(async () => {

    test('Add book to My account', async ({login, bookStorePage}) => {
        expect(login.page).toHaveURL('/profile');
        await bookStorePage.clickAddToCollectionBtn();
        await bookStorePage.clickProfileInMenuBar();
        await bookStorePage.enterBookTitleInSearchBox();
        await expect(bookStorePage.book).toHaveCount(1);
        await expect(bookStorePage.book).not.toBeVisible();
    });
});