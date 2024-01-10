import { expect, test } from '@playwright/test';
import BasePage from '../pages/BasePage';
import ButtonsPage from '../pages/ButtonsPage';
import ElementsPage from '../pages/ElementsPage';
import { expectedCategoryArray } from '../test-data/basePage';
import { doubleClickMessageText, rightClickMessageText, clickMeText } from '../test-data/buttonsPage';

test.beforeEach('precondition', async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.openBasePage(process.env.BASE_URL);
});

// Task 1:
test.describe(async () => {

    test('Get element by locator', async ({ page }) => {
        const basePage = new BasePage(page);
        const elementsPage = new ElementsPage(page);
        await elementsPage.countCategoryElements();
        const actualCategoryArray = await elementsPage.getCategoryCards();
        expect(actualCategoryArray).toEqual(expectedCategoryArray);
    });
});

//Task 2:
test.describe( async () => {

    test('Verify Buttons subcategory opens via sidebar', async ({ page }) => {
        const buttonsPage = new ButtonsPage(page);
        await buttonsPage.clickElementsCategory();
        await expect(page).toHaveURL('/elements');
        await buttonsPage.clickElementInMenu();
        await expect(page).toHaveURL('/buttons');
    });
    test('Verify DoubleClick btn is clickable and correct text is shown', async ({ page }) => {
        const buttonsPage = new ButtonsPage(page);
        await buttonsPage.openButtonsPage();
        await expect(page).toHaveURL('/buttons');
        await buttonsPage.clickDoubleClickBtn();
        await expect(buttonsPage.doubleClickMessage).toContainText(doubleClickMessageText);
    });
    test('Verify RightClick btn is clickable and correct text is shown', async ({ page }) => {
        const buttonsPage = new ButtonsPage(page);
        await buttonsPage.openButtonsPage();
        await expect(page).toHaveURL('/buttons');
        await buttonsPage.clickRightBtn();
        await expect(buttonsPage.rightClickMessage).toContainText(rightClickMessageText);
    });
    test('Verify ClickMe btn is clickable and correct text is shown', async ({ page }) => {
        const buttonsPage = new ButtonsPage(page);
        await buttonsPage.openButtonsPage();
        await expect(page).toHaveURL('/buttons');
        await buttonsPage.clickMeBtnClick();
        await expect(buttonsPage.clickMeMessage).toContainText(clickMeText);
    });
});