
import { expect} from '@playwright/test';
import { doubleClickMessageText, rightClickMessageText, clickMeText } from '../test-data/buttonsPage';
import { test } from '../src/fixtures/base_fixtures';

test.describe(async () => {

    test.beforeEach('precondition', async ({ elementsPage }) => {
        await elementsPage.openBasePage(process.env.BASE_URL);
    });
    
// Task 1:
    test.describe(async () => {

        test('Get element by locator', async ({ expectedCategoryArray, elementsPage }) => {
            await elementsPage.countCategoryElements();
            const actualCategoryArray = await elementsPage.getCategoryCards();
            expect(actualCategoryArray).toEqual(expectedCategoryArray);
        });
    });

//Task 2:
    test.describe( async () => {

        test('Verify Buttons subcategory opens via sidebar', async ({ buttonsPage }) => {
            await buttonsPage.clickElementsCategory();
            await expect(buttonsPage.page).toHaveURL('/elements');
            await buttonsPage.clickElementInMenu();
            await expect(buttonsPage.page).toHaveURL('/buttons');
        });
        test('Verify DoubleClick btn is clickable and correct text is shown', async ({ buttonsPage }) => {
            await buttonsPage.openButtonsPage();
            await expect(buttonsPage.page).toHaveURL('/buttons');
            await buttonsPage.clickDoubleClickBtn();
            await expect(buttonsPage.doubleClickMessage).toContainText(doubleClickMessageText);
        });
        test('Verify RightClick btn is clickable and correct text is shown', async ({ buttonsPage }) => {
            await buttonsPage.openButtonsPage();
            await expect(buttonsPage.page).toHaveURL('/buttons');
            await buttonsPage.clickRightBtn();
            await expect(buttonsPage.rightClickMessage).toContainText(rightClickMessageText);
        });
        test('Verify ClickMe btn is clickable and correct text is shown', async ({ buttonsPage }) => {
            await buttonsPage.openButtonsPage();
            await expect(buttonsPage.page).toHaveURL('/buttons');
            await buttonsPage.clickMeBtnClick();
            await expect(buttonsPage.clickMeMessage).toContainText(clickMeText);
        });
    });
});