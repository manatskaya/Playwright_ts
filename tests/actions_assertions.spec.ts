import { expect, Locator, test } from '@playwright/test';

test.beforeEach('precondition', async ({ page }) => {
    await page.goto('/');
});

// Task 1:
test.describe(async () => {

    test('Get element by locator', async ({ page }) => {
        const expectedCategoryArray: string[] = [
            "Elements",
            "Forms",
            "Alerts, Frame & Windows",
            "Widgets",
            "Interactions",
            "Book Store Application"
        ];
        const actualCategoryArray: string[] = [];
        const categoryCard: number = await page.locator('.card.mt-4.top-card').count();
        for (let index = 0; index < categoryCard; index++) {
           let elementCategoryCards: string = await page.locator('.card.mt-4.top-card').nth(index).innerText();
           actualCategoryArray.push(elementCategoryCards); 
        }
        expect(actualCategoryArray).toEqual(expectedCategoryArray);
    });
});

//Task 2:
test.describe( async () => {

    test('Verify Buttons subcategory opens via sidebar', async ({ page }) => {
        const elementsCategory: Locator = page.getByRole('heading', { name: 'Elements'});
        await elementsCategory.click();
        await expect(page).toHaveURL('/elements');
        const elementInMenu: Locator = page.getByRole('list').getByText('Buttons');
        await elementInMenu.click();
        await expect(page).toHaveURL('/buttons');
    });
    test('Verify DoubleClick btn is clickable and correct text is shown', async ({ page }) => {
        await page.goto('/buttons', { waitUntil: 'load'} );
        await expect(page).toHaveURL('/buttons');
        const doubleClickBtn = page.locator('#doubleClickBtn');
        await doubleClickBtn.dblclick();
        await expect(page.locator('#doubleClickMessage')).toContainText('You have done a double click');
    });
    test('Verify RightClick btn is clickable and correct text is shown', async ({ page }) => {
        await page.goto('/buttons', { waitUntil: 'load'} );
        await expect(page).toHaveURL('/buttons');
        const rightClickBtn: Locator = page.locator('#rightClickBtn');
        await rightClickBtn.click({ button : 'right'});
        await expect(page.locator('#rightClickMessage')).toContainText('You have done a right click');
    });
    test('Verify ClickMe btn is clickable and correct text is shown', async ({ page }) => {
        await page.goto('/buttons', { waitUntil: 'load'} );
        await expect(page).toHaveURL('/buttons');
        const  clickMeBtn: Locator = page.getByRole('button', { name: 'Click Me', exact: true });
        await clickMeBtn.click();
        await expect(page.locator('#dynamicClickMessage')).toContainText('You have done a dynamic click');
    });
});