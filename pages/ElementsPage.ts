import { Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";


export default class ElementsPage extends BasePage {
    readonly page: Page;
    readonly actualCategoryArray: string[];
    readonly elementsCategoryCards: Locator;

    
    constructor(page: Page) {
        super(page);
        this.page = page;
        this.elementsCategoryCards = this.page.locator('.card.mt-4.top-card');
    };
    async getCategoryCards(): Promise<string[]> {
        return await this.page.locator('.card.mt-4.top-card').allInnerTexts();
    };
};