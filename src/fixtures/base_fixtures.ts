import { APIRequestContext, request, test as base} from '@playwright/test';
import BasePage from '../../pages/BasePage';
import BookStorePage from '../../pages/BookStorePage';
import ButtonsPage from '../../pages/ButtonsPage';
import ElementsPage from '../../pages/ElementsPage';
import LoginPage from '../../pages/LoginPage';
import RegistrationPage from '../../pages/RegistrationPage';
import { password, userName } from '../../test-data/LoginPage';
import { storageStatePath } from '../links/path';

type TMyFixture = {
    expectedCategoryArray: string[],
    login: LoginPage;
    elementsPage: ElementsPage;
    buttonsPage: ButtonsPage;
    basePage: BasePage;
    registrationPage: RegistrationPage;
    bookStorePage: BookStorePage;
    userApiRequest: APIRequestContext;
}

const test = base.extend <TMyFixture>  ({
    expectedCategoryArray: [
        "Elements",
        "Forms",
        "Alerts, Frame & Windows",
        "Widgets",
        "Interactions",
        "Book Store Application" 
    ],
    login: async({page}, use) => {
        const login = new LoginPage(page);
        await login.clickBookStoreApplication();
        await login.clickLoginSideBar();
        await login.fillInLoginForm(userName, password);
        await login.clickLoginBtn();
        await use(login);
        },
    elementsPage: async({page}, use) => {
        const elementsPage = new ElementsPage(page);
        await use(elementsPage);
        },
    buttonsPage: async({page}, use) => {
            const buttonsPage = new ButtonsPage(page);
            await use(buttonsPage);
            },
    basePage: async({page}, use) => {
        const basePage = new BasePage(page);
        await use(basePage);
        },
    registrationPage: async({page}, use) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.openRegistrationPage();
        await use(registrationPage);
    },
    bookStorePage: async ({page}, use) => {
        const bookStorePage = new BookStorePage(page);
        await bookStorePage.clickGoToBookStoreBtn();
        await bookStorePage.selectAvailableBook();
        await use(bookStorePage);
        await bookStorePage.deleteAddedBook();
    },
    userApiRequest: async ({ }, use) => {
        const newContext = await request.newContext({
        storageState: storageStatePath
        });
    await use(newContext)
    }
});
export { test }