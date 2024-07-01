import { Locator, Page } from "@playwright/test";

export default class BasePage {
    readonly page: Page;
    countCategoryCard: number;

    constructor(page: Page) {
        this.page = page;
    };
    async countCategoryElements(): Promise<void> {
        this.countCategoryCard = await this.page.locator('.card.mt-4.top-card').count();
    };
    async openBasePage(baseURL) : Promise<void> {
        await this.page.goto(baseURL);
    };
};