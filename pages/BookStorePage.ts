import { Locator, Page } from "@playwright/test";
import LoginPage from "./LoginPage";

export default class BookStorePage extends LoginPage {
    readonly page: Page;
    book: Locator;
    addToCollectionButton: Locator;
    goToBookStoreButton: Locator;
    profileButton: Locator;
    profileBookSearchBox: Locator;
    lastVisitedBookTitle: string;
    deleteButton: Locator;
    okButtonOnModalDialog: Locator;
    
    constructor(page: Page) {
        super(page);
        this.page = page;
        this.book = this.page.locator('div.rt-tbody > div:nth-child(1) > div > div:nth-child(2) > div a');
        this.addToCollectionButton = this.page.getByRole('button').getByText('Add To Your Collection');
        this.goToBookStoreButton = this.page.locator('#gotoStore');
        this.profileButton = this.page.getByRole('list').getByText('Profile');
        this.profileBookSearchBox = this.page.locator('#searchBox');
        this.deleteButton = this.page.locator('#delete-record-undefined');
        this.okButtonOnModalDialog = this.page.locator('#closeSmallModal-ok');
        
        this.page.on('dialog', dialog => dialog.accept());
    };
    async clickGoToBookStoreBtn(): Promise<void> {
        await this.goToBookStoreButton.click();
    };
    async selectAvailableBook(): Promise<void> {
        await this.book.click();
        this.lastVisitedBookTitle = await this.page.locator('#title-wrapper > div.col-md-9.col-sm-12 label').textContent() || '';
    };
    async clickAddToCollectionBtn(): Promise<void> {
        await this.addToCollectionButton.click({force:true});
    };
    async clickProfileInMenuBar(): Promise<void> {
        await this.profileButton.click();
    };
    async enterBookTitleInSearchBox() {
        await this.profileBookSearchBox.fill(this.lastVisitedBookTitle);
    };
    async deleteAddedBook() {
        await this.page.goto('/profile');
        await this.deleteButton.click();
        await this.okButtonOnModalDialog.click();
    };
};