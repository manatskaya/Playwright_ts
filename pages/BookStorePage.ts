import { Locator, Page } from "@playwright/test";
import LoginPage from "./LoginPage";

export default class BookStorePage extends LoginPage {
    readonly page: Page;
    book: Locator;
    addToCollectionBtn: Locator;
    goToBookStoreBtn: Locator;
    profileBtn: Locator;
    profileBookSearchBox: Locator;
    lastVisitedBookTitle: string;
    deleteBtn: Locator;
    okBtnOnModalDialog: Locator;
    
    constructor(page: Page) {
        super(page);
        this.page = page;
        this.book = this.page.locator('div.rt-tbody > div:nth-child(1) > div > div:nth-child(2) > div a');
        this.addToCollectionBtn = this.page.getByRole('button').getByText('Add To Your Collection');
        this.goToBookStoreBtn = this.page.locator('#gotoStore');
        this.profileBtn = this.page.getByRole('list').getByText('Profile');
        this.profileBookSearchBox = this.page.locator('#searchBox');
        this.deleteBtn = this.page.locator('#delete-record-undefined');
        this.okBtnOnModalDialog = this.page.locator('#closeSmallModal-ok');
        
        this.page.on('dialog', dialog => dialog.accept());
    };
    async clickGoToBookStoreBtn(): Promise<void> {
        await this.goToBookStoreBtn.click();
    };
    async selectAvailableBook(): Promise<void> {
        await this.book.click();
        this.lastVisitedBookTitle = await this.page.locator('#title-wrapper > div.col-md-9.col-sm-12 label').textContent() || '';
    };
    async clickAddToCollectionBtn(): Promise<void> {
        await this.addToCollectionBtn.click({force:true});
    };
    async clickProfileInMenuBar(): Promise<void> {
        await this.profileBtn.click();
    };
    async enterBookTitleInSearchBox() {
        await this.profileBookSearchBox.fill(this.lastVisitedBookTitle);
    };
    async deleteAddedBook() {
        await this.page.goto('/profile');
        await this.deleteBtn.click();
        await this.okBtnOnModalDialog.click();
    };
};