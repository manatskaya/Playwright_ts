import { expect, Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";

export default class LoginPage extends BasePage {
    readonly page: Page;
    userNameInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;

    bookStoreCategory: Locator;
    loginLinkSideBar: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.userNameInput = this.page.locator('#userName');
        this.passwordInput = this.page.locator('#password');
        this.loginButton = this.page.locator('#login');
        this.bookStoreCategory = this.page.getByRole('heading', { name: 'Book Store Application'});
        this.loginLinkSideBar = this.page.getByRole('list').getByText('Login');
    };
    async fillInLoginForm(userName, password): Promise<void> {
        await this.userNameInput.fill(userName);
        await expect(this.userNameInput).toHaveValue(userName);
        await this.passwordInput.fill(password);
        await expect(this.passwordInput).toHaveValue(password);
    };
    async clickBookStoreApplication(): Promise<void> {
        await this.openBasePage(process.env.BASE_URL);
        await this.bookStoreCategory.click();
    };
    async clickLoginSideBar(): Promise<void> {
        await this.clickBookStoreApplication();
        await this.loginLinkSideBar.click();
    };
    async clickLoginBtn(): Promise<void> {
        await this.loginButton.click();
        await this.page.waitForURL('**/profile');
    };
};