import { Locator, Page, expect } from "@playwright/test";

export default class BookPage {
    readonly page: Page;
    addedBookTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addedBookTitle = this.page.getByText('#title-label');
    };
    async findTitleLabel(): Promise<void> {
        await expect(this.addedBookTitle).toHaveValue('Title :');
    };
};