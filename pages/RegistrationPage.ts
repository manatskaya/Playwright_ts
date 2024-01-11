import { Locator, Page } from "@playwright/test";

export default class RegistrationPage {
    readonly page: Page;
    firstNameRegistration: Locator;
    lastNameRegistration: Locator;
    userNameRegistration: Locator;
    passwordRegistration: Locator;
    
    constructor (page: Page) {
        this.page = page;
        this.firstNameRegistration = this.page.locator('#firstname');
        this.lastNameRegistration = this.page.locator('#lastname');
        this.userNameRegistration = this.page.locator('#userName');
        this.passwordRegistration = this.page.locator('#password');
    };
    async openRegistrationPage(): Promise<void> {
        await this.page.goto('/register');
    }
    async fillInRegistrationForm(credentials: ICredentials) {
        await this.firstNameRegistration.fill(credentials.firstName);
        await this.lastNameRegistration.fill(credentials.lastName);
        await this.userNameRegistration.fill(credentials.userName);
        await this.passwordRegistration.fill(credentials.password);
    };
};