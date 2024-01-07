import { Locator, Page } from "@playwright/test";

export default class BasePage {
    readonly page: Page;
    readonly categoryCard: Locator;
    countCategoryCard: number;

    constructor(page:Page) {
        this.page = page;
        this.categoryCard = this.page.locator('.card.mt-4.top-card');
    };
    async countCategoryElements(): Promise<void> {
        this.countCategoryCard = await this.categoryCard.count();
    };
    async openBasePage(): Promise<void> {
        await this.page.goto('/');
    }
};